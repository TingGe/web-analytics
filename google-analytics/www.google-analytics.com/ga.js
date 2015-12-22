/**
 * 代码翻译：周培公
 * 电子邮件：peigong@foxmail.com
 * 腾讯微博：http://t.qq.com/lanxmail
 * 新浪微博：http://weibo.com/1766654653
 * 个人主页：http://hi.baidu.com/lanxmail
 * 代码地址：http://www.google-analytics.com/ga.js
 * 文档地址：http://code.google.com/intl/zh-CN/apis/analytics/
 * @fileoverview Google Analytics（分析）客户端javascript代码。
 */
(function(){
    /**
     * 定义常用对象、函数的快捷调用常量。
     */
    var _true = true,
        _false = false,
        _encodeURI = encodeURIComponent,
        _o_window = window,
        _undefined = undefined,
        _o_string = String,
        _o_math = Math,
        _push = "push",
        _cookie = "cookie",
        _charAt = "charAt",
        _str_indexOf = "indexOf",
        _gaGlobal = "gaGlobal",
        _getTime = "getTime",
        _toString = "toString",
        _str_window = "window",
        _length = "length",
        _str_document = "document",
        _split = "split",
        _location = "location",
        _protocol = "protocol",
        _href = "href",
        _substring = "substring",
        _join = "join",
        _toLowerCase = "toLowerCase";

    /**
     * 定义常用字符串常量。
     */
    var _gat_ = "_gat",//用于标准跟踪。
        _gaq_ = "_gaq",//用于异步跟踪。
        _version_ = "4.9.1",//Google Analytics（分析）跟踪代码 (GATC) 版本号。
        _gaUserPrefs_ = "_gaUserPrefs",
        _ioo_ = "ioo",
        _amp_ = "&",
        _equal_ = "=",

        /**
         * _utma的主要功能：识别唯一身份访客
         * _utma的生存周期为2年。其中第二组的随机唯一ID和第三组的时间戳联合组成了访问者ID，Google Analytics通过这个ID来辨别网站的唯一访问者。
         * 而后面的几个时间戳用户计算网站停留时间和访问次数。
         * _utma Cookie存储的内容：127635166.1360367272.1264374807.1264374807.1264374807.1
         * 第一组数字被叫做“域哈希”，是GA表示这个域的唯一代码。同一域中每个cookie的第一组数据都是“域哈希”，并且值都是一样的。
         * 第二组数字是一个随机产生的唯一ID。
         * 第三，四，五组数字是时间戳，其中第三组数字表示初次访问的时间。第四组数字表示上一次访问的时间，第五组数字表示本次访问开始的时间。
         * 第六组数字是访问次数计数器。这个数字随着访问次数的增加而增加。
         * PS：上面的三个时间戳数字相同，并且最后的访问次数计数器是1，表示这是第一次访问。
         * Read more: http://bluewhale.cc/2010-01-24/google-analytics-cookie.html#ixzz1JUwUuO2W
         */
        _param_utma = "__utma=",

        /**
         * _utmb的主要功能：和_utmc一起决定访客的Session。
         * _utmb的生存周期为30分钟，当访问者在你的网站持续30分钟静止时，utmb将被删除。Google Analytics使用_utmb 和_utmc一起辨别一个session。
         * _utmb Cookie存储的内容：127635166.2.10.1264374807
         * 第一组数字和_utma一样，是“域哈希”。
         * 后面的几组数字是一些附加值。
         * Read more: http://bluewhale.cc/2010-01-24/google-analytics-cookie.html#ixzz1JUzioYGV
         */
        _param_utmb = "__utmb=",

        /**
         * _utmc的主要功能：和_utmb一起决定访客的Session。
         * _utmc是一个临时cookie，当用户关闭浏览器时_utmc将一起被删除
         * _utmc和_utmb一起来识别一个session，当用户访问一个网站时，Google Analytics会检查这两个cookie，如果缺少其中任何一个，Google Analytics都将认为这是一个新的session。
         * _utmc的内容：127635166 代表“域哈希”。
         * Read more: http://bluewhale.cc/2010-01-24/google-analytics-cookie.html#ixzz1JV06KDfg
         */
        _param_utmc = "__utmc=",

        _param_utmk = "__utmk=",

        /**
         * _utmv的主要功能：自定义访问者的属性。
         * _utmv的生存周期是2年，存储通过_setVar（）自定义用户属性。
         * _utmz的内容：127635166.user
         * 第一组数字是“域哈希”。
         * 第二个值user是通过_setVar（）设置的用户属性。
         * PS：_utmv只有在调用了_setVar（）时才会出现。
         * 此外，还有两个cookie __utmx和__utmxx。
         * 这两个cookie不是由Google Analytics设置的，而是由Google的Website Optimizer用来做A/B测试或多变量测试用的。
         * 如果在访问某个页面后看到这两个cookie，那就说明这个页面正在进行页面优化测试，而你访问的页面可能是测试中的某一个版本。
         */
        _param_utmv = "__utmv=",

        /**
         * _utmz的主要功能：存储流量来源信息和链接标记的变量值。
         * _utmz的生存周期是6个月，_utmz中存储了所有流量的来源信息。
         * _utmz的内容中一共有4组数字：127635166.1264374807.1.1
         * 第一组数字是“域哈希”。
         * 第二组数字是时间戳。
         * 第三组数字是session number。
         * 第四组数字是campaign number 记录通过不同来源访问网站的次数。
         * utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)
         * 这些信息代表流量的来源，因为我是直接输入域名直接访问的，所以来源和媒介都是direct
         */
        _param_utmz = "__utmz=",

        _param_utmx = "__utmx=",
        _param_gaso = "GASO=";//令牌

        /**
         * 函数注册表对象。
         */
    var Registry = function(){
            var oThis = this,
                //函数注册表。
                _registry = [],
                //单词字符。
                _alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

            /**
             * 注册指定的函数索引。
             * @param idx {Int} 函数索引。
             */
            oThis.register = function(idx){
                _registry[idx] = _true;
            };

            /**
             * 获取&utmu=参数的值。
             */
            oThis.getUTMU = function(){
                for(var arr_utmu = [], i = 0; i < _registry[_length]; i++){
                    if(_registry[i]){
                        arr_utmu[_o_math.floor(i/6)] ^= 1 << i % 6;
                    }
                }
                for(i = 0; i < arr_utmu[_length]; i++){
                    arr_utmu[i] = _alphabet[_charAt](arr_utmu[i] || 0);
                }
                return arr_utmu[_join]("");
            }
        },

        /**
         * 函数注册表对象实例。
         */
        registry = new Registry;

    /**
     * 注册指定的函数索引。
     * @param idx {Int} 函数索引。
     */
    function Register(idx){
        registry.register(idx);
    }

    /**
     * 全局工具对象。
     * @param win {Window} 窗口对象。
     * @param doc {Document} 文档对象。
     */
    var Global = function(win, doc){
            var oThis = this;
            oThis.window = win;
            oThis.document = doc;

            /**
             * 定时执行指定的回调函数。
             * @param callback {Function} 需要执行的回调函数。
             * @param delay {Int} 延时的间隔（以毫秒计）。
             */
            oThis.setTimeout = function(callback, delay){
                setTimeout(callback, delay);
            };
            
            /**
             * 用户代理头的字符串表示(就是包括浏览器版本信息等的字符串)是否包含指定的字符串。
             * @param key {String} 指定的字符串。
             * @return {Boolean} 是否包含。
             */
            oThis.contains = function(key){
                return navigator.userAgent[_str_indexOf](key) >= 0;
            };

            /**
             * 判断浏览器是否是Firefox浏览器。
             * @return {Boolean} 是否是Firefox浏览器。
             */
            oThis.isFirefox = function(){
                return oThis.contains("Firefox") && ![].reduce;
            };

            /**
             * 处理网页来源页面的URL地址。
             * @return {String} 处理过的URL地址。
             */
            oThis.processSource = function(source){
                if(!source || !oThis.contains("Firefox")){
                    return source;
                }
                source = source.replace(/\n|\r/g, " ");
                for(var i = 0, len = source[_length]; i < len; ++i){
                    var charCode = source.charCodeAt(i)&255;
                    if(charCode == 10 || charCode == 13){
                        source = source[_substring](0, i) + "?" + source[_substring](i + 1);
                    }
                }
                return source;
            }
        },

        /**
         * 全局工具对象实例。
         */
        $Global = new Global(_o_window, document);

        /**
         * 创建对象方法绑定器。
         * @param o {Object} 要绑定方法的对象。
         * @return {Function} 用于向指定对象绑定方法的函数。
         */
    var CreateBinder = function(o){
            /**
             * 向指定对象绑定方法的函数。
             * @param method {String} 方法名称。
             * @param idx   {Int}
             * @param func  {Function}  要绑定的函数。
             * @return {Function} 绑定的函数。
             */
            return function(method, idx, func){
                o[method] = function(){
                    Register(idx);
                    return func.apply(o, arguments);
                };
                return func;
            }
        },
        
        /**
         * 添加监听事件。
         * @param element {Element} 注册方法的对象。
         * @param type {String} 要注册方法的事件。
         * @param listener {Function} 面加载完毕的回调方法。
         * @param useCapture {Boolean} 
         */
        AddListener = function(element, type, listener, useCapture){
            if(element.addEventListener){
                element.addEventListener(type, listener, !!useCapture);
            }else{
                element.attachEvent && element.attachEvent("on" + type, listener);
            }
        },

        /**
         * 判断一个对象是否是数组。
         * @param o {Object} 要判断的对象。
         * @return {Boolean} 是否是一个数组。
         */
        IsArray = function(o){
            return Object.prototype[_toString].call(Object(o)) == "[object Array]";
        },

        /**
         * 判断一个对象是否为空。
         * @param o {Object} 要判断的对象。
         * @return {Boolean} 是否为空。
         */
        IsEmpty = function(o){
            return ((_undefined == o) || ("-" == o) || ("" == o));
        },

        /**
         * 从数据字典（键值对）中捡选指定键的值。
         *  @param map {String} 数据字典（键值对）。
         *  @param key {String} 键。
         *  @param separator {String} 分隔符。
         *  @return {String} 取出的值。
         */
        Pick = function(map, key, separator){
            var result = "-",
                idx;
            if(!IsEmpty(map) && !IsEmpty(key) && !IsEmpty(separator)){
                idx = map[_str_indexOf](key);
                if(idx > -1){
                    var endIdx = map[_str_indexOf](separator, idx);
                    if(endIdx < 0){
                        endIdx = map[_length];
                    }
                    result = map[_substring](idx + key[_str_indexOf](_equal_) + 1, endIdx);
                }
            }
            return result;
        },

        /**
         * 检查对象是否是合法的哈希值。
         * @param o {Objecct} 需要检查的对象。
         * @return {Boolean} 检查结果。
         */
        CheckHash = function(o){
            var result = _false,
                code = 0,
                i,
                _char;
            if(!IsEmpty(o)){
                result = _true;
                for(i = 0; i < o[_length]; i++){
                    _char = o[_charAt](i);
                    code += "." == _char ? 1 : 0;
                    result = result && code <= 1 && (0 == i && "-" == _char || ".0123456789"[_str_indexOf](_char) > -1);
                }
            }
            return result;
        },

        /**
         * 编码字符串。
         * @param uri {String} 要编码的字符串。
         * @param isAll {Boolean} 是否要全部（包含":"、"/"、";" 和 "?"。）编码。
         * @return {String} 编码后的字符串。
         */
        Encode = function(uri, isAll){
            var _encode = _encodeURI;
            if(_encode instanceof Function){
                return isAll ? encodeURI(uri) : _encode(uri);
            }else{
                Register(68);
                return escape(uri);
            }
        },

        /**
         * 解码字符串。
         * @param encodedURI {String} 要编码的字符串。
         * @param isAll {Boolean} 是否要全部（包含":"、"/"、";" 和 "?"。）解码，。
         * @return {String} 解码后的字符串。
         */
        Decode = function(encodedURI, isAll){
            var _decode = decodeURIComponent,
                uri;
            encodedURI = encodedURI[_split]("+")[_join](" ");
            if(_decode instanceof Function){
                try{
                    uri = isAll ? decodeURI(encodedURI) : _decode(encodedURI);
                }catch(ex){
                    Register(17);
                    uri = unescape(encodedURI);
                }
            }else{
                Register(68);
                uri = unescape(encodedURI);
            }
            return uri;
        },

        /**
         * 在指定的字符中是否包含一个子字符串。
         * @param str {String} 指定的字符串。
         * @param sub {String} 子字符串。
         * @return {Boolean} 是否包含。
         */
        Contains = function(str, sub){
            return (str[_str_indexOf](sub) > -1);
        };

    /**
     * 清除字符串两端的回车和制表键。
     * @param str {String} 需要处理的字符串。
     * @return {String} 处理过的字符串。
     */
    function Trim(str){
        if(!str || "" == str){
            return "";
        }
        for(; str[_charAt](0)[_length] > 0 && " \n\r\t"[_str_indexOf](str[_charAt](0)) > -1;){
            str = str[_substring](1);
        }
        for(; str[_charAt](str[_length] - 1)[_length] > 0 && " \n\r\t"[_str_indexOf](str[_charAt](str[_length] - 1)) > -1;){
            str = str[_substring](0, str[_length] - 1);
        }
        return str;
    }
    
        /**
         * 给数组添加元素。
         * @param arr {Array} 要添加元素的数组。
         * @param value {Object} 要添加的元素。
         */
    var Push = function(arr, value){
            arr[_push] || Register(94);
            arr[arr[_length]] = value;
        },

        /**
         * 哈希函数。
         * @param str {String} 需要哈希的字符串。
         * @return ｛String｝哈希的结果字符串。
         */
        Hash = function(str){
            var hash = 1,
                charCode = 0,
                idx;
            if(!IsEmpty(str)){
                hash = 0;
                for(idx = str[_length] - 1; idx >= 0; idx--){
                    charCode = str.charCodeAt(idx);
                    hash = (hash << 6&268435455) + charCode+(charCode << 14);
                    charCode = hash&266338304;
                    hash = charCode != 0 ? hash ^ charCode>>21 : hash;
                }
            }
            return hash;
        },

        /**
         * 取随机整数。
         * @return 随机的整数。
         */
        Random = function(){
            /*
             * 2,147,483,647（二十一亿四千七百四十八万三千六百四十七）是2147483646与2147483648之间的自然数，
             * 也是欧拉在1772年所发现的一个梅森素数，它等于2^31 -1，是32位操作系统中最大的符号型整型常量。
             */
            return _o_math.round(_o_math.random() * 2147483647);
        },

        /**
         * 空函数对象。
         */
        emptyFunction = function(){};

        /**
         * 搜索引擎自然搜索排名带来的流量。
         * @param engine {String} 搜索引擎的域名。
         * @param keyword {String} 搜索引擎使用的关键词的参数键。
         */
    var Organic = function(engine, keyword){
            this.engine = engine;
            this.keyword = keyword;
        },

        /**
         * 配置类。
         */
        Config = function(){
            /**
             * 解析搜索引擎及搜索关键词数据。
             * @param data {String} 搜索引擎及搜索关键词数据。
             * @return {Array} 解析过的搜索引擎及搜索关键词数据。
             */
            function parseOrganicData(data){
                var organic = [];
                data = data[_split](",");
                for(var item, i = 0; i < data[_length]; i++){
                    item = data[i][_split](":");
                    organic[_push](new Organic(item[0], item[1]));
                }
                return organic;
            }

            var oThis = this;
            oThis.campaign = "utm_campaign";
            oThis.content = "utm_content";
            oThis.id = "utm_id";
            oThis.medium = "utm_medium";
            oThis.nooverride = "utm_nooverride";
            oThis.source = "utm_source";
            oThis.term = "utm_term";
            oThis.clid = "gclid";
            oThis.allowAnchor = 0;
            oThis.allowLinker = 0;
            oThis.campaignCookieTimeout = 15768E6;
            oThis.sessionCookieTimeout = 18E5;
            oThis.visitorCookieTimeout = 63072E6;
            oThis.ignoredOrganic  = [];
            oThis.ignoredReferral = [];
            oThis.googleCustomSearchPath = "cse";
            oThis.googleKey = "q";
            oThis.maxCustomVariables = 50;
            oThis.organic = parseOrganicData("daum:q,eniro:search_word,naver:query,pchome:q,images.google:q,google:q,yahoo:p,yahoo:q,msn:q,bing:q,aol:query,aol:encquery,aol:q,lycos:query,ask:q,altavista:q,netscape:query,cnn:query,about:terms,mamma:q,alltheweb:q,voila:rdata,virgilio:qs,live:q,baidu:wd,alice:qs,yandex:text,najdi:q,mama:query,seznam:q,search:q,wp:szukaj,onet:qt,szukacz:q,yam:k,kvasir:q,sesam:q,ozu:q,terra:query,mynet:q,ekolay:q,rambler:query,rambler:words");
            oThis.cookiePath = "/";
            oThis.sampleRate = 100;
            oThis.localGifPath = "/__utm.gif";
            oThis.detectTitle = 1;
            oThis.detectFlash = 1;
            oThis.transactionDelim = "|";
            oThis.clientInfo = 1;
            oThis.campaignTrack = 1;
            oThis.allowHash = 1;
            oThis.domain = "auto";
            oThis.localServerMode = 1;
            oThis.Sc = 10;
            oThis.Qb = 10;
            oThis.Tc = 0.2;
            oThis.namespace = _undefined;
        };

        /**
         * Cookie操作工具类。
         * @param config {Object} 配置信息。
         */
    var Cookie = function(config){
            /**
             * 获取指定的Cookie值。
             * @param cookie {String} 全部Cookie。
             * @param param {String} 读取Cookie的参数。
             * @param namespace {String} 命名空间。
             * @param ignoreExpires {Boolean} 是否忽略Cookie的过期时间。
             * @return {String} cookie值。
             */
            function pick(cookie, param, namespace, ignoreExpires){
                var value = "",
                    expires = 0;
                value = Pick(cookie, "2" + param, ";");
                if(!IsEmpty(value)){
                    var idx = value[_str_indexOf]("^" + namespace + ".");
                    if(idx < 0){
                        return["", 0];
                    }
                    value = value[_substring](idx + namespace[_length] + 2);
                    if(value[_str_indexOf]("^") > 0){
                        value = value[_split]("^")[0];
                    }
                    var values = value[_split](":");
                    value = values[1];
                    expires = parseInt(values[0], 10);
                    if(!ignoreExpires && expires < oThis.currentTime){
                        value = "";
                    }
                }
                if(IsEmpty(value)){
                    value = "";
                }
                return [value, expires];
            }

            /**
             * 组合cookie的值和命名空间。
             * @param value {Array} 形如：[Cookie的值,Cookie过期时间]。
             * @param namespace {String} 命名空间。
             * @return {String} 组合后的Cookie。
             */
            function combine(value, namespace){
                return "^" + [[namespace, value[1]][_join]("."), value[0]][_join](":");
            }

            /**
             * 获取设置了Cookie的过期时间的字符串。
             * @param timeout {Int} Cookie的过期时间。
             * @return {String} 设置了Cookie的过期时间的字符串。
             */
            function getCookieExpires(timeout){
                var date = new Date;
                timeout = new Date(date[_getTime]() + timeout);
                return "expires=" + timeout.toGMTString() + "; ";
            }

            var oThis = this,
                _config = config;
            oThis.currentTime = (new Date)[_getTime]();
            var params = [_param_utma, _param_utmb, _param_utmc, _param_utmz, _param_utmv, _param_utmx, _param_gaso];

            /**
             * 取出Cookie对象。
             * @return {String} Cookie对象。
             */
            oThis.getCookie = function(){
                var cookie = $Global[_str_document][_cookie];
                return _config.namespace ? oThis.getCookieByNamespace(cookie, _config.namespace) : cookie;
            };

            /**
             * 根据命名空间，取出所有需要的Cookie。
             * @param cookie {String} 全部Cookie。
             * @param namespace {String} 命名空间。
             * @return {String} 需要的Cookie。
             */
            oThis.getCookieByNamespace = function(cookie, namespace){
                for(var arrParams = [], value, i = 0; i < params[_length]; i++){
                    value = pick(cookie, params[i], namespace)[0];
                    IsEmpty(value) || (arrParams[arrParams[_length]] = params[i] + value + ";");
                }
                return arrParams[_join]("");
            };

            /**
             * 设置Cookie的值。
             * @param key {String} Cookie的键。
             * @param value {String} Cookie的值。
             * @param timeout {Int} Cookie的过期时间。
             */
            oThis.setCookie = function(key, value, timeout){
                var cookie = timeout > 0 ? getCookieExpires(timeout) : "";
                if(_config.namespace){
                    value = oThis.setCookieByNamespace($Global[_str_document][_cookie], key, _config.namespace, value, timeout);
                    key = "2" + key;
                    cookie = timeout > 0 ? getCookieExpires(_config.visitorCookieTimeout) : "";
                }
                key += value;
                key = $Global.processSource(key);
                if(key[_length] > 2E3){
                    Register(69);
                    key = key[_substring](0, 2E3)
                }
                cookie = key + "; path=" + _config.cookiePath + ";" + cookie + oThis.getCookieDomain();
                $Global[_str_document].cookie = cookie;
            };

            /**
             * 设置带命名空间的Cookie。
             * @param cookie {String} Cookie对象。
             * @param key {String} Cookie的键。
             * @param namespace {String} 命名空间。
             * @param value {String} Cookie的值。
             * @param timeout {Int} Cookie的过期时间。
             * @return {String} 设置完毕的Cookie值。
             */
            oThis.setCookieByNamespace = function(cookie, key, namespace, value, timeout){
                var _value = "";
                timeout = timeout || _config.visitorCookieTimeout;
                value = combine([value, oThis.currentTime + timeout * 1], namespace);
                _value = Pick(cookie, "2" + key, ";");
                if(!IsEmpty(_value)){
                    cookie = combine(pick(cookie, key, namespace, _true), namespace);
                    _value = _value[_split](cookie)[_join]("");
                    return _value = value + _value;
                }
                return value;
            };

            /**
             * 获取设置了Cookie域的字符串。
             * @return {String} 设置了Cookie域的字符串。
             */
            oThis.getCookieDomain = function(){
                return IsEmpty(_config.domain) ? "" : "domain="+ _config.domain + ";";
            }
        };

        /**
         * Google Analytics（分析）的Cookie操作工具类。
         * @param config {Config} 配置信息。
         */
    var GaCookie = function(config){
        /**
         * 把数组的所有元素连接到一起。
         * @param arr {Array} 要连接的数组。
         */
        function join(arr){
            arr = IsArray(arr) ? arr[_join](".") : "";
            return IsEmpty(arr) ? "-" : arr;
        }

        /**
         * 把字符串切割成数组。
         * @param str {String} 要切割的字符串。
         * @param n {Boolean} 
         * @return {Array} 切割后的数组。
         */
        function split(str, n){
            var result = [], i;
            if(!IsEmpty(str)){
                result = str[_split](".");
                if(n){
                    for(i = 0; i < result[_length]; i++){
                        CheckHash(result[i]) || (result[i] = "-");
                    }
                }
            }
            return result;
        }

        /**
         * 从数据字典（键值对）中捡选指定键的值。
         *  @param map {String} 数据字典（键值对）。
         *  @param domainHash {String} 域名哈希值。
         *  @param separator {String} 分隔符。
         */
        function initUTMParams(map, domainHash, separator){
            var _utmParams = oThis.UTMParams,
                i,
                param;
            for(i = 0; i < _utmParams[_length]; i++){
                param = _utmParams[i][0];
                param += IsEmpty(domainHash) ? domainHash : domainHash + _utmParams[i][4];
                _utmParams[i][2](Pick(map, param, separator));
            }
        }
        
        var arrUTMA,
            arrUTMB,
            arrUTMC,
            arrUTMZ,
            _arrUTMV,
            _utmx,
            _GASO,
            oThis = this,
            _utmParamsHash,
            _config = config;
        oThis.cookie = new Cookie(config);

        /**
         * 检查参数哈希值是不是存在，是不是一致。
         * @return {Boolean} 检查结果。
         */
        oThis.checkParamsHash = function(){
            return _undefined == _utmParamsHash || _utmParamsHash == oThis.hashUTMParams();
        };

        /**
         * 获取Cookie对象的内容。
         * @param {String} Cookie对象的内容。
         */
        oThis.getCookie = function(){
            return oThis.cookie.getCookie();
        };

        oThis.getUTMX = function(){
            return _utmx ? _utmx : "-";
        };

        oThis.setUTMX = function(utmx){
            _utmx = utmx;
        };

        oThis.setUTMParamsHash = function(hash){
            _utmParamsHash = CheckHash(hash) ? hash * 1 : "-";
        };

        oThis.getUTMV = function(){
            return join(_arrUTMV);
        };
        oThis.setUTMV = function(utmv){
            _arrUTMV = split(utmv);
        };

        oThis.deleteUTMVCookie = function(){
            oThis.cookie.setCookie(_param_utmv, "", -1);
        };

        oThis.getUTMParamsHash = function(){
            return _utmParamsHash ? _utmParamsHash : "-";
        };

        oThis.getCookieDomain = function(){
            return IsEmpty(_config.domain) ? "" : "domain=" + _config.domain + ";";
        };

        oThis.getUTMA = function(){
            return join(arrUTMA);
        };

        oThis.setUTMA = function(utma){
            arrUTMA = split(utma, 1);
        };

        oThis.getUTMB = function(){
            return join(arrUTMB);
        };

        oThis.setUTMB = function(utmb){
            arrUTMB = split(utmb, 1);
        };

        oThis.getUTMC = function(){
            return join(arrUTMC);
        };

        oThis.setUTMC = function(utmc){
            arrUTMC = split(utmc, 1);
        };

        oThis.getUTMZ = function(){
            return join(arrUTMZ);
        };

        oThis.setUTMZ = function(utmz){
            arrUTMZ = split(utmz);
            for(var i = 0; i < arrUTMZ[_length]; i++){
                if(i < 4 && !CheckHash(arrUTMZ[i])){
                    arrUTMZ[i] = "-";
                }
            }
        };

        oThis.getGASO = function(){
            return _GASO;
        };

        oThis.setGASO = function(gaso){
            _GASO = gaso;
        };

        oThis.initialize = function(){
            arrUTMA = [];
            arrUTMB = [];
            arrUTMC = [];
            arrUTMZ = [];
            _utmx = _undefined;
            _arrUTMV = [];
            _utmParamsHash = _undefined
        };

        oThis.hashUTMParams = function(){
            for(var params = "", i = 0; i < oThis.UTMParams[_length]; i++){
                params += oThis.UTMParams[i][1]();
            }
            return Hash(params);
        };

        oThis.setDomainHashByCookie = function(domainHash){
            var cookie = oThis.getCookie(),
                result = _false;
            if(cookie){
                initUTMParams(cookie, domainHash, ";");
                oThis.setUTMParamsHash(_o_string(oThis.hashUTMParams()));
                result = _true;
            }
            return result;
        };

        oThis.setUTMKHashByLocation = function(params){
            initUTMParams(params, "", _amp_);
            oThis.setUTMParamsHash(Pick(params, _param_utmk, _amp_))
        };

        oThis.getParams = function(){
            var _utmParams = oThis.UTMParams,
                _params = [],
                i;
            for(i = 0; i < _utmParams[_length]; i++){
                Push(_params, _utmParams[i][0] + _utmParams[i][1]());
            }
            Push(_params, _param_utmk + oThis.hashUTMParams());
            return _params[_join](_amp_);
        };

        oThis.copyCookiePath = function(domainHash, cookiePath){
            var _utmParams = oThis.UTMParams,
                _cookiePath = _config.cookiePath;
            oThis.setDomainHashByCookie(domainHash);
            _config.cookiePath = cookiePath;
            for(var i = 0; i < _utmParams[_length]; i++){
                if(!IsEmpty(_utmParams[i][1]()))
                {
                    _utmParams[i][3]();
                    _config.cookiePath = _cookiePath;
                }
            }
        };

        oThis.setUTMACookie = function(){
            oThis.cookie.setCookie(_param_utma, oThis.getUTMA(), _config.visitorCookieTimeout)
        };

        oThis.setUTMBCookie = function(){
            oThis.cookie.setCookie(_param_utmb, oThis.getUTMB(), _config.sessionCookieTimeout)
        };

        oThis.setUTMCCookie = function(){
            oThis.cookie.setCookie(_param_utmc, oThis.getUTMC(), 0)
        };

        oThis.setUTMZCookie = function(){
            oThis.cookie.setCookie(_param_utmz, oThis.getUTMZ(), _config.campaignCookieTimeout)
        };

        oThis.setUTMXCookie = function(){
            oThis.cookie.setCookie(_param_utmx, oThis.getUTMX(), _config.visitorCookieTimeout)
        };

        oThis.setUTMVCookie = function(){
            oThis.cookie.setCookie(_param_utmv, oThis.getUTMV(), _config.visitorCookieTimeout)
        };

        oThis.setGASOCookie = function(){
            oThis.cookie.setCookie(_param_gaso, oThis.getGASO(), 0)
        };

        oThis.UTMParams = [
            [_param_utma, oThis.getUTMA, oThis.setUTMA, oThis.setUTMACookie, "."],
            [_param_utmb, oThis.getUTMB, oThis.setUTMB, oThis.setUTMBCookie, ""],
            [_param_utmc, oThis.getUTMC, oThis.setUTMC, oThis.setUTMCCookie, ""],
            [_param_utmx, oThis.getUTMX, oThis.setUTMX, oThis.setUTMXCookie, ""],
            [_param_utmz, oThis.getUTMZ, oThis.setUTMZ, oThis.setUTMZCookie, "."],
            [_param_utmv, oThis.getUTMV, oThis.setUTMV, oThis.setUTMVCookie, "."]
        ]
    };

    var google_analytics_domain = "https:" == $Global[_str_document][_location][_protocol] ? "https://ssl.google-analytics.com/" : "http://www.google-analytics.com/",
        google_analytics_path = google_analytics_domain + "p/__utm.gif",

        /**
         * 用于向服务器发出请求的对象。
         */
        Ajax = function(){
            var oThis = this;

            /**
             * 发送请求。
             * @param url {String} 发送请求的地址。
             * @param param {String} 发送请求的参数串。
             * @param mark {String} 请求的标识（包括版本号、随机整数ID、UA账号、域名哈希值）。
             * @param callback {Function} 回调函数。
             * @param _ioo {Boolean}
             */
            oThis.send = function(url, param, mark, callback, _ioo){
                if(param[_length] <= 2036 || _ioo){
                    oThis.sendByImage(url + "?" + param, callback);
                }else if(param[_length] <= 8192){
                    $Global.isFirefox() ? oThis.sendByImage(url + "?" + mark + "&err=ff2post&len=" + param[_length], callback) : oThis.Send(param, callback);
                }else{
                    oThis.sendByImage(url + "?" + mark + "&err=len&max=8192&len=" + param[_length], callback);
                }
            };

            /**
             * 使用图片对象发出请求。
             * @param src {String} 组装完毕的图片的地址。
             * @param callback {Function} 回调函数。
             */
            oThis.sendByImage = function(src, callback){
                var image = new Image(1, 1);
                image.src = src;
                image.onload = function(){
                    image.onload = null;
                    (callback || emptyFunction)()
                }
            };

            /**
             * 根据情况使用XMLHttpRequest或iframe对象发出请求。
             * @param param {String} 发送请求的参数串。
             * @param callback {Function} 回调函数。
             */
            oThis.Send = function(param, callback){
                oThis.sendByRequest(param, callback) || oThis.sendByIFrame(param, callback)
            };

            /**
             * 使用XMLHttpRequest对象发出请求。
             * @param param {String} 发送请求的参数串。
             * @param callback {Function} 回调函数。
             */
            oThis.sendByRequest = function(param, callback){
                var request,
                    Request = $Global[_str_window].XDomainRequest;
                if(Request){
                    request = new Request;
                    request.open("POST", google_analytics_path);
                }else if(Request = $Global[_str_window].XMLHttpRequest){
                    Request = new Request;
                    if("withCredentials"in Request){
                        request = Request;
                        request.open("POST", google_analytics_path, _true);
                        request.setRequestHeader("Content-Type", "text/plain");
                    }
                }
                if(request){
                    request.onreadystatechange = function(){
                        if(request.readyState == 4){
                            callback && callback();
                            request = null;
                        }
                    };
                    request.send(param);
                    return _true;
                }
                return _false;
            };

            /**
             * 使用iframe对象发出请求。
             * @param param {String} 发送请求的参数串。
             * @param callback {Function} 回调函数。
             */
            oThis.sendByIFrame = function(param, callback){
                var doc = $Global[_str_document];
                if(doc.body){
                    param = _encodeURI(param);
                    try{
                        var fra = doc.createElement('<iframe name="' + param + '"></iframe>');
                    }catch(ex){
                        fra = doc.createElement("iframe");
                        fra.name = param;
                    }
                    fra.height = "0";
                    fra.width = "0";
                    fra.style.display = "none";
                    fra.style.visibility = "hidden";
                    var _loca = doc[_location];
                    _loca = _loca[_protocol] + "//" + _loca.host + "/favicon.ico";
                    _loca = google_analytics_domain + "u/post_iframe.html#" + _encodeURI(_loca);
                    var setFra = function(){
                        fra.src = "";
                        fra.parentNode && fra.parentNode.removeChild(fra);
                    };

                    AddListener($Global[_str_window], "beforeunload", setFra);
                    var succes = _false,
                        i = 0,
                        fraLoad = function(){
                            if(!succes){
                                try{
                                    if(i > 9 || fra.contentWindow[_location].host == doc[_location].host){
                                        succes = _true;
                                        setFra();
                                        var win = $Global[_str_window],
                                            _beforeunload = "beforeunload",
                                            _setFra = setFra;
                                        if(win.removeEventListener){
                                            win.removeEventListener(_beforeunload, _setFra, _false); }
                                        else{
                                            win.detachEvent && win.detachEvent("on" + _beforeunload, _setFra);
                                        }
                                        callback && callback();
                                        return
                                    }
                                }catch(ex){}
                                i++;
                                $Global.setTimeout(fraLoad, 200)
                            }
                        };
                    AddListener(fra, "load", fraLoad);
                    doc.body.appendChild(fra);
                    fra.src = _loca;
                }else{
                    $Global.setTimeout(function(){
                            oThis.sendByIFrame(param, callback);
                        }, 100)
                }
            }
        };

        /**
         * Google Analytics（分析）用于向服务器发出请求的对象。。
         * @param config {Config} 配置信息。
         */
    var GaAjax = function(config){
        var oThis = this,
            _config = config,
            _gaCookie = new GaCookie(_config),
            ajax = new Ajax,
            _ioo = !_TrackerFactory.getGaUserPrefs(),
            emptyFunction = function(){};

        /**
         * 获取Google Analytics（分析）服务的URL路径地址。
         * @return {String} Google Analytics（分析）服务的URL路径地址。
         */
        oThis.getGoogleAnalyticsPath = function(){
            return"https:" == $Global[_str_document][_location][_protocol] ? "https://ssl.google-analytics.com/__utm.gif" : "http://www.google-analytics.com/__utm.gif"
        };

        /**
         * 发出请求。
         * @param param {String} 发送请求的参数串。
         * @param account {String}  UA 编号，网络载体 ID。
         * @param domainHash {String} 域名的哈希值。
         * @param e {Boolean}
         * @param d {Boolean}
         * @param callback {Function} 回调函数。
         */
        oThis.send = function(param, account, domainHash, e, d, callback){
            var localServerMode = _config.localServerMode,
                location = $Global[_str_document][_location];
                _gaCookie.setDomainHashByCookie(domainHash);
            //和_utmc一起决定访客的Session
            var arr_utmb = _gaCookie.getUTMB()[_split](".");
            if(arr_utmb[1] < 500 || e){
                if(d){
                    var _time = (new Date)[_getTime](),
                        o;
                    o = (_time - arr_utmb[3]) * (_config.Tc/1E3);//127635166.2.10.1264374807
                    if(o >= 1){
                        arr_utmb[2] = _o_math.min(_o_math.floor(arr_utmb[2] * 1 + o), _config.Qb);
                        arr_utmb[3] = _time;
                    }
                }
                if(e || !d || arr_utmb[2] >= 1){
                    if(!e && d){
                        arr_utmb[2] = arr_utmb[2] * 1 - 1;
                    }
                    arr_utmb[1] = arr_utmb[1] * 1 + 1;
                    var _version = "utmwv=" + _version_;
                    _time = "&utmn=" + Random();
                    var mark = _version + "e"+ _time;
                    param = _version + _time + (IsEmpty(location.hostname) ? "" : "&utmhn=" + Encode(location.hostname)) + (_config.sampleRate == 100 ? "" : "&utmsp=" + Encode(_config.sampleRate)) + param;
                    if(0 == localServerMode || 2 == localServerMode){
                        callback = 2 == localServerMode ? emptyFunction : callback || emptyFunction;
                        _ioo && ajax.send(_config.localGifPath, param, mark, callback, _true);
                    }
                    if(1 == localServerMode || 2 == localServerMode){
                        account = "&utmac=" + account;
                        mark += account;
                        param += account + "&utmcc=" + oThis.getCheckCode(domainHash);
                        if(_TrackerFactory.anonymizeIp){
                            domainHash = "&aip=1";
                            mark += domainHash;
                            param += domainHash
                        }
                        param += "&utmu=" + registry.getUTMU();
                        _ioo && ajax.send(oThis.getGoogleAnalyticsPath(), param, mark, callback);
                    }
                }
            }
            _gaCookie.setUTMB(arr_utmb[_join]("."));
            _gaCookie.setUTMBCookie()
        };

        /**
         * 获取验证码。
         * @param domainHash {String} 域名哈希值。
         * @return {String} 验证码。
         */
        oThis.getCheckCode = function(domainHash){
            for(var _params_hash = [], params = [_param_utma, _param_utmz, _param_utmv, _param_utmx], cookie = _gaCookie.getCookie(), _domainHash, i = 0; i < params[_length]; i++){
                _domainHash = Pick(cookie, params[i] + domainHash, ";");
                if(!IsEmpty(_domainHash)){
                    if(params[i] == _param_utmv){
                        _domainHash = _domainHash[_split](domainHash + ".")[1][_split]("|")[0];
                        if(IsEmpty(_domainHash)){
                            continue;
                        }
                        _domainHash = domainHash + "." + _domainHash;
                    }
                    Push(_params_hash, params[i] + _domainHash + ";");
                }
            }
            return Encode(_params_hash[_join]("+"));
        }
    };

         /**
          * 电子商务网站交易跟踪器。
          */
    var GaEComm = function(){
        var oThis = this;
        oThis.transactions = [];

        /**
         * 使用特定的值创建交易对象。
         * @param orderId {String} 必填。此交易的内部唯一订单 ID 号。
         * @return {_gat.GA_EComm_.Transactions_} 所创建或修改的交易对象。
         */
        oThis.addItem = function(orderId){
            for(var _tran, _trans = oThis.transactions, i = 0; i < _trans[_length]; i++){
                _tran = orderId == _trans[i].orderId ? _trans[i] : _tran;
            }
            return _tran;
        };

        /**
         * 使用特定的值创建交易对象。与 _addItem() 一样，此方法仅处理交易跟踪，不提供其他电子商务功能。
         * 因此，如果相关交易与相应会话中的现有交易重复，则旧交易值将会被新交易值覆盖。
         * 此方法的参数按位置进行匹配，因此请务必提供所有参数，即使其中某些参数的值为空也应如此。
         * @param orderId {String} 必填。此交易的内部唯一订单 ID 号。
         * @param affiliation {String} 可选。合作伙伴或联营店铺（如果空缺则表示未定义）。
         * @param total {String} 必填。交易的总金额。
         * @param tax {String} 可选。交易的税额。
         * @param shipping {String} 可选。交易的运费。
         * @param city {String} 可选。与交易相关的城市。
         * @param state {String} 可选。与交易相关的省/直辖市/自治区。
         * @param country {String} 可选。与交易相关的国家/地区。
         * @return {_gat.GA_EComm_.Transactions_} 所创建或修改的交易对象。
         */
        oThis.addTrans = function(orderId, affiliation, total, tax, shipping, city, state, country){
            var transaction = oThis.addItem(orderId);
            if(_undefined == transaction){
                transaction = new GaEComm.Transaction(orderId, affiliation, total, tax, shipping, city, state, country);
                Push(oThis.transactions, transaction);
            }else{
                transaction.affiliation = affiliation;
                transaction.total = total;
                transaction.tax = tax;
                transaction.shipping = shipping;
                transaction.city = city;
                transaction.state = state;
                transaction.country = country;
            }
            return transaction;
        }
    };

   /**
     * 电子商务网站上购买的物品。
     * @param orderId {String} 可选。与物品相关联的交易的订单 ID。
     * @param sku {String} 必填。物品的 SKU 代码。
     * @param name {String} 可选。产品名称。要在产品明细报告中看到数据，必须提供此参数。
     * @param category {String} 可选。产品类别。
     * @param price {String} 必填。产品价格。
     * @param quantity {String} 必填。购买数量。
     */
    GaEComm.Item = function(orderId, sku, name, category, price, quantity){
        var oThis = this;
        oThis.orderId = orderId;
        oThis.sku = sku;
        oThis.name = name;
        oThis.category = category;
        oThis.price = price;
        oThis.quantity = quantity;

        /**
         * 串行化当前实例。
         * @return {String} 串行化后的实例。
         */
        oThis.serialize = function(){
            return "&" + ["utmt=item", "tid=" + Encode(oThis.orderId), "ipc=" + Encode(oThis.sku), "ipn=" + Encode(oThis.name), "iva=" + Encode(oThis.category), "ipr=" + Encode(oThis.price), "iqt=" + Encode(oThis.quantity)][_join]("&utm");
        }
    };

    /**
     * 使用特定的值创建交易对象。与 _addItem() 一样，此方法仅处理交易跟踪，不提供其他电子商务功能。
     * 因此，如果相关交易与相应会话中的现有交易重复，则旧交易值将会被新交易值覆盖。
     * 此方法的参数按位置进行匹配，因此请务必提供所有参数，即使其中某些参数的值为空也应如此。
     * @param orderId {String} 必填。此交易的内部唯一订单 ID 号。
     * @param affiliation {String} 可选。合作伙伴或联营店铺（如果空缺则表示未定义）。
     * @param total {String} 必填。交易的总金额。
     * @param tax {String} 可选。交易的税额。
     * @param shipping {String} 可选。交易的运费。
     * @param city {String} 可选。与交易相关的城市。
     * @param state {String} 可选。与交易相关的省/直辖市/自治区。
     * @param country {String} 可选。与交易相关的国家/地区。
     */
    GaEComm.Transaction = function(orderId, affiliation, total, tax, shipping, city, state, country){
        var oThis = this;
        oThis.orderId = orderId;
        oThis.affiliation = affiliation;
        oThis.total = total;
        oThis.tax = tax;
        oThis.shipping = shipping;
        oThis.city = city;
        oThis.state = state;
        oThis.country = country;
        oThis.items = [];

       /**
         * 使用此方法可以跟踪访问者在您的电子商务网站上购买的物品。
         * 此方法根据各种物品的 SKU 来对其进行跟踪。也就是说，sku 参数为必填。
         * 然后，此方法会通过 orderId 参数将相应物品与父交易对象关联在一起。
         * @param sku {String} 必填。物品的 SKU 代码。
         * @param name {String} 可选。产品名称。要在产品明细报告中看到数据，必须提供此参数。
         * @param category {String} 可选。产品类别。
         * @param price {String} 必填。产品价格。
         * @param quantity {String} 必填。购买数量。
         */
        oThis.addItem = function(sku, name, category, price, quantity){
            var item = oThis.getItem(sku),
                orderId = oThis.orderId;
            if(_undefined == item){
                Push(oThis.items, new GaEComm.Item(orderId, sku, name, category, price, quantity));
            }
            else{
                item.orderId = orderId;
                item.sku = sku;
                item.name = name;
                item.category = category;
                item.price = price;
                item.quantity = quantity;
            }
        };

        /**
         * 根据SKU（库存控制单元）获取一个商品项目。
         * @param sku {String} SKU（库存控制单元）。
         * @return {GaEComm.Item} 商品项目。
         */
        oThis.getItem = function(sku){
            for(var item, _items = oThis.items, i = 0; i < _items[_length]; i++){
                item = sku == _items[i].sku ? _items[i] : item;
            }
            return item;
        };

        /**
         * 串行化当前实例。
         * @return {String} 串行化后的实例。
         */
        oThis.serialize = function(){
            return "&" + ["utmt=tran", "id=" + Encode(oThis.orderId), "st=" + Encode(oThis.affiliation), "to=" + Encode(oThis.total), "tx=" + Encode(oThis.tax), "sp=" + Encode(oThis.shipping), "ci=" + Encode(oThis.city), "rg=" + Encode(oThis.state), "co=" + Encode(oThis.country)][_join]("&utmt");
        }
    };

        /**
         * 客户端信息收集对象。
         * @param detectFlash {Boolean} 是否检测FLASH播放器的版本号。
         */
    var Client = function(detectFlash){

        /**
         * 获取浏览器FLASH播放器的版本号。
         * @return {String} FLASH播放器的版本号。
         */
        function getFlashVersion(){
            var _active_x_object,
                _flash,
                _version;
            _flash = "ShockwaveFlash";
            var _version_key = "$version",
                navigator = $Global[_str_window].navigator;
            if((navigator = navigator ? navigator.plugins : _undefined) && navigator[_length] > 0){
                for(var i = 0; i < navigator[_length] && !_version; i++){
                    _flash = navigator[i];
                    if(Contains(_flash.name, "Shockwave Flash")){
                        _version = _flash.description[_split]("Shockwave Flash ")[1];
                    }
                }
            }else{
                _flash = _flash + "." + _flash;
                try{
                    _active_x_object = new ActiveXObject(_flash + ".7");
                    _version = _active_x_object.GetVariable(_version_key)
                }catch(ex){}
                if(!_version){
                    try{
                        _active_x_object = new ActiveXObject(_flash + ".6");
                        _version = "WIN 6,0,21,0";
                        _active_x_object.$_version = "always";
                        _version = _active_x_object.GetVariable(_version_key)
                    }catch(ex){}
                }
                if(!_version){
                    try{
                        _active_x_object = new ActiveXObject(_flash);
                        _version = _active_x_object.GetVariable(_version_key)
                    }catch(ex){}
                }
                if(_version){
                    _version = _version[_split](" ")[1][_split](",");
                    _version = _version[0] + "." +  _version[1] + " r" + _version[2];
                }
            }
            return _version ? _version : _empty;
        }

        var oThis = this,
            _empty = "-",
            screen = $Global[_str_window].screen,
            navigator = $Global[_str_window].navigator;

        oThis.screen = screen ? screen.width + "x" + screen.height : _empty;
        oThis.colorDepth = screen ? screen.colorDepth + "-bit" : _empty;
        oThis.charset = Encode($Global[_str_document].characterSet ? $Global[_str_document].characterSet : $Global[_str_document].charset ? $Global[_str_document].charset : _empty);
        oThis.language = (navigator && navigator.language ? navigator.language : navigator && navigator.browserLanguage ? navigator.browserLanguage : _empty)[_toLowerCase]();
        oThis.javaEnabled = navigator && navigator.javaEnabled() ? 1 : 0;
        oThis.flashVersion = detectFlash ? getFlashVersion() : _empty;

        /**
         * 获取客户端信息。
         * @return {String} 客户端信息。
         */
        oThis.getClientInfo = function(){
            return _amp_ + "utm" + ["cs=" + Encode(oThis.charset), "sr=" + oThis.screen, "sc=" + oThis.colorDepth, "ul=" + oThis.language, "je=" + oThis.javaEnabled, "fl=" + Encode(oThis.flashVersion)][_join]("&utm");
        };

        /**
         * 获取客户端信息的哈希值。
         * @return {String} 客户端信息的哈希值。
         */
        oThis.hashClientInfo = function(){
            var navigator = $Global[_str_window].navigator,
                history_length = $Global[_str_window].history[_length];
            navigator= navigator.appName + navigator.version + oThis.language + navigator.platform + navigator.userAgent + oThis.javaEnabled + oThis.screen + oThis.colorDepth + ($Global[_str_document][_cookie] ? $Global[_str_document][_cookie] : "") + ($Global[_str_document].referrer ? $Global[_str_document].referrer : "");
            for(var len = navigator[_length]; history_length > 0; ){
                navigator += history_length-- ^ len++;
            }
            return Hash(navigator);
        }
    };

        /**
         * 来源跟踪器。
         * @param domainHash {String} 域名哈希值。
         * @param processedSource {String} 处理过的来源URL。
         * @param timestamp {Int} 时间戳。
         * @param config {Config} 配置信息类。
         */
    var SourceTracker = function(domainHash, processedSource, timestamp, config){
        
        /**
         * 从URL地址中截取域名。
         * @param url {String} URL地址。
         * @return {String} 域名。
         */
        function getDomain(url){
            var _domain = "";
            _domain = url[_split]("://")[1][_toLowerCase]();
            if(Contains(_domain, "/")){
                _domain = _domain[_split]("/")[0];
            }
            return _domain;
        }

        var _config = config,
            oThis = this;
        oThis.domainHash = domainHash;
        oThis.processedSource = processedSource;
        oThis.timestamp = timestamp;

        /**
         * 根据URL地址创建搜索引擎来源对象。
         * @param url {String} URL地址。
         * @return {String} 搜索引擎来源对象。
         */
        oThis.createOrganicSource = function(url){
            var organic = oThis.getOrganicSource();
            return new SourceTracker.Source(Pick(url, _config.id + _equal_, _amp_), Pick(url, _config.source + _equal_, _amp_), Pick(url, _config.clid + _equal_, _amp_), oThis.getValue(url, _config.campaign, "(not set)"), oThis.getValue(url, _config.medium, "(not set)"), oThis.getValue(url, _config.term, organic && !IsEmpty(organic.term) ? Decode(organic.term) : _undefined), oThis.getValue(url, _config.content, _undefined));
        };

        /**
         * 检查URL地址，判断是否是Google自定义搜索的地址。
         * @param url {String} URL地址。
         * @return {Boolean} 是否是Google自定义搜索的地址。
         */
        oThis.isGoogleCustomSearch = function(url){
            var _domain = getDomain(url),
                _url;
            _url = url;
            var path = "";
            _url = _url[_split]("://")[1][_toLowerCase]();
            if(Contains(_url, "/")){
                _url = _url[_split]("/")[1];
                if(Contains(_url, "?")){
                    path = _url[_split]("?")[0]
                }
            }
            _url = path;
            if(Contains(_domain, "google")){
                url = url[_split]("?")[_join](_amp_);
                if(Contains(url, _amp_ + _config.googleKey + _equal_)){
                    if(_url == _config.googleCustomSearchPath){
                        return _true;
                    }
                }
            }
            return _false;
        };

        /**
         * 获取搜索引擎来源对象。
         * @return {String} 搜索引擎来源对象。
         */
        oThis.getOrganicSource = function(){
            var key,
                processedSource = oThis.processedSource,
                _organic,
                organic = _config.organic;
            if(!(IsEmpty(processedSource) || "0" == processedSource || !Contains(processedSource, "://") || oThis.isGoogleCustomSearch(processedSource))){
                key = getDomain(processedSource);
                for(var i = 0; i < organic[_length]; i++){
                    _organic = organic[i];
                    if(Contains(key, _organic.engine[_toLowerCase]())){
                        processedSource = processedSource[_split]("?")[_join](_amp_);
                        if(Contains(processedSource, _amp_ + _organic.keyword + _equal_)){
                            key = processedSource[_split](_amp_ + _organic.keyword + _equal_)[1];
                            if(Contains(key, _amp_)){
                                key = key[_split](_amp_)[0];
                            }
                            return new SourceTracker.Source(_undefined, _organic.engine, _undefined, "(organic)", "organic", key, _undefined);
                        }
                    }
                }
            }
        };

        /**
         * 从MAP对象中，根据键获取值。
         * @param map {Objecct} MAP字典对象。
         * @param key {String} 键。
         * @param _default {String} 默认值。
         * @return {String} 返回的值。
         */
        oThis.getValue = function(map, key, _default){
            var value = Pick(map, key + _equal_, _amp_),
                result = "-";
            return result = !IsEmpty(value) ? Decode(value) : !IsEmpty(_default) ? _default : "-";
        };

        /**
         * 判断一个来源地址是否是一个被忽略的搜索引擎流量来源。
         * @param source {String} 来源地址。
         * @return {Boolean} 是否是一个被忽略的搜索引擎流量来源。
         */
        oThis.isIgnoredOrganic = function(source){
            var ignoredOrganic = _config.ignoredOrganic,
                result = _false;
            if(source && "organic" == source.medium){
                source = Decode(source.term)[_toLowerCase]();
                for(var i = 0; i < ignoredOrganic[_length]; i++){
                    result = result || ignoredOrganic[i][_toLowerCase]() == source;
                }
            }
            return result;
        };

        /**
         * 获取推荐网址来源对象。
         * @return {String} 推荐网址来源对象。
         */
        oThis.getReferralSource = function(){
            var processedSource = "",
                content = "";
                processedSource = oThis.processedSource;
            if(!(IsEmpty(processedSource) || "0" == processedSource || !Contains(processedSource, "://") || oThis.isGoogleCustomSearch(processedSource))){
                processedSource = processedSource[_split]("://")[1];
                if(Contains(processedSource, "/")){
                    content = processedSource[_substring](processedSource[_str_indexOf]("/"));
                    content = content[_split]("?")[0];
                    processedSource = processedSource[_split]("/")[0][_toLowerCase]()
                }
                if(0 == processedSource[_str_indexOf]("www.")){
                    processedSource = processedSource[_substring](4);
                }
                return new SourceTracker.Source(_undefined, processedSource, _undefined, "(referral)", "referral", _undefined, content)
            }
        };

        /**
         * 解析带有锚点信息的URL地址。
         * @param url {String} 带有锚点信息的URL地址。
         * @return {String} 解析后的URL地址。
         */
        oThis.parseHasAnchorUrl = function(url){
            var result = "";
            if(_config.allowAnchor){
                result = url && url.hash ? url[_href][_substring](url[_href][_str_indexOf]("#")) : "";
                result = "" != result ? result + _amp_ : result;
            }
            result += url.search;
            return result;
        };

        /**
         * 获取直接访问来源对象。
         * @return {String} 直接访问来源对象。
         */
        oThis.getDirectSource = function(){
            return new SourceTracker.Source(_undefined, "(direct)", _undefined, "(direct)", "(none)", _undefined, _undefined)
        };

        /**
         * 检查是否是忽略的推荐网址。
         * @param source {String} 来源网址。
         * @return {Boolean} 检查结果。
         */
        oThis.isIgnoredReferral = function(source){
            var result = _false,
                ignoredReferral = _config.ignoredReferral;
            if(source && "referral" == source.medium){
                source = Encode(source.source)[_toLowerCase]();
                for(var i = 0; i < ignoredReferral[_length]; i++){
                    result = result || Contains(source, ignoredReferral[i][_toLowerCase]());
                }
            }
            return result;
        };

        /**
         * 检查来源地址对象信息是否完整。
         * @param source {SourceTracker.Source} 来源地址对象。
         * @return {Boolean} 检查结果。
         */
        oThis.check = function(source){
            return _undefined != source && source.checkSelfIntegrity();
        };

        /**
         * 检查参数_utmz。
         */
        oThis.checkUTMZ = function(cookie){
            var _utmz = Pick(cookie, _param_utmz + oThis.domainHash + ".", ";");
            var arrUTMZ = _utmz[_split](".");
            var _b_source = new SourceTracker.Source;
            _b_source.initialize(arrUTMZ.slice(4)[_join]("."));
            if(!oThis.check(_b_source)){
                return _true;
            }
            var url = $Global[_str_document][_location];
            url = oThis.parseHasAnchorUrl(url);
            var _a_source = oThis.createOrganicSource(url);
            if(!oThis.check(_a_source)){
                _a_source = oThis.getOrganicSource();
                oThis.check(_a_source) || (_a_source = oThis.getReferralSource())
            }
            return oThis.check(_a_source) && _b_source.serialize()[_toLowerCase]() != _a_source.serialize()[_toLowerCase]();
        };

        oThis.dc = function(gaCookie, c){
            if(_config.campaignTrack){
                var url = "",
                    _utmz = "-",
                    _source,
                    q = 0,
                    b,
                    cookie,
                    _domainHash = oThis.domainHash;
                if(gaCookie){
                    cookie = gaCookie.getCookie();
                    url = oThis.parseHasAnchorUrl($Global[_str_document][_location]);
                    if(_config.allowLinker && gaCookie.checkParamsHash()){
                        _utmz = gaCookie.getUTMZ();
                        if(!IsEmpty(_utmz) && !Contains(_utmz, ";")){
                            gaCookie.setUTMZCookie();
                            return
                        }
                    }
                    _utmz = Pick(cookie, _param_utmz + _domainHash + ".", ";");
                    _source = oThis.createOrganicSource(url);
                    if(oThis.check(_source)){
                        url = Pick(url, _config.nooverride + _equal_, _amp_);
                        if("1" == url && !IsEmpty(_utmz)){
                            return;
                        }
                    }
                    if(!oThis.check(_source)){
                        _source= oThis.getOrganicSource();
                        url = oThis.isIgnoredOrganic(_source);
                        if(!IsEmpty(_utmz) && url){
                            return;
                        }
                        if(url){
                            _source = oThis.getDirectSource()
                        }
                    }
                    if(!oThis.check(_source) && c){
                        _source = oThis.getReferralSource();
                        url = oThis.isIgnoredReferral(_source);
                        if(!IsEmpty(_utmz) && url){
                            return;
                        }
                        if(url){
                            _source = oThis.getDirectSource()
                        }
                    }
                    if(!oThis.check(_source)){
                        if(IsEmpty(_utmz) && c){
                            _source = oThis.getDirectSource();
                        }
                    }
                    if(oThis.check(_source)){
                        if(!IsEmpty(_utmz)){
                            q = _utmz[_split](".");
                            b = new SourceTracker.Source;
                            b.initialize(q.slice(4)[_join]("."));
                            b = b.serialize()[_toLowerCase]() == _source.serialize()[_toLowerCase]();
                            q = q[3] * 1
                        }
                        if(!b || c){
                            cookie = Pick(cookie, _param_utma + _domainHash + ".", ";");
                            b = cookie.lastIndexOf(".");
                            cookie = b > 9 ? cookie[_substring](b + 1) * 1 : 0;
                            q++;
                            cookie = 0 == cookie ? 1 : cookie;
                            gaCookie.setUTMZ([_domainHash, oThis.timestamp, cookie, q, _source.serialize()][_join]("."));
                            gaCookie.setUTMZCookie()
                        }
                    }
                }
            }
        }
    };

    /**
     * 来源跟踪中的网址来源对象。
     * @param id {String}
     * @param source {String} 广告系列来源键，用于通过相应网址获取广告系列来源。在“广告系列”报告中，“来源”显示为一个细分选项。
     * @param clid {String}
     * @param campaign {String}
     * @param medium {String} 广告系列媒介键，用于通过广告系列网址获取其媒介。在“广告系列”报告中，该媒介显示为一个细分选项。
     * @param term {String} 广告系列字词，用于通过相应网址获取广告系列关键字。
     * @param content {String} 广告系列的广告内容,用于通过广告系列的网址获取其内容 (description)。
     */
    SourceTracker.Source = function(id, source, clid, campaign, medium, term, content){
        var oThis = this;
        oThis.id = id;
        oThis.source = source;
        oThis.clid = clid;
        oThis.campaign = campaign;
        oThis.medium = medium;
        oThis.term = term;
        oThis.content = content;
        oThis.serialize = function(){
            var source = [],
                map = [["cid", oThis.id], ["csr", oThis.source], ["gclid", oThis.clid], ["ccn", oThis.campaign], ["cmd", oThis.medium], ["ctr", oThis.term], ["cct", oThis.content]],
                i,
                value;
            if(oThis.checkSelfIntegrity()){
                for(i = 0; i < map[_length]; i++){
                    if(!IsEmpty(map[i][1])){
                        value = map[i][1][_split]("+")[_join]("%20");
                        value = value[_split](" ")[_join]("%20");
                        Push(source, "utm" + map[i][0] + _equal_ + value);
                    }
                }
            }
            return $Global.processSource(source[_join]("|"))
        };

        /**
         * 检查自身属性数据信息的完整性。
         * @return {Boolean} 检查结果。
         */
        oThis.checkSelfIntegrity = function(){
            return !(IsEmpty(oThis.id) && IsEmpty(oThis.source) && IsEmpty(oThis.clid));
        };

        /**
         * 根据MAP字典初始化对象的属性。
         * @param map {Object} MAP字典。
         */
        oThis.initialize = function(map){
            var _get = function(key){
                return Decode(Pick(map, "utm" + key + _equal_, "|"));
            };
            oThis.id = _get("cid");
            oThis.source = _get("csr");
            oThis.clid = _get("gclid");
            oThis.campaign= _get("ccn");
            oThis.medium = _get("cmd");
            oThis.term = _get("ctr");
            oThis.content = _get("cct");
        }
    };
        /**
         * 自定义用户属性对象。
         * @param config {Config} 配置信息。
         * @param domainHash {String} 域名哈希值。
         * @param gaCookie {GaCookie}  Google Analytics（分析）的Cookie操作工具类。
         * @param cache {Cache} 自定义用户属性的缓存对象。
         */
    var CustomVariable = function(config, domainHash, gaCookie, cache){
        var oThis = this,
            _domainHash = domainHash,
            _equal = _equal_,
            _config = config,
            _cache = cache;
        oThis.gaCookie = gaCookie;
        oThis.variable = "";
        oThis.customVariables = {};

        /**
         * 初始化自定义用户属性对象。
         */
        oThis.initialize = function(){
            var _variables;
            _variables = Pick(oThis.gaCookie.getCookie(), _param_utmv + _domainHash + ".", ";")[_split](_domainHash + ".")[1];
            if(!IsEmpty(_variables)){
                _variables = _variables[_split]("|");
                var _customVariables = oThis.customVariables,
                    _var_1 = _variables[1],
                    _variable;
                if(!IsEmpty(_var_1)){
                    _var_1 = _var_1[_split](",");
                    for(var i = 0; i < _var_1[_length]; i++){
                        _variable = _var_1[i];
                        if(!IsEmpty(_variable)){
                            _variable = _variable[_split](_equal);
                            if(_variable[_length] == 4){
                                //[name, value, scope]，scope：自定义变量所使用的范围。可能的值包括 1（访问者级）、2（会话级）和 3（网页级）。
                                _customVariables[_variable[0]] = [_variable[1], _variable[2], 1];//第一种情况
                            }
                        }
                    }
                }
                oThis.variable = _variables[0];
                oThis.save();
            }
        };

        /**
         * 持久化（保存）自定义用户属性。
         */
        oThis.save = function(){
            oThis.clearCache();
            var _variable = oThis.variable,
                customVariable,
                d,
                q = "";
            for(customVariable in oThis.customVariables){
                if((d = oThis.customVariables[customVariable]) && 1 === d[2]){
                    q += customVariable + _equal + d[0] + _equal + d[1] + _equal + 1 + ",";//第一种情况
                    IsEmpty(q) || (_variable += "|" + q);
                }
            }
            if(IsEmpty(_variable)){
                oThis.gaCookie.deleteUTMVCookie();
            }else{
                oThis.gaCookie.setUTMV(_domainHash + "." + _variable);
                oThis.gaCookie.setUTMVCookie();
            }
        };

        /**
         * 设置自定义用户属性。
         * @param variable {String} 自定义用户属性。
         */
        oThis.setVar = function(variable){
            oThis.variable = variable;
            oThis.save();
        };

        /**
         * 采用提供的名称、值以及变量范围设置自定义变量。
         * name 和 value 的字符数加起来不能超过 64 字节。
         * @param index {Int} 必填。 自定义变量所用的位置。可能的值有 1-5（包括 1 和 5）。
         * @param name {String} 必填。 自定义变量的名称。
         * @param value {String} 必填。 自定义变量的值。
         * @param scope {Int} 可选。自定义变量所使用的范围。可能的值包括 1（访问者级）、2（会话级）和 3（网页级）。
         * @return {Boolean} 如果自定义变量已经设置成功，此方法返回 true，否则返回 false（例如，如果名称/值字符串长度超过 64 字节，或者使用了不正确的位置）。
         */
        oThis.setCustomVar = function(index, name, value, scope){
            if(1 != scope && 2 != scope && 3 != scope){
                scope = 3;
            }
            var result = _false;
            if(name && value && index > 0 && index <= _config.maxCustomVariables){
                name = Encode(name);
                value = Encode(value);
                if(name[_length] + value[_length] <= 64){
                    oThis.customVariables[index] = [name, value, scope];
                    oThis.save();
                    result = _true;
                }
            }
            return result;
        };

        /**
         * 返回分配给指定索引的访问者级自定义变量。
         * @param index {Int} 访问者级自定义变量的索引。
         * @return {String} 访问者级自定义变量的值。如果无法获取指定索引的变量，则返回未定义。
         */
        oThis.getVisitorCustomVar = function(index){
            var customVariable;
            if((customVariable = oThis.customVariables[index]) && 1 === customVariable[2]){
                return customVariable[1];
            }
        };

        /**
         * 此方法删除指定给所提供索引的变量（如果存在的话）。
         * 例如，您可能设置了访问者级别的自定义变量，后来又决定不再使用此访问者级别的变量。
         * @param index {Int} 要删除的自定义变量索引。
         */
        oThis.deleteCustomVar = function(index){
            var _customVariables = oThis.customVariables;
            if(_customVariables[index]){
                delete _customVariables[index];
                oThis.save()
            }
        };

        /**
         * 清理自定义用户属性的缓存。
         */
        oThis.clearCache = function(){
            _cache.clearKey(8);
            _cache.clearKey(9);
            _cache.clearKey(11);
            var _customVariables = oThis.customVariables,
                _customVariable,
                key;
            for(key in _customVariables){
                if(_customVariable = _customVariables[key]){
                    _cache.setKey(8, key, _customVariable[0]);
                    _cache.setKey(9, key, _customVariable[1]);
                    (_customVariable = _customVariable[2]) && 3 != _customVariable && _cache.setKey(11, key, "" + _customVariable);
                }
            }
        }
    };

        /**
         * 缓存对象。
         */
    var Cache = function(){

        /**
         * 设置缓存。
         * @param cache {String} 缓存主键。
         * @param key {String} 缓存键。
         * @param idx {Int} 索引。
         * @param vlaue {String} 设置的新值。
         */
        function _set(cache, key, idx, vlaue){
            if(_undefined == _Cache[cache]){
                _Cache[cache] = {};
            }
            if(_undefined == _Cache[cache][key]){
                _Cache[cache][key] = [];
            }
            _Cache[cache][key][idx] = vlaue;
        }

        /**
         * 设置缓存值。
         * @param cache {String} 缓存主键。
         * @param key {String} 缓存键。
         * @param idx {Int} 索引。
         * @return vlaue {String} 缓存的值。
         */
        function _get(cache, key, idx){
            if(_undefined != _Cache[cache] && _undefined != _Cache[cache][key]){
                return _Cache[cache][key][idx];
            }
        }

        /**
         * 清理缓存。
         * @param cache {String} 缓存主键。
         * @param key {String} 缓存键。
         */
        function _clear(cache, key){
            if(_undefined != _Cache[cache] && _undefined != _Cache[cache][key]){
                _Cache[cache][key] = _undefined;
                var y = _true,
                    i;
                for(i = 0; i < _map_key[_length]; i++){
                    if(_undefined != _Cache[cache][_map_key[i]]){
                        y = _false;
                        break;
                    }
                }
                if(y){
                    _Cache[cache] = _undefined;
                }
            }
        }

        /**
         * 序列化缓存对象。
         * @param o {Object} 要序列化的对象。
         * @return {String} 序列化后的字符串。
         */
        function _serialize(o){
            var serialization = "",
                y = _false,
                i,
                _key;
            for(i = 0; i < _map_key[_length]; i++){
                _key = o[_map_key[i]];
                if(_undefined != _key){
                    if(y)serialization += _map_key[i];
                    y = [];
                    var J = void 0, G = void 0;
                    for(G = 0; G < _key[_length]; G++){
                        if(_undefined != _key[G]){
                            J = "";
                            if(G != t && _undefined == _key[G - 1]){
                                J += G[_toString]() + _exclamation;
                            }
                            var R;
                            R = _key[G];
                            var ma = "", Y = void 0, da = void 0, Ga = void 0;
                            for(Y = 0; Y < R[_length]; Y++){
                                da = R[_charAt](Y);
                                Ga = _special_sign[da];
                                ma += _undefined != Ga ? Ga : da;
                            }
                            R = ma;
                            J += R;
                            Push(y, J);
                        }
                    }
                    _key = _left_parenthesis + y[_join](_asterisk) + _right_parenthesis;
                    serialization += _key;
                    y = _false;
                }else{
                    y = _true;
                }
            }
            return serialization;
        }
        var oThis = this,
            bind = CreateBinder(oThis),
            _Cache = {},
            _key = "k",
            _value = "v",
            _map_key = [_key, _value],
            _left_parenthesis = "(",
            _right_parenthesis = ")",
            _asterisk = "*",
            _exclamation = "!",
            _quote = "'",
            _special_sign = {};
            _special_sign[_quote] = "'0";
            _special_sign[_right_parenthesis] = "'1";
            _special_sign[_asterisk] = "'2";
            _special_sign[_exclamation] = "'3";
        var t = 1;

        /**
         * 检查缓存是否存在。
         * @param cache {String} 缓存的主键。
         * @return {Boolean} 检查结果。
         */
        oThis.exist = function(cache){
            return _undefined != _Cache[cache];
        };

        /**
         * 序列化当前的缓存对象实例。
         * @return {String} 序列化后的字符串。
         */
        oThis.serialize = function(){
            var serialization = "",
                cache;
            for(cache in _Cache){
                if(_undefined != _Cache[cache]){
                    serialization += cache[_toString]() + _serialize(_Cache[cache]);
                }
            }
            return serialization;
        };

        /**
         * 序列化指定的缓存对象。
         * @param cache {String} 缓存的主键。
         * @return {String} 序列化后的字符串。
         */
        oThis.Serialize = function(cache){
            if(cache == _undefined){
                return oThis.serialize();
            }
            var serialization = cache.serialize(),
                key;
            for(key in _Cache){
                if(_undefined != _Cache[key] && !cache.exist(key)){
                    serialization += key[_toString]() + _serialize(_Cache[key]);
                }
            }
            return serialization;
        };

        /**
         * 设置缓存键。
         * @param cache {String} 缓存主键。
         * @param idx {Int} 索引。
         * @param key {String} 设置的新键。
         */
        oThis.setKey = bind("_setKey", 89, function(cache, idx, key){
            if(typeof key != "string"){
                return _false;
            }
            _set(cache, _key, idx, key);
            return _true;
        });

        /**
         * 设置缓存值。
         * @param cache {String} 缓存主键。
         * @param idx {Int} 索引。
         * @param vlaue {String} 设置的新值。
         */
        oThis.setValue = bind("_setValue", 90, function(cache, idx, value){
            if(typeof value != "number" && (_undefined == Number || !(value instanceof Number)) || _o_math.round(value) != value || value == NaN || value == Infinity){
                return _false;
            }
            _set(cache, _value, idx, value[_toString]());
            return _true;
        });

        /**
         * 获取指定缓存索引的键。
         * @param cache {String} 缓存主键。
         * @param idx {Int} 索引。
         * @return {String} 指定缓存索引的键。
         */
        oThis.getKey = bind("_getKey", 87, function(cache, idx){
            return _get(cache, _key, idx);
        });

        /**
         * 获取指定缓存索引的值。
         * @param cache {String} 缓存主键。
         * @param idx {Int} 索引。
         * @return {String} 指定缓存索引的值。
         */
        oThis.getValue = bind("_getValue", 88, function(cache, idx){
            return _get(cache, _value, idx);
        });

        /**
         * 清除指定缓存的键。
         * @param cache {String} 缓存主键。
         */
        oThis.clearKey = bind("_clearKey", 85, function(cache){
            _clear(cache, _key);
        });

        /**
         * 清除指定缓存的值。
         * @param cache {String} 缓存主键。
         */
        oThis.clearValue = bind("_clearValue", 86, function(cache){
            _clear(cache, _value);
        })
    };

        /**
         * 事件跟踪器对象。
         * @param category {String} 常规事件类别（例如“视频”）。为要跟踪的对象组指定的名称。
         * @param tracker {Tracker} 跟踪器对象。
         */
    var EventTracker = function(category, tracker){
        var oThis = this,
            bind = CreateBinder(oThis);
        oThis.tracker = tracker;
        oThis.category = category;

        /**
         * 构建事件跟踪调用并将其发送到 Google Analytics（分析）跟踪代码。
         * @param action {String} 操作（必填）。事件的操作（例如，“播放”）。与每个类别具有唯一对应关系的字符串，通常用于为网页对象定义用户互动的类型。
         * @param label {String} 标签（可选）。事件的可选描述符。为事件数据提供额外维度的可选字符串。
         * @param value {integer} 值（可选）。与事件关联的操作值。可以用来提供有关用户事件的数值数据的整数。
         * @return {Boolean} 事件是否成功发送。
         */
        oThis.trackEvent = bind("_trackEvent", 91, function(action, label, value){
                return tracker.trackEvent(oThis.category, action, label, value)
            })
    };

        /**
         * 时间跟踪器。
         * @param tracker {Tracker} 页面跟踪器。
         * @param gaAjax {GaAjax} Google Analytics（分析）请求工具。
         */
    var TimeTracker = function(tracker, gaAjax){
        var oThis = this,
            external = $Global[_str_window].external,
            webkitPerformance = $Global[_str_window].webkitPerformance,
            _trackTimeRate = 10;
        oThis.cache = new Cache;

        /**
         * 获取加载的时间。
         */
        oThis.getLoadTime = function(){
            var i,
                _timing = "timing",
                _onloadT = "onloadT";
            if(external && external[_onloadT] != _undefined && external.isValidLoadTime){
                i = external[_onloadT];
            }else if(webkitPerformance && webkitPerformance[_timing]){
                i = webkitPerformance[_timing].loadEventStart - webkitPerformance[_timing].navigationStart;
            }
            return i;
        };

        /**
         * 是否启用时间跟踪。
         */
        oThis.isTrackTime = function(){
            return tracker.isSample() && tracker.visitCode() % 100 < _trackTimeRate;
        };

        /**
         * 发送时间跟踪的请求。
         */
        oThis.send = function(){
            var param = "&utmt=event&utme=" + Encode(oThis.cache.serialize()) + tracker.getPageInfo();
            gaAjax.send(param, tracker.account, tracker.domainHash, _false, _true);
        };

        /**
         * 跟踪加载时间。
         */
        oThis.trackLoadTime = function(){
            var _loadTime = oThis.getLoadTime();
            if(_loadTime == _undefined){
                return _false;
            }
            if(_loadTime <= 0){
                return _true;
            }
            if(_loadTime > 2147483648){
                return _false;
            }
            var _cache = oThis.cache;
            _cache.clearKey(14);
            _cache.clearValue(14);
            _cache.setValue(14, 1, _loadTime) && oThis.send();
            external && external.isValidLoadTime != _undefined && external.setPageReadyTime();
            return _false;
        };

        /**
         * 跟踪页面加载时间。
         */
        oThis.trackPageLoadTime = function(){
            if(!oThis.isTrackTime()){
                return _false;
            }
            if($Global[_str_window].top != $Global[_str_window]){
                return _false;
            }
            oThis.trackLoadTime() && AddListener($Global[_str_window], "load", oThis.trackLoadTime, _false);
            return _true;
        }
    };

    var GASO = function(){};//GASO令牌

    /**
     * 从Cookie中获取一个GASO令牌。
     * @param gaCookie {GaCookie} Google Analytics（分析）的Cookie对象。
     * @return {String} GASO令牌字符串。
     */
    GASO.getGASO = function(gaCookie){
        var _gaso = "gaso=",
            result = "",
            url = $Global[_str_document][_location].hash;
        if(url && 1 == url[_str_indexOf](_gaso)){
            result = Pick(url, _gaso, _amp_);
        }else{
            result = (url = $Global[_str_window].name) && 0 <= url[_str_indexOf](_gaso) ? Pick(url, _gaso, _amp_) : Pick(gaCookie.getCookie(), _param_gaso, ";");
        }
        return result;
    };

    /**
     * 创建GASO令牌javascript请求。
     * @param gaso {String} GASO令牌字符串。
     * @param domain {String} google分析的二级域（如www）。
     */
    GASO.create = function(gaso, domain){
        var src = (domain || "www") + ".google.com";
        src = "https://" + src + "/analytics/reporting/overlay_js?gaso=" + gaso + _amp_ + Random();
        var id = "_gasojs",
        script = $Global[_str_document].createElement("script");
        script.type = "text/javascript";
        script.src = src;
        if(id){
            script.id = id;
        }
        ($Global[_str_document].getElementsByTagName("head")[0] || $Global[_str_document].getElementsByTagName("body")[0]).appendChild(script);
    };

    /**
     * 加载GASO令牌请求。
     * @param config {Config} 配置信息。
     * @param gaCookie {GaCookie} Google Analytics（分析）的Cookie对象。
     */
    GASO.load = function(config, gaCookie){
        if(!GASO.created){
            var _gaso = GASO.getGASO(gaCookie),
                arr_gaso = _gaso && _gaso.match(/^(?:\|([-0-9a-z.]{1,30})\|)?([-.\w]{10,1200})$/i);
            if(arr_gaso){
                gaCookie.setGASO(_gaso);
                gaCookie.setGASOCookie();
                _TrackerFactory._gasoDomain = config.domain;
                _TrackerFactory._gasoCPath = config.cookiePath;
                GASO.create(arr_gaso[2], arr_gaso[1]);
            }
            GASO.created = _true;
        }
    };
        /**
         * 跟踪器对象。
         * @param name {String} 跟踪器对象名称。
         * @param account {String} UA 编号，网络载体 ID。
         * @param namespace {String}
         */
    var Tracker = function(name, account, namespace){

        /**
         * 设置配置信息的当前域名。
         */
        function _getDomain(){
            if("auto" == config.domain){
                var domain = $Global[_str_document].domain;
                if("www." == domain[_substring](0, 4)){
                    domain = domain[_substring](4);
                }
                config.domain = domain;
            }
            config.domain = config.domain[_toLowerCase]();
        }

        /**
         * 检查是否非Google域名。
         * @return {Boolean} 检查结果。
         */
        function _notGoogleDomain(){
            _getDomain();
            var domain = config.domain,
                _isGoogle = domain[_str_indexOf]("www.google.") * domain[_str_indexOf](".google.") * domain[_str_indexOf]("google.");
            return _isGoogle || ("/" != config.cookiePath) || (domain[_str_indexOf]("google.org") > -1);
        }

        /**
         * 设置MAP字典的时间戳。
         * @param map {Object} MAP字典。
         * @param separator {String} 分隔符。
         * @param timestamp {Int} 时间戳。
         * @return {Object} 设置过时间戳的MAP字典。
         */
        function _setMapTimestamp(map, separator, timestamp){
            if(IsEmpty(map) || IsEmpty(separator) || IsEmpty(timestamp)){
                return"-";
            }
            map = Pick(map, _param_utma + oThis.domainHash + ".", separator);
            if(!IsEmpty(map)){
                map = map[_split](".");
                map[5] = "" + (map[5] ? map[5] * 1 + 1 : 1);
                map[3] = map[4];
                map[4] = timestamp;
                map = map[_join](".")
            }
            return map;
        }

        /**
         * 检查是否是忽略的地址。
         * @return {Boolean} 检查结果。
         */
        function _isIgnoreUrl(){
            return ("file:" != $Global[_str_document][_location][_protocol]) && _notGoogleDomain();
        }

        var oThis = this,
            bind = CreateBinder(oThis),
            gaAjax = _undefined,
            config = new Config,
            d = _false,
            customVariable = _undefined;
        oThis.name = name;
        oThis.timestamp = _o_math.round((new Date)[_getTime]()/1E3);

        /**
         * UA 编号，网络载体 ID。
         */
        oThis.account = account || "UA-XXXXX-YY";//XXXXX：帐户编号；YY：帐户内的配置文件编号。
        oThis.referrer = $Global[_str_document].referrer;
        oThis.processedSource = _undefined;
        oThis.transactions = _undefined;
        oThis.A = _false;
        oThis.client = _undefined;
        oThis.cache = _undefined;
        oThis.eventCache = _undefined;
        oThis.pageLoadTimeTracker = _undefined;
        oThis.domainHash = _undefined;
        oThis.gaCookie = _undefined;
        config.namespace = namespace ? Encode(namespace) : _undefined;

        /**
         * 生成访问者ID。
         * @return {String} 访问者ID。
         */
        oThis.getVisitorId = function(){
            /*
             * 2,147,483,647（二十一亿四千七百四十八万三千六百四十七）是2147483646与2147483648之间的自然数，
             * 也是欧拉在1772年所发现的一个梅森素数，它等于2^31 -1，是32位操作系统中最大的符号型整型常量。
             */
            return Random() ^ oThis.client.hashClientInfo() & 2147483647;
        };

        /**
         * 获取域名哈希值。
         * @return {String} 域名哈希值。
         */
        oThis.getDomainHash = function(){
            if(!config.domain || "" == config.domain || "none" == config.domain){
                config.domain = "";
                return 1;
            }
            _getDomain();
            return config.allowHash ? Hash(config.domain) : 1;
        };

        /**
         * 处理referrer网址。
         * @param referrer {String} referrer网址。
         * @param domain {String} 域名。
         * @return {String} 处理过的referrer网址。
         */
        oThis.processReferrer = function(referrer, domain){
            if(IsEmpty(referrer)){
                referrer = "-";
            }else{
                domain += (config.cookiePath && "/" != config.cookiePath) ? config.cookiePath : "";
                var n = referrer[_str_indexOf](domain);
                referrer = (n >= 0 && n <= 8) ? "0" : (("[" == referrer[_charAt](0)) && ("]" == referrer[_charAt](referrer[_length] - 1))) ? "-" : referrer;
            }
            return referrer;
        };

        /**
         * 获取用户访问页面的信息。
         * @param path {String} 页面的路径。
         * @return {String} 用户访问页面信息的参数串。
         */
        oThis.getPageInfo = function(path){
            var param = "";
            param += config.clientInfo ? oThis.client.getClientInfo() : "";
            param += (config.detectTitle && !IsEmpty($Global[_str_document].title)) ? "&utmdt=" + Encode($Global[_str_document].title) : "";
            var hid;
            hid = _undefined;
            if($Global[_str_window] && $Global[_str_window][_gaGlobal] && $Global[_str_window][_gaGlobal].hid){
                hid = $Global[_str_window][_gaGlobal].hid;
            }else{
                hid = Random();
                $Global[_str_window].gaGlobal = $Global[_str_window][_gaGlobal] ? $Global[_str_window][_gaGlobal] : {};
                $Global[_str_window][_gaGlobal].hid = hid;
            }
            param += "&utmhid=" + hid + "&utmr=" + Encode(_o_string(oThis.processedSource)) + "&utmp=" + Encode(oThis.processPath(path));
            return param;
        };

        /**
         * 处理页面路径。
         * @param path {String} 页面路径。
         * @return {String} 处理过的页面路径。
         */
        oThis.processPath = function(path){
            var location = $Global[_str_document][_location];
            path && Register(13);
            return path = ((undefined != path) && ("" != path)) ? Encode(path, _true) : Encode(location.pathname + location.search, _true);
        };

        /**
         * 发送跟踪请求。
         * @param path {String} 页面路径。
         */
        oThis.send = function(path){
            if(oThis.isSample()){
                var param = "";
                if(oThis.cache != _undefined && oThis.cache.serialize()[_length] > 0){
                    param += "&utme=" + Encode(oThis.cache.serialize());
                }
                param += oThis.getPageInfo(path);
                gaAjax.send(param, oThis.account, oThis.domainHash);
            }
        };

        /**
         * 从Cookie中获取参数列表。
         */
        oThis.getParams = function(){
            var _gaCookie = new GaCookie(config);
            return _gaCookie.setDomainHashByCookie(oThis.domainHash) ? _gaCookie.getParams() : _undefined;
        };

        /**
         * 此方法与 _setDomainName() 和 _setAllowLinker() 方法一起使用可以跨域跟踪用户，特别是 iFrame 和在新窗口中打开的链接。
         * 此方法通过将初始链接附加到网址参数，从初始链接返回一个包含所有 Cookie 数据的字符串。
         * 然后，可以将该字符串再传递到另一网站或 iFrame。
         * @param targetUrl {String} 将 Cookie 值发送到的目标网站的网址。
         * @param useHash {String} 设置为 True 可使用 # 定位标签分隔符而不是默认的 ? 查询字符串分隔符传递跟踪代码变量。
         * @return {String} 链接器网址。
         */
        oThis.getLinkerUrl = bind("_getLinkerUrl", 52, function(targetUrl, useHash){
            var n = targetUrl[_split]("#"),
                _targetUrl = targetUrl,
                params = oThis.getParams();
            if(params){
                if(useHash && (1 >= n[_length])){
                    _targetUrl += "#" + params;
                }
            }else if(!useHash || (1 >= n[_length])){
                if(1 >= n[_length]){
                    _targetUrl += (Contains(targetUrl, "?") ? _amp_ : "?") + params;
                }else{
                    _targetUrl = n[0] + (Contains(targetUrl, "?") ? _amp_ : "?") + params + "#" + n[1];
                }
            }
            return _targetUrl;
        });

        /**
         */
        oThis.rc = function(){
            var timestamp = oThis.timestamp,
                _gaCookie = oThis.gaCookie,
                cookie = _gaCookie.getCookie(),
                domainHash = oThis.domainHash + "",
                gaGlobal = $Global[_str_window] ? $Global[_str_window][_gaGlobal] : _undefined,
                _anchor,
                _has_utma = Contains(cookie, _param_utma + domainHash + "."),
                _has_utmb = Contains(cookie, _param_utmb + domainHash),
                _has_utmc = Contains(cookie, _param_utmc + domainHash),
                _utma,
                _utmb = [],
                param = "",
                ma = _false;
                cookie = IsEmpty(cookie) ? "" : cookie;
            if(config.allowLinker){
                _anchor = ($Global[_str_document][_location] && $Global[_str_document][_location].hash) ? $Global[_str_document][_location][_href][_substring]($Global[_str_document][_location][_href][_str_indexOf]("#")) : "";
                if(config.allowAnchor && !IsEmpty(_anchor)){
                    param = _anchor + _amp_;
                }
                param += $Global[_str_document][_location].search;
                if(!IsEmpty(param) && Contains(param, _param_utma)){
                    _gaCookie.setUTMKHashByLocation(param);
                    _gaCookie.cb() || _gaCookie.initialize();
                    _utma = _gaCookie.getUTMA();
                }
                var _getUTMX = _gaCookie.getUTMX;
                var _setUTMX = _gaCookie.setUTMX;
                var _setUTMXCookie = _gaCookie.setUTMXCookie;
                if(!IsEmpty(_getUTMX())){
                    _setUTMX(Decode(_getUTMX()));
                    Contains(_getUTMX(), ";") || _setUTMXCookie();
                }
                var _getUTMV = _gaCookie.getUTMV;
                var _setUTMV = _gaCookie.setUTMV;
                var _setUTMVCookie = _gaCookie.setUTMVCookie;
                if(!IsEmpty(_getUTMV())){
                    _setUTMV(_getUTMV());
                    Contains(_getUTMV(), ";") || _setUTMVCookie();
                }
            }
            if(IsEmpty(_utma)){
                if(_has_utma){
                    if(_utma = (!_has_utmb || !_has_utmc)){
                        _utma = _setMapTimestamp(cookie, ";", _o_string(timestamp));
                        oThis.A = _true;
                    }else{
                        _utma = Pick(cookie, _param_utma + domainHash + ".", ";");
                        _utmb = Pick(cookie, _param_utmb + domainHash, ";")[_split](".");
                    }
                }else{
                    _utma = [domainHash, oThis.getVisitorId(), timestamp, timestamp, timestamp, 1][_join](".");
                    ma = oThis.A = _true;
                }
            }else if(IsEmpty(_gaCookie.getUTMB()) || IsEmpty(_gaCookie.getUTMC())){
                _utma = _setMapTimestamp(param, _amp_, _o_string(timestamp));
                oThis.A = _true;
            }else{
                _utmb = _gaCookie.getUTMB()[_split](".");
                domainHash = _utmb[0];
            }
            _utma = _utma[_split](".");
            if($Global[_str_window] && gaGlobal && gaGlobal.dh == domainHash && !config.namespace){
                _utma[4] = gaGlobal.sid ? gaGlobal.sid : _utma[4];
                if(ma){
                    _utma[3] = gaGlobal.sid ? gaGlobal.sid : _utma[4];
                    if(gaGlobal.vid){
                        timestamp = gaGlobal.vid[_split](".");
                        _utma[1] = timestamp[0];
                        _utma[2] = timestamp[1];
                    }
                }
            }
            _gaCookie.setUTMA(_utma[_join]("."));
            _utmb[0] = domainHash;
            _utmb[1] = _utmb[1] ? _utmb[1] : 0;
            _utmb[2] = _undefined != _utmb[2] ? _utmb[2] : config.Sc;
            _utmb[3] = _utmb[3] ? _utmb[3] : _utma[4];
            _gaCookie.setUTMB(_utmb[_join]("."));
            _gaCookie.setUTMC(domainHash);
            IsEmpty(_gaCookie.getUTMParamsHash())|| _gaCookie.setUTMParamsHash(_gaCookie.hashUTMParams());
            _gaCookie.setUTMACookie();
            _gaCookie.setUTMBCookie();
            _gaCookie.setUTMCCookie()
        };

        /**
         * 设置Google分析请求对象。
         */
        oThis.setGaAjax = function(){
            gaAjax = new GaAjax(config);
        };
        
        /**
         * 返回在创建跟踪器时为其指定的名称。
         * @return {String} 跟踪器的名称。
         */
        oThis.getName = bind("_getName", 58, function(){
                return oThis.name;
            });

        /**
         * 初始化或重新初始化 Google Analytics（分析）跟踪代码 (GATC) 对象。
         */
        oThis.initData = bind("_initData", 2, function(){
                var sourceTracker;
                if(!d){
                    if(!oThis.client){
                        oThis.client = new Client(config.detectFlash);
                    }
                    oThis.domainHash = oThis.getDomainHash();
                    oThis.gaCookie = new GaCookie(config);
                    oThis.cache = new Cache;
                    customVariable = new CustomVariable(config, _o_string(oThis.domainHash), oThis.gaCookie, oThis.cache);
                    oThis.setGaAjax();
                }
                if(_isIgnoreUrl()){
                    if(!d){
                        oThis.processedSource = oThis.processReferrer(oThis.referrer, $Global[_str_document].domain);
                        sourceTracker = new SourceTracker(_o_string(oThis.domainHash), oThis.processedSource, oThis.timestamp, config);
                    }
                    oThis.rc(sourceTracker);
                    customVariable.initialize();
                }
                if(!d){
                    _isIgnoreUrl() && sourceTracker.dc(oThis.gaCookie, oThis.A);
                    oThis.eventCache = new Cache;
                    GASO.load(config, oThis.gaCookie);
                    d = _true;
                }
            });

        /**
         * 获取访问者编码。
         * @return {String} 访问者编码。
         */
        oThis.visitCode = bind("_visitCode", 54, function(){
                oThis.initData();
                var _utma = Pick(oThis.gaCookie.getCookie(), _param_utma + oThis.domainHash + ".", ";");
                _utma = _utma[_split](".");
                return _utma[_length] < 4 ? "" : _utma[1];
            });

        /**
         * 将所有 GATC Cookie 的路径更改为新指定的路径。使用此功能可以从一个目录结构到同一域中的另一目录结构跟踪用户的行为。
         * 在被调用时，此函数会立即将所有 Cookie 复制到新的 Cookie 路径。
         * 因此，如果 _trackPageview() 方法未被调用，系统将会提供所有现有 Google Analytics（分析）Cookie 的值。
         * 因此，我们建议此方法的调用应晚于 _trackPageview() 及其他可能会影响您希望一并传递的 Cookie 值或广告系列值的配置方法，
         * 例如 _setCampaignCookieTimeout() 或 _setReferrerOverride()。
         * @param newPath {String} 用于存储 GATC Cookie 的新路径。
         */
        oThis.cookiePathCopy = bind("_cookiePathCopy", 30, function(newPath){
                oThis.initData();
                oThis.gaCookie && oThis.gaCookie.copyCookiePath(oThis.domainHash, newPath);
            });

        /**
         * 检查是否是抽样的样本。
         * @return {Boolean} 检查结果。
         */
        oThis.isSample = function(){
            return oThis.visitCode() % 1E4 < config.sampleRate * 100;
        };

        /**
         * Google Analytics（分析）跟踪代码 (GATC) 的主逻辑。
         * 如果启用了链接器功能，它会尝试从网址中提取 Cookie 值。
         * 否则，它会尽量从 document.cookie 中提取 Cookie 值。
         * 它还会根据需要更新或创建 Cookie，然后将它们回写到文档对象，并收集所有相应的指标发送到 UCFE（Urchin Collector Front-end，Urchin 收集器前端）。
         * @param pageURL {String} 指示要跟踪哪些网页网址的指标的可选参数。使用此选项时，请使用起始斜杠 (/) 指示网页的网址。
         */
        oThis.trackPageview = bind("_trackPageview", 1, function(pageURL){
            if(_isIgnoreUrl()){
                oThis.initData();
                oThis.Uc();
                oThis.send(pageURL);
                oThis.A = _false
            }
        });

        /**
         */
        oThis.Uc = function(){
            var win = $Global[_str_window];
            if(Random() % 1E3 === 42){
                try{
                    if(win.external && win.external.onloadT != _undefined || win.webkitPerformance && win.webkitPerformance.timing){
                        Register(12);
                    }
                }catch(ex){}
            }
        };

        /**
         * 将交易和物品数据一起发送到 Google Analytics（分析）服务器。
         * 此方法应在 _trackPageview() 之后调用，并与 _addItem() 和 addTrans() 方法一起使用。
         * 此方法应在物品和交易元素设置好之后调用。
         */
        oThis.trackTrans = bind("_trackTrans", 18, function(){
                var domainHash = oThis.domainHash,
                    params = [],
                    i,
                    tran,
                    j;
                oThis.initData();
                if(oThis.transactions && oThis.isSample()){
                    for(i = 0; i < oThis.transactions.transactions[_length]; i++){
                        tran = oThis.transactions.transactions[i];
                        Push(params, tran.serialize());
                        for(j = 0; j < tran.items[_length]; j++){
                            Push(params, tran.items[j].serialize());
                        }
                    }
                    for(i= 0; i < params[_length]; i++){
                        gaAjax.send(params[i], oThis.account, domainHash, _true);
                    }
                }
            });

        /**
         * 设置电子商务的交易信息。
         */
        oThis.setTrans = bind("_setTrans", 20, function(){
                var oTrans,
                    items,
                    i,
                    j,
                    transactions;
                oTrans = $Global[_str_document].getElementById ? $Global[_str_document].getElementById("utmtrans") : $Global[_str_document].utmform && $Global[_str_document].utmform.utmtrans ? $Global[_str_document].utmform.utmtrans : _undefined;
                oThis.initData();
                if(oTrans && oTrans.value){
                    oThis.transactions = new GaEComm;
                    transactions = oTrans.value[_split]("UTM:");
                    config.transactionDelim = !config.transactionDelim || "" == config.transactionDelim ? "|" : config.transactionDelim;
                    for(i = 0; i < transactions[_length]; i++){
                        transactions[i] = Trim(transactions[i]);
                        items = transactions[i][_split](config.transactionDelim);
                        for(j = 0; j < items[_length]; j++){
                            items[j] = Trim(items[j]);
                        }
                        if("T" == items[0]){
                            oThis.addTrans(items[1], items[2], items[3], items[4], items[5], items[6], items[7], items[8]);
                        }else{
                            "I" == items[0] && oThis.addItem(items[1], items[2], items[3], items[4], items[5], items[6]);
                        }
                    }
                }
            });

        /**
         * 使用特定的值创建交易对象。与 _addItem() 一样，此方法仅处理交易跟踪，不提供其他电子商务功能。
         * 因此，如果相关交易与相应会话中的现有交易重复，则旧交易值将会被新交易值覆盖。
         * 此方法的参数按位置进行匹配，因此请务必提供所有参数，即使其中某些参数的值为空也应如此。
         * @param orderId {String} 必填。此交易的内部唯一订单 ID 号。
         * @param affiliation {String} 可选。合作伙伴或联营店铺（如果空缺则表示未定义）。
         * @param total {String} 必填。交易的总金额。
         * @param tax {String} 可选。交易的税额。
         * @param shipping {String} 可选。交易的运费。
         * @param city {String} 可选。与交易相关的城市。
         * @param state {String} 可选。与交易相关的省/直辖市/自治区。
         * @param country {String} 可选。与交易相关的国家/地区。
         * @return {_gat.GA_EComm_.Transactions_} 所创建或修改的交易对象。
         */
        oThis.addTrans = bind("_addTrans", 21, function(orderId, affiliation, total, tax, shipping, city, state, country){
                oThis.transactions = oThis.transactions ? oThis.transactions : new GaEComm;
                return oThis.transactions.addTrans(orderId, affiliation, total, tax, shipping, city, state, country);
            });

        /**
         * 使用此方法可以跟踪访问者在您的电子商务网站上购买的物品。
         * 此方法根据各种物品的 SKU 来对其进行跟踪。也就是说，sku 参数为必填。
         * 然后，此方法会通过 orderId 参数将相应物品与父交易对象关联在一起。
         * @param orderId {String} 可选。与物品相关联的交易的订单 ID。
         * @param sku {String} 必填。物品的 SKU 代码。
         * @param name {String} 可选。产品名称。要在产品明细报告中看到数据，必须提供此参数。
         * @param category {String} 可选。产品类别。
         * @param price {String} 必填。产品价格。
         * @param quantity {String} 必填。购买数量。
         */
        oThis.addItem = bind("_addItem", 19, function(orderId, sku, name, category, price, quantity){
                var item;
                oThis.transactions = oThis.transactions ? oThis.transactions : new GaEComm;
                (item = oThis.transactions.addItem(orderId)) || (item = oThis.addTrans(orderId, "", "", "", "", "", "", ""));
                item.addItem(sku, name, category, price, quantity);
            });

        /**
         * 该方法已停用。请改用 _setCustomVar()。
         * 采用提供的字符串设置或定义自定义访问者细分。
         * 您可以使用此值对您网站的用户提供额外的细分。
         * 例如，您可以使用登录页或表单，根据访问者选择的偏好设置或隐私权选项等输入内容触发某值，然后在该访问者的 Cookie 中更新此变量。
         * 在您的网站上实施此变量，并通过此方法收集数据时，新定义的细分会出现在 Google Analytics（分析）报告“访问者”部分的“用户指定”报告中。
         * 此外，您可以访问“内容详情”报告中的“用户指定的值”细分，看看网页的访问者中有多少百分比是属于您定义的特定细分。
         * @param newVal {String} 要设置的新用户指定的值。
         */
        oThis.setVar = bind("_setVar", 22, function(newVal ){
                if(newVal  && "" != newVal  && _notGoogleDomain()){
                    oThis.initData();
                    customVariable.setVar(Encode(newVal ));
                    oThis.isSample() && gaAjax.send("&utmt=var", oThis.account, oThis.domainHash);
                }
            });

        /**
         * 采用提供的名称、值以及变量范围设置自定义变量。
         * name 和 value 的字符数加起来不能超过 64 字节。
         * @param index {Int} 必填。 自定义变量所用的位置。可能的值有 1-5（包括 1 和 5）。
         * @param name {String} 必填。 自定义变量的名称。
         * @param value {String} 必填。 自定义变量的值。
         * @param scope {Int} 可选。自定义变量所使用的范围。可能的值包括 1（访问者级）、2（会话级）和 3（网页级）。
         * @return {Boolean} 如果自定义变量已经设置成功，此方法返回 true，否则返回 false（例如，如果名称/值字符串长度超过 64 字节，或者使用了不正确的位置）。
         */
        oThis.setCustomVar = bind("_setCustomVar", 10, function(index, name, value, scope){
                oThis.initData();
                return customVariable.setCustomVar(index, name, value, scope);
            });
        
        /**
         * 此方法删除指定给所提供索引的变量（如果存在的话）。
         * 例如，您可能设置了访问者级别的自定义变量，后来又决定不再使用此访问者级别的变量。
         * @param index {Int} 要删除的自定义变量索引。
         */
        oThis.deleteCustomVar = bind("_deleteCustomVar", 35, function(index){
                oThis.initData();
                customVariable.deleteCustomVar(index);
            });

        /**
         * 返回分配给指定索引的访问者级自定义变量。
         * @param index {Int} 访问者级自定义变量的索引。
         * @return {String} 访问者级自定义变量的值。如果无法获取指定索引的变量，则返回未定义。
         */
        oThis.getVisitorCustomVar = bind("_getVisitorCustomVar", 50, function(index){
                oThis.initData();
                return customVariable.getVisitorCustomVar(index);
            });

        /**
         * 设置最多能接受的自定义变量数目。
         */
        oThis.setMaxCustomVariables = bind("_setMaxCustomVariables", 71, function(maxCustomVariables){
                config.maxCustomVariables = maxCustomVariables;
            });

        /**
         * 此方法与 _setDomainName() 和 _setAllowLinker() 方法一起使用可以启用跨域用户跟踪。
         * _link() 方法通过网址参数 (HTTP GET) 将 Cookie 从此网站传递到另一网站。
         * 它还更改 document.location 并将用户重定向到新网址。
         * @param targetUrl {String} 将 Cookie 值发送到的目标网站的网址。
         * @param useHash {Boolean} 设置为 True 可使用 # 定位标签分隔符而不是默认的 ? 查询字符串分隔符传递跟踪代码变量。
         */
        oThis.link = bind("_link", 101, function(targetUrl, useHash){
                if(config.allowLinker && targetUrl){
                    oThis.initData();
                    $Global[_str_document][_location].href = oThis.getLinkerUrl(targetUrl, useHash);
                }
            });

        /**
         * 此方法与 _setDomainName() 和 _setAllowLinker() 方法一起使用可以启用跨域用户跟踪。
         * _linkByPost() 方法通过将一个字符串附加到引荐表单的操作值 (HTTP POST)，从而将 Cookie 从引荐表单传递到字符串中包含的另一网站。
         * 在从一个网站到第三方购物车网站跟踪用户行为时通常使用此方法，但也可用于将 Cookie 数据发送到弹出式窗口或 iFrame 中的其他域。
         * @param formObject {HTMLFormElement} 封装 POST 请求的表单对象。
         * @param useHash {String} 设置为 True 可使用 # 定位标签分隔符而不是默认的 ? 查询字符串分隔符传递跟踪代码变量。
         */
        oThis.linkByPost = bind("_linkByPost", 102, function(formObject, useHash){
                if(config.allowLinker && formObject && formObject.action){
                    oThis.initData();
                    formObject.action = oThis.getLinkerUrl(formObject.action, useHash)
                }
            });

        /**
         */
        oThis.setXKey = bind("_setXKey", 83, function(cache, idx, key){
                oThis.cache.setKey(cache, idx, key);
            });

        /**
         */
        oThis.setXValue = bind("_setXValue", 84, function(cache, idx, value){
                oThis.cache.setValue(cache, idx, value);
            });

        /**
         */
        oThis.getXKey = bind("_getXKey", 76, function(cache, idx){
                return oThis.cache.getKey(cache, idx);
            });

        /**
         */
        oThis.getXValue = bind("_getXValue", 77, function(cache, idx){
                return oThis.cache.getValue(cache, idx);
            });

        /**
         */
        oThis.clearXKey = bind("_clearXKey", 72, function(cache){
                oThis.cache.clearKey(cache);
            });

        /**
         */
        oThis.clearXValue= bind("_clearXValue", 73, function(cache){
                oThis.cache.clearValue(cache);
            });

        /**
         */
        oThis.createXObj = bind("_createXObj", 75, function(){
                oThis.initData();
                return new Cache;
            });

        /**
         */
        oThis.sendXEvent = bind("_sendXEvent", 78, function(cache){
                var param = "";
                oThis.initData();
                if(oThis.isSample()){
                    param += "&utmt=event&utme=" + Encode(oThis.cache.Serialize(cache)) + oThis.getPageInfo();
                    gaAjax.send(param, oThis.account, oThis.domainHash, _false, _true);
                }
            });

        /**
         * 创建事件跟踪器对象实例。
         * @param category {String} 常规事件类别（例如“视频”）。为要跟踪的对象组指定的名称。
         * @return {Tracker} 跟踪器对象。
         */
        oThis.createEventTracker = bind("_createEventTracker", 74, function(category){
                oThis.initData();
                return new EventTracker(category, oThis);
            });

        /**
         * 构建事件跟踪调用并将其发送到 Google Analytics（分析）跟踪代码。
         * 使用此代码可以跟踪您网站上与网页访问不相关的访问者行为，例如，与 Flash 视频电影控件的交互或者任何没有触发页面请求的用户事件。
         * 以同时忽略 label 和 value 或者忽略其中之一。如果提供不带 label 的 value，则需要传递未定义可选标签的值。
         * @param category {String} 类别（必填）。常规事件类别（例如“视频”）。为要跟踪的对象组指定的名称。
         * @param action {String} 操作（必填）。事件的操作（例如，“播放”）。与每个类别具有唯一对应关系的字符串，通常用于为网页对象定义用户互动的类型。
         * @param label {String} 标签（可选）。事件的可选描述符。为事件数据提供额外维度的可选字符串。
         * @param value {integer} 值（可选）。与事件关联的操作值。可以用来提供有关用户事件的数值数据的整数。
         * @return {Boolean} 事件是否成功发送。
         */
        oThis.trackEvent = bind("_trackEvent", 4, function(category, action, label, value){
                oThis.initData();
                var _eventCache = oThis.eventCache;
                if(_undefined != category && _undefined != action && "" != category && "" != action){
                    _eventCache.clearKey(5);
                    _eventCache.clearValue(5);
                    (category = _eventCache.setKey(5, 1, category) && _eventCache.setKey(5, 2, action) && (_undefined == label || _eventCache.setKey(5, 3, label)) && (_undefined == value || _eventCache.setValue(5, 1, value))) && oThis.sendXEvent(_eventCache);
                }else{
                    category = _false;
                }
                return category;
            });

        /**
         * 跟踪页面加载时间。
         * @return {Int} 页面加载的时间。
         */
        oThis.trackPageLoadTime = bind("_trackPageLoadTime", 100, function(){
                oThis.initData();
                if(!oThis.pageLoadTimeTracker){
                    oThis.pageLoadTimeTracker = new TimeTracker(oThis, gaAjax);
                }
                return oThis.pageLoadTimeTracker.trackPageLoadTime();
            });

        /**
         * 获取配置信息对象。
         */
        oThis.getConfig = function(){
            return config;
        };

        /**
         * 为 Cookie 设置域名。此方法有三种模式：("auto" | "none" | [[]domain])。
         * 默认情况下，此方法设置为 auto，尝试基于 DOM 中的 location 对象解析域名。
         * 如果希望在同一配置文件中跨子域跟踪访问者行为，请将此方法明确设置为您的域名。
         * @param newDomainName {String} 要设置的新的默认域名。
         */
        oThis.setDomainName = bind("_setDomainName", 6, function(newDomainName){
                config.domain = newDomainName;
            });

        /**
         * 添加要作为潜在搜索引擎流量来源包含的搜索引擎。
         * 默认情况下，Google Analytics（分析）可识别一些常用的搜索引擎，但您也可以向列表中添加其他搜索引擎来源。
         * @param newOrganicEngine {String} 要作为常规来源的新搜索引擎。
         * @param newOrganicKeyword {String} 新常规来源的关键字名称。
         * @param prepend {Boolean} 如果为 true，则将新搜索引擎添加到常规来源列表的开头。如果为 false，则将新搜索引擎添加到列表的末尾。默认情况下，此参数值设置为 false。
         */
        oThis.addOrganic = bind("_addOrganic", 14, function(newOrganicEngine, newOrganicKeyword, prepend){
                config.organic.splice(prepend ? 0 : config.organic[_length], 0, new Organic(newOrganicEngine, newOrganicKeyword));
            });

        /**
         * 清除设置为常规来源的所有搜索引擎。当希望定义一种自定义的搜索引擎排序优先级时，可以使用此方法。
         */
        oThis.clearOrganic = bind("_clearOrganic", 70, function(){
                config.organic = [];
            });

        /**
         * 将字符串设置为关键字报告的忽略字词。
         * 使用此方法可以配置 Google Analytics（分析）将某些搜索字词按直接流量处理（例如，当用户将您的域名作为搜索字词输入时）。
         * 使用此方法设置关键字后，在您的综合页面浏览次数统计中仍会包含这些搜索字词，但在关键字报告中不会包含这些搜索字词。
         * @param newIgnoredOrganicKeyword {String} 要按直接流量处理的关键字搜索字词。
         */
        oThis.addIgnoredOrganic = bind("_addIgnoredOrganic", 15, function(newIgnoredOrganicKeyword){
                Push(config.ignoredOrganic , newIgnoredOrganicKeyword);
            });

        /**
         * 清除以前设置的要从关键字报告中排除的所有字符串。
         */
        oThis.clearIgnoredOrganic = bind("_clearIgnoredOrganic", 97, function(){
                config.ignoredOrganic  = [];
            });

        /**
         * 将某个来源排除在引荐网站之外。
         * 当希望将某些引荐链接设置为直接流量而不是设置为引荐网站时，可以使用此选项。
         * 例如，您的公司可能拥有另外一个域，您希望将其作为直接流量进行跟踪，不在“引荐网站”报告中显示该域。
         * 来自排除的引荐来源的请求仍会计入您的综合页面浏览次数统计中。
         * @param newIgnoredReferrer {String} 要排除的引荐网站。
         */
        oThis.addIgnoredRef = bind("_addIgnoredRef", 31, function(newIgnoredReferrer){
                Push(config.ignoredReferral, newIgnoredReferrer);
            });

        /**
         * 清除以前设置的要从引荐网站报告中排除的所有项。
         */
        oThis.clearIgnoredRef = bind("_clearIgnoredRef", 32, function(){
                config.ignoredReferral = [];
            });

        /**
         * 设置“允许域哈希”标记。默认情况下，此值设置为 true。
         * Google Analytics（分析）中的域哈希功能可以从您的域中创建一个哈希值，并使用此数值来检查访问者的 Cookie 完整性。
         * 如果您有多个子域（如 example1.example.com 和 example2.example.com），并希望跨这些子域跟踪用户行为，则应关闭域哈希，
         * 以便 Cookie 完整性检查不会拒绝将用户 Cookie 从一个域发送到另一个域。此外，您可以关闭此功能来优化按网页跟踪的跟踪效果。
         * @param allowHash {Boolean} 默认值是 true。如果将此参数设置为 true，则启用域哈希。否则，将停用域哈希。
         */
        oThis.setAllowHash = bind("_setAllowHash", 8, function(allowHash){
                config.allowHash = allowHash ? 1 : 0;
            });

        /**
         * 设置广告系列跟踪标记。
         * 默认情况下，对于标准 Google Analytics（分析）设置，广告系列跟踪设为 true。
         * 如果您希望停用广告系列跟踪以及为此而设置的相关 Cookie，您可以使用此方法。
         * @param campaignTrack {Boolean} 默认情况下为 True，即启用广告系列跟踪。如果设为 false，广告系列跟踪将被停用。
         */
        oThis.setCampaignTrack = bind("_setCampaignTrack", 36, function(campaignTrack){
                config.campaignTrack = campaignTrack ? 1 : 0;
            });

        /**
         * 设置浏览器跟踪模块。
         * 默认情况下，Google Analytics（分析）会跟踪您访问者的浏览器信息，并提供有关您通过简单 HTTP 请求获取的访问者浏览器设置的详细数据。
         * 如果需要，您可以通过将该参数设置为 False 关闭此跟踪。
         * 如果您关闭了此跟踪，系统将不会跟踪任何浏览器数据，今后也无法恢复这些数据，因此请小心使用此功能。
         * @param clientInfo {Boolean} 默认值为 true，表示浏览器跟踪已启用。如果设置为 false，将停用浏览器跟踪。
         */
        oThis.setClientInfo = bind("_setClientInfo", 66, function(clientInfo){
                config.clientInfo = clientInfo ? 1 : 0;
            });

        /**
         * 获取指示是否已启用浏览器跟踪模块的标记。请参阅 _setClientInfo() 以了解详情。
         * @return {Boolean} 如果已启用客户端信息跟踪，则返回 Boolean True。
         */
        oThis.getClientInfo = bind("_getClientInfo", 53, function(){
                return config.clientInfo;
            });

        /**
         * 为您的网站设置新的 Cookie 路径。默认情况下，Google Analytics（分析）将 Cookie 路径设置为根级路径 (/)。
         * 在大多数情况下，此选项均合适，并可以与您在网站、博客或企业网络目录中安装的跟踪代码一起正常使用。
         * 不过，在用户访问权限仅限于域的子目录的少数情况下，通过将子目录设置为所有跟踪的默认路径，使用此方法可以解决跟踪问题。
         * 通常，如果您的数据没有被跟踪并且您订阅了博客服务且只能访问所定义的子目录，或者您位于企业网络或校园网络中且只能访问您的主目录，
         * 则需要使用此方法。在这些情况下，建议的做法是使用末尾斜杠定义子目录。
         * @param newCookiePath {String} 要设置的新的 Cookie 路径。
         */
        oThis.setCookiePath = bind("_setCookiePath", 9, function(cookiePath){
                config.cookiePath = cookiePath;
            });

        /**
         * 设置记录电子商务交易的分隔符。
         */
        oThis.setTransactionDelim = bind("_setTransactionDelim", 82, function(transactionDelim){
                config.transactionDelim = transactionDelim;
            });

        /**
         * 该方法已停用。请改用 _setCampaignCookieTimeout(cookieTimeoutMillis)。
         * 设置广告系列跟踪 Cookie 有效期（以秒为单位）。
         * 默认情况下，广告系列跟踪的有效期为 6 个月。
         * 通过这一设置，您可以确定在 6 个月的周期内您网站的访问者是否通过特定的广告系列完成了转化。
         * 不过，您的业务可能具有与此不同的广告系列时间安排，因此，您可以使用此方法来相应地调整广告系列跟踪。
         * @param newDefaultTimeout {String} 要设置的新默认 Cookie 有效期。以字符串的形式传递，其值将会转换为整数。
         */
        oThis.setCookieTimeout = bind("_setCookieTimeout", 25, function(newDefaultTimeout){
                oThis.setCampaignCookieTimeout(newDefaultTimeout * 1E3);
            });

        /**
         * 设置广告系列跟踪 Cookie 有效期（以毫秒为单位）。
         * 默认情况下，广告系列跟踪的有效期为 6 个月。
         * 通过这一设置，您可以确定在 6 个月的周期内您网站的访问者是否通过特定的广告系列完成了转化。
         * 不过，您的业务可能具有与此不同的广告系列时间安排，因此，您可以使用此方法来相应地调整广告系列跟踪。
         * 您可以将过期超时值更改为 0，以表明在浏览器关闭时此 Cookie 即应被删除。
         * @param cookieTimeoutMillis {Number} 新 Cookie 有效期（以毫秒为单位），也可设置为 0 以在浏览器关闭时删除相应 Cookie。
         */
        oThis.setCampaignCookieTimeout = bind("_setCampaignCookieTimeout", 29, function(cookieTimeoutMillis){
                config.campaignCookieTimeout = cookieTimeoutMillis;
            });

        /**
         * 设置 Flash 检测标记。
         * 默认情况下，Google Analytics（分析）会跟踪您的访问者的 Flash 播放器信息，并提供有关您的访问者的 Flash 播放器设置的详细数据。
         * 如果需要，您可以通过将该参数设置为 False 关闭此跟踪。
         * 如果您关闭了此跟踪，系统将不会跟踪任何 Flash 播放器数据，今后也无法恢复这些数据，因此请小心使用此功能。
         * @param enable {Boolean} 默认值为 true，表示 Flash 检测已启用。如果设置为 false 将停用 Flash 检测。
         */
        oThis.setDetectFlash = bind("_setDetectFlash", 61, function(enable){
                config.detectFlash = enable ? 1 : 0;
            });

        /**
         * 获取 Flash 检测标记。请参阅 _setDetectFlash() 以了解详情。
         * @return {Boolean} 如果已启用 Flash 检测，则返回 Boolean True。
         */
        oThis.getDetectFlash = bind("_getDetectFlash", 65, function(){
                return config.detectFlash;
            });

        /**
         * 设置标题检测标记。
         * 默认情况下，访问者的网页标题检测处于打开状态。
         * 此信息显示在“按标题排列的内容”下的“内容”部分中。
         * 如果需要，您可以通过将该参数设置为 False 关闭此跟踪。
         * 如果您的网站没有已定义的网页标题且“按标题排列的内容”报告已将所有内容分组到“（未设置）”列表中，那么您可以关闭此跟踪。
         * 如果您的所有网页的标题都很长，那么您也可以关闭此跟踪。
         * 如果您关闭了此跟踪，那么您网站中定义的任何网页标题均不会显示在“按标题排列的内容”报告中。
         * 一旦停用跟踪，今后也将无法恢复这些信息。
         * @param enable {Boolean} 默认值为 True，表示标题检测已启用。如果设置为 False，将停用标题检测。
         */
        oThis.setDetectTitle = bind("_setDetectTitle", 62, function(enable){
                config.detectTitle = enable ? 1 : 0;
            });

        /**
         * 获取标题检测标记。
         * @return {Boolean} 如果已启用标题检测，则返回 Boolean True。
         */
        oThis.getDetectTitle = bind("_getDetectTitle", 56, function(){
                return config.detectTitle;
            });

        /**
         * 设置 Urchin GIF 文件的本地路径。
         * 如果您的本地服务器上正在运行 Urchin 跟踪软件，请使用此方法。
         * _setLocalServerMode() 和 _setLocalRemoteServerMode() 方法使用您在此处指定的路径来确定本地服务器本身的路径。
         * @param newLocalGifPath {String} 本地服务器上 GIF 文件的路径。
         */
        oThis.setLocalGifPath = bind("_setLocalGifPath", 46, function(localGifPath){
                config.localGifPath = localGifPath;
            });

        /**
         * 获取 Urchin GIF 文件的本地路径。请参阅 _setLocalGifPath() 以了解详情。
         * @return {String} 本地服务器上 GIF 文件的路径。
         */
        oThis.getLocalGifPath = bind("_getLocalGifPath", 57, function(){
                return config.localGifPath;
            });

        /**
         * 调用此方法可将您的跟踪数据仅发送到本地服务器。
         * 如果您的本地服务器上正在运行 Urchin 跟踪软件并希望将所有跟踪数据都发送到您的服务器，则应使用此方法。
         * 在此情况下，本地服务器的路径由 _setLocalGifPath() 设置。
         */
        oThis.setLocalServerMode = bind("_setLocalServerMode", 92, function(){
                config.localServerMode = 0;
            });

        /**
         * 使用默认设置安装的 Google Analytics（分析）会将跟踪数据发送到 Google Analytics（分析）服务器。
         * 如果已经为您的网站安装了 Urchin 软件并希望仅将特定的跟踪数据发送到 Google Analytics（分析）服务器，则应使用此方法。
         */
        oThis.setRemoteServerMode = bind("_setRemoteServerMode", 63, function(){
                config.localServerMode = 1;
            });

        /**
         * 调用此方法可将跟踪数据发送到本地服务器和 Google Analytics（分析）后端服务器。
         * 如果您的本地服务器上正在运行 Urchin 跟踪软件并希望通过 Google Analytics（分析）服务器本地跟踪数据，则应使用此方法。
         * 在此情况下，本地服务器的路径由 _setLocalGifPath() 设置。
         */
        oThis.setLocalRemoteServerMode = bind("_setLocalRemoteServerMode", 47, function(){
                config.localServerMode = 2;
            });

        /**
         * 返回服务器操作模式。
         * 可能返回的值有：
         * 0 代表本地模式（将数据发送到 _setLocalGifPath() 设置的本地服务器）；
         * 1 代表远程模式（将数据发送到 Google Analytics（分析）后端服务器）；
         * 2 代表本地和远程模式。
         * @return {Number} 服务器操作模式。
         */
        oThis.getServiceMode = bind("_getServiceMode", 59, function(){
                return config.localServerMode;
            });

        /**
         * 设置新的采样率。
         * 如果您网站的规模特别大，容易遇到流量高峰，则设置采样率可确保报告跟踪不中断。
         * 因为在采样初始化过程中，可以设置为照常在样本中包含或排除唯一身份访问者，所以 Google Analytics（分析）中的采样对唯一身份访问者也可保持一致：即使启用了采样，趋势分析和报告功能也能保证准确性。
         * @param newRate {String} 要设置的新采样率。提供数字字符串作为整数百分比数字。
         */
        oThis.setSampleRate = bind("_setSampleRate", 45, function(newRate){
                config.sampleRate = newRate;
            });
        
        /**
         * 该方法已停用。请改用 _setSessionCookieTimeout(cookieTimeoutMillis)。
         * 设置新的以秒计的会话超时。
         * 默认情况下，会话超时设为 30 分钟（1800 秒）。
         * 会话超时被用于计算访问次数：如果某用户的浏览器处于非活动状态的时间超过 30 分钟，或者退出了浏览器，那么访问将结束。
         * 如果希望根据自己的特殊需要改变对“会话”的定义，您可以传递定义新值所需的秒数。
         * 这将影响计算访问次数的每个版块报告的访问次数以及使用访问次数对其他值的计算结果。
         * 例如，如果您缩短会话超时，访问次数会增加；如果增加会话超时，访问次数会减少。
         * @param newTimeout {String} 要设置的新会话超时值（以秒为单位）。
         */
        oThis.setSessionTimeout = bind("_setSessionTimeout", 27, function(newTimeout){
                oThis.setSessionCookieTimeout(newTimeout * 1E3);
            });
        
        /**
         * 设置新的以毫秒计的会话 Cookie 超时。默认情况下，会话超时设为 30 分钟。
         * 会话超时被用于计算访问次数：如果某用户的浏览器处于非活动状态的时间超过 30 分钟，或者退出了浏览器，那么访问将结束。
         * 如果希望根据自己的特殊需要改变对“会话”的定义，您可以传递定义新值所需的毫秒数。
         * 这将影响计算访问次数的每个版块报告的访问次数以及使用访问次数对其他值的计算结果。
         * 例如，如果您缩短会话超时，访问次数会增加；如果增加会话超时，访问次数会减少。
         * 您可以将过期超时值更改为 0，以表明在浏览器关闭时此 Cookie 即应被删除。
         * @param cookieTimeoutMillis {Number} 新会话超时值（以毫秒为单位），也可设置为 0 以在浏览器关闭时删除相应 Cookie。
         */
        oThis.setSessionCookieTimeout= bind("_setSessionCookieTimeout", 26, function(cookieTimeoutMillis){
                config.sessionCookieTimeout = cookieTimeoutMillis;
            });

        /**
         * 在启用跨域用户跟踪时设置链接器功能标记。
         * 默认情况下，此方法设置为 false 并停用链接。
         * 要启用跨域跟踪，另请参阅 _link()、_linkByPost() 和 _setDomainName() 方法。
         * 在目标网站上使用 _setAllowLinker 方法，以便目标网站在网址参数中使用 Cookie 数据而不是标准会话逻辑。
         * @param allowLinker {Boolean} 默认值是 false。如果将此参数设置为 true，则启用链接器。否则，将停用域链接。
         */
        oThis.setAllowLinker = bind("_setAllowLinker", 11, function(allowLinker){
                config.allowLinker = allowLinker ? 1 : 0;
            });
        
        /**
         * 此方法会设置井号 (#) 作为广告系列跟踪中的查询字符串分隔符。此选项默认设置为 false。
         * 传统广告系列跟踪网址使用问号 (?) 来指示构成查询的键/值对的开头。
         * 如果将此选项设置为 true，您的广告系列跟踪网址就可以使用井号 (#) 代替问号 (?) 来指示查询字符串的开头。
         * @param allowAnchor {Boolean} 如果将此参数设置为 true，则广告系列将使用定位符。否则，广告系列将使用搜索字符串。
         */
        oThis.setAllowAnchor = bind("_setAllowAnchor", 7, function(allowAnchor){
                config.allowAnchor = allowAnchor ? 1 : 0;
            });

        /**
         * 设置广告系列名称键。
         * 广告系列名称键用于通过广告系列网址获取广告系列的名称。您可以对要在其上跟踪点击类广告系列的任何网页使用此函数。
         * @param newCampNameKey {String} 广告系列名称键。
         */
        oThis.setCampNameKey = bind("_setCampNameKey", 41, function(newCampNameKey){
                config.campaign = newCampNameKey;
            });
        
        /**
         * 设置广告系列的广告内容键。
         * 广告系列内容键用于通过广告系列的网址获取其内容 (description)。您可以对在广告系列中定义的目标网页使用此函数。
         * @param newCampContentKey {String} 要设置的新广告系列内容键。
         */
        oThis.setCampContentKey = bind("_setCampContentKey", 38, function(newCampContentKey){
                config.content = newCampContentKey;
            });

        /**
         */
        oThis.setCampIdKey = bind("_setCampIdKey", 39, function(id){
                config.id = id;
            });

        /**
         * 设置广告系列媒介键，用于通过广告系列网址获取其媒介。在“广告系列”报告中，该媒介显示为一个细分选项。
         * @param newCampMedKey {String} 要设置的广告系列媒介键。
         */
        oThis.setCampMediumKey = bind("_setCampMediumKey", 40, function(newCampMedKey){
                config.medium = newCampMedKey;
            });

        /**
         * 设置广告系列的无覆盖键变量，用于通过相应网址获取其无覆盖值。
         * 默认情况下，此变量及其值不用设置。对于广告系列跟踪和转化统计，这意味着在默认情况下，相应转化次数在转化跟踪中将以广告的最后一次展示为准。
         * 如果您更希望以最早的一次展示为准来统计转化，则需要将此方法设为特定的键；而在使用自定义广告系列变量时，您可以使用此方法来为广告系列覆盖内容设置变量名称。
         * 无覆盖值可以防止广告系列数据被相应访问者可能会点击的其他定义相近的广告系列网址所覆盖。
         * @param newCampNOKey {String} 要设置的广告系列无覆盖键。
         */
        oThis.setCampNOKey = bind("_setCampNOKey", 42, function(newCampNOKey){
                config.nooverride = newCampNOKey;
            });

        /**
         * 设置广告系列来源键，用于通过相应网址获取广告系列来源。
         * 在“广告系列”报告中，“来源”显示为一个细分选项。
         * @param newCampSrcKey {String} 要设置的广告系列来源键。
         */
        oThis.setCampSourceKey = bind("_setCampSourceKey", 43, function(newCampSrcKey){
                config.source = newCampSrcKey;
            });

        /**
         * 设置广告系列字词键，用于通过相应网址获取广告系列关键字。
         * @param newCampTermKey {String} 要设置的字词键。
         */
        oThis.setCampTermKey = bind("_setCampTermKey", 44, function(newCampTermKey){
                config.term = newCampTermKey;
            });

        /**
         */
        oThis.setCampCIdKey = bind("_setCampCIdKey", 37, function(clid){
                config.clid = clid;
            });
        
        /**
         * 返回此跟踪器对象的 Google Analytics（分析）跟踪 ID。
         * 如果您要在多个帐户中跟踪您网站的网页，可以使用此方法来确定与特定的跟踪器对象关联的帐户。
         * @return {String} 此跟踪器对象实现了实例化的帐户 ID。
         */
        oThis.getAccount = bind("_getAccount", 64, function(){
                return oThis.account;
            });

        /**
         * 仅用于异步跟踪。
         * 设置跟踪对象的网络载体 ID。
         * 如果多次调用此方法，则为每次调用创建一个新的跟踪对象。
         * @param account {String} 跟踪器对象的完整网络载体ID（例如，UA-65432-1）。
         */
        oThis.setAccount = bind("_setAccount", 3, function(account){
                oThis.account = account;
            });

        /**
         */
        oThis.setNamespace = bind("_setNamespace", 48, function(namespace){
                config.namespace = namespace ? Encode(namespace) : _undefined;
            });

        /**
         * 返回 Google Analytics（分析）跟踪代码 (GATC) 版本号。
         * @return {String} Google Analytics（分析）跟踪代码 (GATC) 版本号。
         */
        oThis.getVersion = bind("_getVersion", 60, function(){
                return _version_;
            });

        /**
         */
        oThis.setAutoTrackOutbound = bind("_setAutoTrackOutbound", 79, emptyFunction);

        /**
         */
        oThis.setTrackOutboundSubdomains = bind("_setTrackOutboundSubdomains", 81, emptyFunction);

        /**
         */
        oThis.setHrefExamineLimit = bind("_setHrefExamineLimit", 80, emptyFunction);

        /**
         * 设置用于确定广告系列跟踪值的引荐来源网址。
         * 使用此方法可让 iFrame 中的窗口小部件正确跟踪引荐来源。
         * 默认情况下，广告系列跟踪使用 document.referrer 属性来确定引荐来源网址，该网址将被传入 GIF 请求的 utmr 参数中。
         * 不过，您可以使用自己的值覆盖此参数。
         * 例如，如果您将新的引荐来源网址设置为 http://www.google.com/search?hl=en&q=hats，
         * 则广告系列 Cookie 将会使用 source=google、medium=organic 和 keyword=hats 存储一个新广告系列。
         * @param newReferrerOverride {String} 相应文档引荐来源网址的新网址。
         */
        oThis.setReferrerOverride = bind("_setReferrerOverride", 49, function(newReferrerOverride){
                oThis.referrer = newReferrerOverride;
            });

        /**
         * 该方法已停用。请改用 _setVisitorCookieTimeout(cookieTimeoutMillis)。
         * 设置 Google Analytics（分析）访问者 Cookie 有效期（以毫秒为单位）。
         * 默认情况下，访问者 Cookie 设为在 2 年内有效。需要的话，您可以使用这种方法改变访问者 Cookie 的有效期。
         * @param milliseconds {Number} 新访问者 Cookie 有效期。
         */
        oThis.setCookiePersistence = bind("_setCookiePersistence", 24, function(milliseconds){
                oThis.setVisitorCookieTimeout(milliseconds);
            });
            
        /**
         * 设置 Google Analytics（分析）访问者 Cookie 有效期（以毫秒为单位）。
         * 默认情况下，访问者 Cookie 设为在 2 年内有效。
         * 需要的话，您可以使用这种方法改变访问者 Cookie 的有效期
         * 您可以将过期超时值更改为 0，以表明在浏览器关闭时此 Cookie 即应被删除。
         * @param cookieTimeoutMillis  {Number} 新访问者 Cookie 有效期（以毫秒为单位），也可设置为 0 以在浏览器关闭时删除相应 Cookie。
         */
        oThis.setVisitorCookieTimeout = bind("_setVisitorCookieTimeout", 8, function(cookieTimeoutMillis ){
                config.visitorCookieTimeout = cookieTimeoutMillis ;
            })
    };
        /**
         * 用于创建标准跟踪器对象的工厂。
         */
    var TrackerFactory = function(){
        var oThis = this,
            bind = CreateBinder(oThis);
        
        /**
         * 是否匿名化处理跟踪器对象发送的信息。
         */
        oThis.anonymizeIp = _false;
        oThis.Trackers = {};
        oThis.Counter = 0;
        oThis._gasoDomain = _undefined;
        oThis._gasoCPath = _undefined;

        /**
         * 该方法已停用。请改用 _gat._createTracker(opt_account, opt_name)。
         * 为指定的网络载体 ID 创建跟踪器对象。如果为同一 Google Analytic（分析）帐户 ID 多次调用此方法，则会为每次调用创建一个新对象。
         * @param account {String} 跟踪器对象的完整网络载体 ID（例如，UA-65432-1）。
         * @param namespace {String}
         * @return {Tracker} 已创建的跟踪对象。
         */
        oThis.getTracker = bind("_getTracker", 0, function(account, namespace){
                return oThis.createTracker(account, _undefined, namespace);
            });

        /**
         * 创建一个新跟踪器对象并为其分配指定名称。如果没有指定名称，则会生成一个名称。
         * 跟踪器对象会按照名称存储，因此可以通过 _getTrackerByName 获取。
         * 如果创建了两个同名跟踪器，则第二个将覆盖第一个，第一个跟踪器将不再能够通过 _getTrackerByName 获取。
         * @param account {String} 跟踪器对象的完整网络载体 ID（例如，UA-XXXXX-X）。
         * @param name {String} 用于储存跟踪器对象的可选名称。可以使用此名称通过 _getTrackerByName 获取跟踪器。
         * @param namespace {String}
         * @return {Tracker} 已创建的跟踪对象。
         */
        oThis.createTracker = bind("_createTracker", 55, function(account, name, namespace){
                name && Register(23);
                namespace && Register(67);
                if(name == _undefined){
                    name = "~" + _TrackerFactory.Counter++;
                }
                return _TrackerFactory.Trackers[name] = new Tracker(name, account, namespace);
            });
        /**
         * 使用指定名称获取跟踪器对象。
         * 如果未指定名称，则将使用默认的跟踪器名称，即空字符串 ('')。
         * 如果该指定名称与现有的跟踪器不重名，那么系统会创建一个新的跟踪器，为其分配该名称并将其返回。
         * @param name {String} 要获取的跟踪器的可选名称。默认为空字符串 ('')。
         * @return {Tracker} 已检索到的或已创建的跟踪对象。
         */
        oThis.getTrackerByName = bind("_getTrackerByName", 51, function(name){
                name = name || "";
                return _TrackerFactory.Trackers[name] || _TrackerFactory.createTracker(_undefined, name);
            });

        /**
         */
        oThis.getGaUserPrefs = function(){
                var gaUserPrefs = _o_window[_gaUserPrefs_];
                return gaUserPrefs && gaUserPrefs[_ioo_] && gaUserPrefs[_ioo_]();
            };
        
        /**
         * 告知 Google Analytics（分析）匿名化处理跟踪器对象发送的信息，即在存储前删除 IP 地址的最后一个八位位组。
         * 请注意，这会略微降低地理位置报告的准确性。
         * 在使用此函数匿名化处理跟踪时，必须使用 push 函数并以适当的方式关联此函数与跟踪器对象。
         */
        oThis.anonymizeIp = bind("_anonymizeIp", 16, function(){
                oThis.anonymizeIp = _true;
            })
    };

        /**
         * 用于创建异步跟踪器对象的工厂。
         */
    var AsyncTrackerFactory = function(){
        var oThis = this,
            bind = CreateBinder(oThis);

        /**
         * 该方法已停用。请改用 _gat._createTracker(opt_account, opt_name)。
         * 创建一个跟踪器对象，并为其指定独特的名称，以便在进行异步跟踪调用时按名称引用。
         * 如果未指定名称，则将采用空字符串 ''，该字符串在异步语法中代表默认跟踪器。
         * 如果已存在使用指定名称的异步跟踪器，则将被新的跟踪器覆盖。
         * 请注意：一般来说，只有在已被推送到 _gaq 中的函数内部使用时，此方法才安全。
         * 该方法仅应在少数情况下使用。
         * @param account {String} 跟踪器对象的完整网络载体 ID（如 UA-65432-1）。
         * @param name {String} 用于储存跟踪器对象的名称。使用此名称在今后的异步跟踪调用中引用跟踪器对象。
         * @return {Tracker} 已创建的跟踪对象。
         */
        oThis.createAsyncTracker = bind("_createAsyncTracker", 33, function(account, name){
                return _TrackerFactory.createTracker(account, name || "");
            });

        /**
         * 该方法已停用。请改用 _gat._getTrackerByName(opt_name)。
         * 返回此前采用指定名称创建的跟踪器对象。
         * 如果未指定名称，则将采用默认的跟踪器名称（空字符串 ''）。
         * 如果指定名称与现有跟踪器对象不重名，则系统将创建一个新的跟踪器、将其分配给该名称并返回该跟踪器。
         * 请注意：一般来说，只有在已被推送到 _gaq 中的函数内部使用时，此方法才安全。
         * 该方法仅应在少数情况下使用。
         * @param name {String} 要检索的跟踪器对象的名称。
         * @return {Tracker} 已检索到的或已创建的跟踪对象。
         */
        oThis.getAsyncTracker = bind("_getAsyncTracker", 34, function(name){
                return _TrackerFactory.getTrackerByName(name);
            });

        /**
         * 执行指定的 command array，它只是一个符合以下格式的 JavaScript 数组。
         * 该数组的第一个元素必须是作为字符串传递的跟踪器对象方法的名称。
         * 其余数组元素则是要作为不同参数传递给函数的相应值。
         * 此函数名为 push，其作用是在 Google Analytics（分析）完全载入之前使用数组来替代 _gaq。
         * 当 Google Analytics（分析）正在载入时，系统会向该数组中推送/排列相应的命令。
         * 当 Google Analytics（分析）完成载入后，系统会用 _gaq 对象来代替数组，并执行所有已列入队列的命令。
         * 对 _gaq.push 的后续调用会解析出此函数，由其在相应命令被推送过来时加以执行。
         * @param commandArray {Array} 要执行的命令。在同一次调用中可推送一项或多项此类内容。
         * @return {Number} 未能执行的命令的数量。
         */
        oThis.push = function(commandArray){
            Register(5);
            for(var _arguments = arguments, err = 0, i = 0; i < _arguments[_length]; i++){
                try{
                    if(typeof _arguments[i] === "function"){
                        _arguments[i]();
                    }else{
                        var name = "",
                            o = _arguments[i][0],
                            func = o,
                            idx = o.lastIndexOf(".");
                        if(idx > 0){
                            name = o[_substring](0, idx);
                            func = o[_substring](idx + 1);
                        }
                        var oTracker = (name == _gat_) ? _TrackerFactory : (name == _gaq_) ? _AsyncTrackerFactory : _TrackerFactory.getTrackerByName(name);
                        oTracker[func].apply(oTracker, _arguments[i].slice(1));
                    }
                }catch(ex){
                    err++;
                }
            }
            return err;
        }
    };

    var _TrackerFactory = new TrackerFactory;
    var singleton = _o_window[_gat_];
    if(singleton && typeof singleton._getTracker == "function"){
        _TrackerFactory = singleton;
    }else{
        _o_window[_gat_] = _TrackerFactory;
    }
    var _AsyncTrackerFactory = new AsyncTrackerFactory;
    _tracker_ : {
        var gaq = _o_window[_gaq_],
            isArray = _false;
        if(gaq && typeof gaq[_push] == "function"){
            isArray = IsArray(gaq);
            if(!isArray){
                break _tracker_;
            }
        }
        _o_window[_gaq_] = _AsyncTrackerFactory;
        isArray && _AsyncTrackerFactory[_push].apply(_AsyncTrackerFactory, gaq);
    }
})();