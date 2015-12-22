/**
 * 代码翻译：听歌
 * 电子邮件：505253293@163.com
 * 个人主页：https://github.com/TingGe
 * 代码地址：http://cdn.hegek7.com/atv.js?cid=123&nid=456
 * 文档地址：暂无
 *
 * @fileoverview AdbugTech 客户端 javascript代码
 */

! function() {

  /**
   * @param {Array} arr
   * @param {Element} data
   * @return {undefined}
   */
  function Trigger(arr, data) {
    /**
     * 发送 verify.js 请求
     * @param {Element} model
     * @return {?}
     */
    function send(model) {
      var value;
      /** @type {null} */
      var ret = null;
      try {
        value = model.createRequest();
        if (value) {
          if (!model.sendRequest(value)) {
            ret = messge("sendRequest failed.", value, model.getVersion(), model.getVersionParamName(), model.at_script);
          }
        } else {
          ret = messge("createRequest failed.", value, model.getVersion(), model.getVersionParamName(), model.at_script);
        }
      } catch (e) {
        ret = messge(e.name + ": " + e.message, value, model.getVersion(), model.getVersionParamName(), model ? model.at_script : null, e);
      }
      return ret;
    }
    /**
     * 组装错误信息
     * @param {string} query
     * @param {(Error|string)} xs
     * @param {?} arr
     * @param {?} event
     * @param {string} el
     * @param {?} e
     * @return {?}
     */
    function messge(query, xs, arr, event, el, e) {
      var context = {};
      return context[event] = arr, context.atp_jsErrMsg = encodeURIComponent(query), el && (el.parentElement && (el.parentElement.tagName && ("HEAD" == el.parentElement.tagName && (context.atp_isOnHead = "1")))), xs && (context.atp_jsErrUrl = xs), el && (context.cid = callback(el.src, "cid"), context.nid = callback(el.src, "nid")), e.stack && (context.atp_jsErrMsg = encodeURIComponent(e.stack)),
        context;
    }
    /**
     * 序列化
     * @param {Array} stack
     * @return {?}
     */
    function serialize(stack) {
      var o = window._at_win.at_config;
      /** @type {number} */
      var idx = 0;
      /** @type {boolean} */
      var i = false;
      if (o.handlerVersionSpecific) {
        /** @type {number} */
        var j = 0;
        for (; j < stack.length; j++) {
          if (stack[j].handler.getVersion() == o.handlerVersionSpecific) {
            /** @type {boolean} */
            i = true;
            /** @type {number} */
            idx = j;
            break;
          }
        }
      } else {
        if (o.handlerVersionByTimeIntervalMinutes) {
          var date = o.handlerVersionByTimeInputDate || new Date;
          var diff = date.getUTCHours();
          var firstNum = date.getUTCMinutes();
          /** @type {number} */
          idx = Math.floor((60 * diff + firstNum) / o.handlerVersionByTimeIntervalMinutes) % (stack.length + 1);
          if (idx != stack.length) {
            /** @type {boolean} */
            i = true;
          }
        } else {
          var hours = o.handlerVersionRandom || 100 * Math.random();
          /** @type {number} */
          j = 0;
          for (; j < stack.length; j++) {
            if (hours >= stack[j].minRate && hours < stack[j].maxRate) {
              /** @type {boolean} */
              i = true;
              /** @type {number} */
              idx = j;
              break;
            }
            return 1 == i && stack[idx].handler.isApplicable() ? stack[idx].handler : null;
          }
        }
      }
    }

    /**
     * Todo: ?
     * @return {?}
     */
    this.handle = function() {
      /** @type {Array} */
      var assigns = [];
      var q = serialize(arr);
      if (q) {
        var vvar = send(q);
        if (null === vvar) {
          return assigns;
        }
        q.onFailure();
        assigns.push(vvar);
      }
      var newState = send(data);
      return newState && (newState.atp_isLostImp = 1, assigns.push(newState)), assigns;
    };
  }

  /**
   * Todo: ?
   * @param {string} string
   * @param {string} id
   * @return {?}
   */
  function callback(string, id) {
    id = id.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    /** @type {string} */
    var regexS = "[\\?&]" + id + "=([^&#]*)";
    /** @type {RegExp} */
    var regex = new RegExp(regexS, "i");
    /** @type {(Array.<string>|null)} */
    var ast = regex.exec(string);
    return null == ast ? null : ast[1];
  }

  /**
   * @param {Array} a
   * @param {?} b
   * @return {?}
   */
  function objEquiv(a, b) {
    var i = a.length;
    for (; i--;) {
      if (a[i] === b) {
        return true;
      }
    }
    return false;
  }

  /**
   * @param {string} selector
   * @return {?}
   */
  function filter(selector) {
    try {
      /** @type {RegExp} */
      var rquickExpr = new RegExp("[\\?&](atp_[^&]*=[^&#]*)", "gi");
      /** @type {(Array.<string>|null)} */
      var elems = rquickExpr.exec(selector);
      /** @type {Array} */
      var ret = new Array;
      for (; null != elems;) {
        ret.push(elems[1]);
        /** @type {(Array.<string>|null)} */
        elems = rquickExpr.exec(selector);
      }
      return ret;
    } catch (r) {
      return [];
    }
  }

  /**
   * 生成cbust参数值
   * @return {?}
   */
  function generateCbust() {
    return ((new Date).getTime() + "" + Math.floor(1E6 * Math.random())).substr(0, 16);
  }

  /**
   * 发送beacon请求队列
   * @param {string} url
   * @param {Array} data
   * @return {undefined}
   */
  function emit(url, data) {
    /** @type {number} */
    var i = 0;
    for (; i < data.length; i++) {
      var type = data[i];
      var ret = getData(url, type);
      sendByImage(ret);
    }
  }

  /**
   * @param {string} params
   * @param {Object} object
   * @return {?}
   */
  function getData(params, object) {
    /** @type {string} */
    var pluginName = "";
    for (key in object) {
      if (object.hasOwnProperty(key)) {
        if (-1 == key.indexOf("atp_jsErrUrl")) {
          pluginName += "&" + key + "=" + object[key];
        } else {
          /** @type {Array} */
          var codeSegments = ["cid", "nid"];
          /** @type {number} */
          var i = 0;
          for (; i < codeSegments.length; i++) {
            var current = callback(object[key], codeSegments[i]);
            if (current) {
              pluginName += "&" + codeSegments[i] + "=" + current;
            }
          }
        }
      }
    }
    /** @type {string} */
    var data = window._at_win.location.protocol + "//" + params + pluginName;
    return data;
  }

  /**
   * 不带回调 Image 请求
   * @param {string} current
   */
  function sendByImage(url) {
    /** @type {string} */
    (new Image).src = url;
  }

  /**
   * @param {string} position
   * @return {undefined}
   */
  function writeScript(position) {
    document.write('<script type="text/javascript" src="' + position + '">\x3c/script>');
  }

  /**
   * Todo:?
   * @return {undefined}
   */
  function Atbs() {
    this.domUtilities = new function() {
      /**
       * @param {string} data
       * @param {Node} h
       * @param {?} callback
       * @return {undefined}
       */
      this.addImage = function(data, h, callback) {
        var node = h.ownerDocument.createElement("img");
        /** @type {number} */
        node.width = 0;
        /** @type {number} */
        node.height = 0;
        /** @type {string} */
        node.style.display = "none";
        node.src = generate(data);
        /** @type {function (): undefined} */
        node.onload = node.onerror = node.onreadystatechange = function() {
          if (/loaded|complete|undefined/.test(node.readyState)) {
            (function() {
              /** @type {null} */
              node.onload = node.onerror = node.onreadystatechange = null;
              node.parentNode.removeChild(node);
              node = void 0;
              if (callback) {
                callback();
              }
            })();
          }
        };
        h.insertBefore(node, h.firstChild);
      };
      /**
       * @param {string} data
       * @param {Node} element
       * @return {undefined}
       */
      this.addScriptResource = function(data, element) {
        var node = element.ownerDocument.createElement("script");
        /** @type {string} */
        node.type = "text/javascript";
        node.src = generate(data);
        element.insertBefore(node, element.firstChild);
      };
      /**
       * @param {string} xhtml
       * @param {Node} element
       * @return {undefined}
       */
      this.addScriptCode = function(xhtml, element) {
        var e = element.ownerDocument.createElement("script");
        /** @type {string} */
        e.type = "text/javascript";
        /** @type {string} */
        e.innerHTML = xhtml;
        element.insertBefore(e, element.firstChild);
      };
      /**
       * @param {string} html
       * @param {Element} parent
       * @return {undefined}
       */
      this.addHtml = function(html, parent) {
        var tempNode = callback.ownerDocument.createElement("div");
        /** @type {string} */
        tempNode.style = "display: inline";
        /** @type {string} */
        tempNode.innerHTML = html;
        parent.insertBefore(tempNode, parent.firstChild);
      };
      /**
       * @param {string} movieName
       * @return {?}
       */
      this.getObject = function(movieName) {
        return window.document[movieName] ? window.document[movieName] : -1 != navigator.appName.indexOf("Microsoft Internet") ? document.getElementById(movieName) : document.embeds && document.embeds[movieName] ? document.embeds[movieName] : void 0;
      };
    };
    this.settings = new function() {};
    this.Enums = {
      BrowserId: {
        Others: 0,
        IE: 1,
        Firefox: 2,
        Chrome: 3,
        Opera: 4,
        Safari: 5
      },
      TrafficScenario: {
        OnPage: 1,
        SameDomain: 2,
        CrossDomain: 128
      }
    };
    this.CommonData = {};
    /**
     * 添加 cbust 参数
     * @param {string} l
     * @return {?}
     */
    var generate = function(l) {
      return void 0 !== l && (null !== l && ("http" == l.match("^http") && (l += -1 !== l.indexOf("?") ? "&" == l.slice(-1) ? "cbust=" + generateCbust() : "&cbust=" + generateCbust() : "?cbust=" + generateCbust()))), l;
    };
  }

  /**
   * Todo:?
   * @return {undefined}
   */
  function Init() {
    /**
     * @param {Object} options
     * @return {undefined}
     */
    function configure(options) {
      /**
       * @param {?} data
       * @return {undefined}
       */
      window[options.callbackName] = function(data) {
        var throttledUpdate = window._at_win.at_config.bs_renderingMethod || function(part) {
          document.write(part);
        };
        switch (data.ResultID) {
          case 1:
            if (data.callback) {
              if (window[data.callback]) {
                window[data.callback]();
              }
            }
            throttledUpdate(options.tagPassback ? options.tagPassback : data.Passback ? decodeURIComponent(data.Passback) : decodeURIComponent("%3Cstyle%3E%0A.container%20%7B%0A%09border%3A%201px%20solid%20%233b599e%3B%0A%09overflow%3A%20hidden%3B%0A%09filter%3A%20progid%3ADXImageTransform.Microsoft.gradient(startColorstr%3D%27%23315d8c%27%2C%20endColorstr%3D%27%2384aace%27)%3B%0A%09%2F*%20for%20IE%20*%2F%0A%09background%3A%20-webkit-gradient(linear%2C%20left%20top%2C%20left%20bottom%2C%20from(%23315d8c)%2C%20to(%2384aace))%3B%0A%09%2F*%20for%20webkit%20browsers%20*%2F%0A%09background%3A%20-moz-linear-gradient(top%2C%20%23315d8c%2C%20%2384aace)%3B%0A%09%2F*%20for%20firefox%203.6%2B%20*%2F%0A%7D%0A.cloud%20%7B%0A%09color%3A%20%23fff%3B%0A%09position%3A%20relative%3B%0A%09font%3A%20100%25%22Times%20New%20Roman%22%2C%20Times%2C%20serif%3B%0A%09text-shadow%3A%200px%200px%2010px%20%23fff%3B%0A%09line-height%3A%200%3B%0A%7D%0A%3C%2Fstyle%3E%0A%3Cscript%20type%3D%22text%2Fjavascript%22%3E%0A%09function%0A%20%20%20%20cloud()%7B%0A%09%09var%20b1%20%3D%20%22%3Cdiv%20class%3D%5C%22cloud%5C%22%20style%3D%5C%22font-size%3A%22%3B%0A%09%09var%20b2%3D%22px%3B%20position%3A%20absolute%3B%20top%3A%20%22%3B%0A%09%09document.write(b1%20%2B%20%22300px%3B%20width%3A%20300px%3B%20height%3A%20300%22%20%2B%20b2%20%2B%20%2234px%3B%20left%3A%2028px%3B%5C%22%3E.%3C%5C%2Fdiv%3E%22)%3B%0A%09%09document.write(b1%20%2B%20%22300px%3B%20width%3A%20300px%3B%20height%3A%20300%22%20%2B%20b2%20%2B%20%2246px%3B%20left%3A%2010px%3B%5C%22%3E.%3C%5C%2Fdiv%3E%22)%3B%0A%09%09document.write(b1%20%2B%20%22300px%3B%20width%3A%20300px%3B%20height%3A%20300%22%20%2B%20b2%20%2B%20%2246px%3B%20left%3A50px%3B%5C%22%3E.%3C%5C%2Fdiv%3E%22)%3B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%09%09document.write(b1%20%2B%20%22400px%3B%20width%3A%20400px%3B%20height%3A%20400%22%20%2B%20b2%20%2B%20%2224px%3B%20left%3A20px%3B%5C%22%3E.%3C%5C%2Fdiv%3E%22)%3B%0A%20%20%20%20%7D%0A%20%20%20%20%0A%09function%20clouds()%7B%0A%20%20%20%20%20%20%20%20var%20top%20%3D%20%5B%27-80%27%2C%2780%27%2C%27240%27%2C%27400%27%5D%3B%0A%09%09var%20left%20%3D%20-10%3B%0A%20%20%20%20%20%20%20%20var%20a1%20%3D%20%22%3Cdiv%20style%3D%5C%22position%3A%20relative%3B%20top%3A%20%22%3B%0A%09%09var%20a2%20%3D%20%22px%3B%20left%3A%20%22%3B%0A%20%20%20%20%20%20%20%20var%20a3%3D%20%22px%3B%5C%22%3E%3Cscr%22%2B%22ipt%20type%3D%5C%22text%5C%2Fjavascr%22%2B%22ipt%5C%22%3Ecloud()%3B%3C%5C%2Fscr%22%2B%22ipt%3E%3C%5C%2Fdiv%3E%22%3B%0A%20%20%20%20%20%20%20%20for(i%3D0%3B%20i%20%3C%208%3B%20i%2B%2B)%20%7B%0A%09%09%09document.write(a1%2Btop%5B0%5D%2Ba2%2Bleft%2Ba3)%3B%0A%09%09%09document.write(a1%2Btop%5B1%5D%2Ba2%2Bleft%2Ba3)%3B%0A%09%09%09document.write(a1%2Btop%5B2%5D%2Ba2%2Bleft%2Ba3)%3B%0A%09%09%09document.write(a1%2Btop%5B3%5D%2Ba2%2Bleft%2Ba3)%3B%0A%09%09%09if(i%3D%3D4)%0A%09%09%09%7B%0A%09%09%09%09left%20%3D-%2090%3B%0A%09%09%09%09top%20%3D%20%5B%270%27%2C%27160%27%2C%27320%27%2C%27480%27%5D%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20else%20%0A%09%09%09%09left%20%2B%3D%20160%3B%0A%09%09%7D%0A%09%7D%0A%0A%3C%2Fscript%3E%0A%3Cdiv%20class%3D%22container%22%20style%3D%22width%3A%20100%25%3B%20height%3A%20100%25%3B%22%3E%0A%09%3Cscript%20type%3D%22text%2Fjavascript%22%3Eclouds()%3B%3C%2Fscript%3E%0A%3C%2Fdiv%3E"));
            break;
          case 2:
            ;
          case 3:
            if (options.tagAdtag) {
              throttledUpdate(decodeURIComponent(options.tagAdtag));
            }
            break;
          case 4:
            throttledUpdate(decodeURIComponent("%3Cstyle%3E%0A.container%20%7B%0A%09border%3A%201px%20solid%20%233b599e%3B%0A%09overflow%3A%20hidden%3B%0A%09filter%3A%20progid%3ADXImageTransform.Microsoft.gradient(startColorstr%3D%27%23315d8c%27%2C%20endColorstr%3D%27%2384aace%27)%3B%0A%7D%0A%3C%2Fstyle%3E%0A%3Cdiv%20class%3D%22container%22%20style%3D%22width%3A%20100%25%3B%20height%3A%20100%25%3B%22%3E%09%0A%3C%2Fdiv%3E"));
        }
      };
    }
    /**
     * @param {Node} instance
     * @return {?}
     */
    function success(instance) {
      var src;
      /** @type {null} */
      var udataOld = null;
      /** @type {null} */
      var pdataOld = null;
      /** @type {RegExp} */
      src = /<\/scr\+ipt>/g;
      /**
       * @param {string} string1
       * @return {?}
       */
      var trim = function(string1) {
        return string1.replace(/^\s+|\s+$/g, "");
      };
      /**
       * @param {Node} element
       * @return {?}
       */
      var update = function(element) {
        if (!(element = element.previousSibling) || ("#text" != element.nodeName || (null != element.nodeValue && (void 0 != element.nodeValue && 0 != trim(element.nodeValue).length) || (element = element.previousSibling))), element) {
          var type = element.getAttribute("type");
          if (type) {
            type = type.toLowerCase();
          }
        }
        return element && ("SCRIPT" == element.tagName && ((type && "text/tag" == type || "text/passback" == type) && "" != trim(element.innerHTML))) ? "text/tag" == type ? (udataOld = element.innerHTML.replace(src, "\x3c/script>"), {
          isBadImp: false,
          hasPassback: false,
          tagAdTag: udataOld,
          tagPassback: pdataOld
        }) : null != pdataOld ? {
          isBadImp: true,
          hasPassback: false,
          tagAdTag: udataOld,
          tagPassback: pdataOld
        } : (pdataOld = element.innerHTML.replace(src, "\x3c/script>"), element = update(element), element.hasPassback = true, element) : {
          isBadImp: true,
          hasPassback: false,
          tagAdTag: udataOld,
          tagPassback: pdataOld
        };
      };
      return update(instance);
    }
    /**
     * @param {?} app
     * @param {string} options
     * @param {string} item
     * @param {string} p
     * @param {string} key
     * @param {string} s
     * @param {boolean} el
     * @param {Object} map
     * @param {?} range
     * @return {?}
     */
    function init(app, options, item, p, key, s, el, map, range) {
      var data;
      var args;
      var value;
      if (void 0 == options.atregion) {
        /** @type {number} */
        options.atregion = 0;
      }
      var untrimmedBeforeSelectionText;
      var untrimmedSelectionText;
      var world;
      try {
        /** @type {string} */
        value = p;
        /** @type {number} */
        args = 0;
        for (; 10 > args && value != window._at_win.top;) {
          args++;
          value = value.parent;
        }
        /** @type {number} */
        p.depth = args;
        data = post(p);
        /** @type {string} */
        untrimmedBeforeSelectionText = "&aUrl=" + encodeURIComponent(data.url);
        /** @type {string} */
        untrimmedSelectionText = "&aUrlD=" + data.depth;
        world = p.depth + key;
        if (s) {
          p.depth--;
        }
      } catch (A) {
        /** @type {string} */
        untrimmedSelectionText = untrimmedBeforeSelectionText = world = p.depth = "";
      }
      if (key = options.script.src, s = "&cid=" + (callback(key, "cid") || "") + "&nid=" + (callback(key, "nid") || "") + "&uid=" + options.uid + "&guid=" + options.guid, (value = callback(key, "xff")) && (s += "&xff=" + value), (value = callback(key, "useragent")) && (s += "&useragent=" + value), void 0 != window._at_win.$atbs.CommonData.BrowserId && (void 0 != window._at_win.$atbs.CommonData.BrowserVersion &&
          void 0 != window._at_win.$atbs.CommonData.BrowserIdFromUserAgent)) {
        data = window._at_win.$atbs.CommonData.BrowserId;
        args = window._at_win.$atbs.CommonData.BrowserVersion;
        value = window._at_win.$atbs.CommonData.BrowserIdFromUserAgent;
      } else {
        /** @type {string} */
        var result = value ? decodeURIComponent(value) : navigator.userAgent;
        /** @type {Array} */
        data = [{
          id: 4,
          brRegex: "OPR|Opera",
          verRegex: "(OPR/|Version/)"
        }, {
          id: 1,
          brRegex: "MSIE|Trident/7.*rv:11|rv:11.*Trident/7",
          verRegex: "(MSIE |rv:)"
        }, {
          id: 2,
          brRegex: "Firefox",
          verRegex: "Firefox/"
        }, {
          id: 0,
          brRegex: "Mozilla.*Android.*AppleWebKit(?!.*Chrome.*)|Linux.*Android.*AppleWebKit.* Version/.*Chrome",
          verRegex: null
        }, {
          id: 0,
          brRegex: "AOL/.*AOLBuild/|AOLBuild/.*AOL/|Puffin|Maxthon|Valve|Silk|PLAYSTATION|PlayStation|Nintendo|wOSBrowser",
          verRegex: null
        }, {
          id: 3,
          brRegex: "Chrome",
          verRegex: "Chrome/"
        }, {
          id: 5,
          brRegex: "Safari|(OS |OS X )[0-9].*AppleWebKit",
          verRegex: "Version/"
        }];
        /** @type {number} */
        value = 0;
        /** @type {string} */
        args = "";
        /** @type {number} */
        var i = 0;
        for (; i < data.length; i++) {
          if (null != result.match(RegExp(data[i].brRegex))) {
            if (value = data[i].id, null == data[i].verRegex) {
              break;
            }
            /** @type {(Array.<string>|null)} */
            result = result.match(RegExp(data[i].verRegex + "[0-9]*"));
            if (null != result) {
              /** @type {(Array.<string>|null)} */
              args = result[0].match(RegExp(data[i].verRegex));
              /** @type {string} */
              args = result[0].replace(args[0], "");
            }
            break;
          }
        }
        data = i = createBrowserId();
        /** @type {string} */
        args = i === value ? args : "";
        window._at_win.$atbs.CommonData.BrowserId = data;
        /** @type {string} */
        window._at_win.$atbs.CommonData.BrowserVersion = args;
        window._at_win.$atbs.CommonData.BrowserIdFromUserAgent = value;
      }
      if (s += "&brid=" + data + "&brver=" + args + "&bridua=" + value, (value = callback(key, "turl")) && (s += "&turl=" + value), (value = callback(key, "tagformat")) && (s += "&tagformat=" + value), (value = callback(key, "pid")) && (s += "&pid=" + value), options = (window._at_win.at_config.verifyJSURL || options.protocol + "//" + (window._at_win.at_config.bsAddress ||
          options.url) + "/verify.js") + "?jsCallback=" + options.callbackName + s + "&srcurlD=" + p.depth + "&ssl=" + options.ssl + "&refD=" + world + options.tagIntegrityFlag + options.tagHasPassbackFlag + "&htmlmsging=" + (el ? "1" : "0"), (p = filter(key).join("&")) && (options += "&" + p), (false === map || range) && (options = options + ("&atp_isBodyExistOnLoad=" + (map ? "1" :
          "0")) + ("&atp_isOnHead=" + (range ? "1" : "0"))), item = "srcurl=" + encodeURIComponent(item), (map = window._at_win[set("=@42E:@?")][set("2?46DE@C~C:8:?D")]) && 0 < map.length) {
        /** @type {Array} */
        range = [];
        /** @type {string} */
        range[0] = window._at_win.location.protocol + "//" + window._at_win.location.hostname;
        /** @type {number} */
        p = 0;
        for (; p < map.length; p++) {
          range[p + 1] = map[p];
        }
        map = range.reverse().join(",");
      } else {
        /** @type {null} */
        map = null;
      }
      if (map) {
        item += "&ancChain=" + encodeURIComponent(map);
      }
      /** @type {number} */
      map = 4E3;
      if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
        if (7 >= new Number(RegExp.$1)) {
          /** @type {number} */
          map = 2E3;
        }
      }
      options += "&callback=" + callback(key, "callback");
      if (key = callback(key, "referrer")) {
        /** @type {string} */
        key = "&referrer=" + key;
        if (options.length + key.length <= map) {
          options += key;
        }
      }
      var srcs = window[set("5@4F>6?E")][set(":>286D")];
      /** @type {Array} */
      var tagNameArr = [];
      if (srcs) {
        /** @type {number} */
        var n = 0;
        for (; n < srcs.length; n++) {
          if (2 > n) {
            tagNameArr.push(encodeURIComponent(srcs[n].src));
          }
        }
      }
      return tagNameArr && (item += "&args=" + tagNameArr.join("###")), untrimmedBeforeSelectionText.length + untrimmedSelectionText.length + options.length <= map && (options += untrimmedSelectionText, item += untrimmedBeforeSelectionText), options += "&eparams=" + encodeURIComponent(set(item)) + "&" + app.getVersionParamName() + "=" + app.getVersion();
    }
    /**
     * @param {Node} value
     * @return {?}
     */
    function post(value) {
      try {
        if (1 >= value.depth) {
          return {
            url: "",
            depth: ""
          };
        }
        var valsLength;
        /** @type {Array} */
        var tokens = [];
        tokens.push({
          win: window._at_win.top,
          depth: 0
        });
        var self;
        /** @type {number} */
        var dist = 1;
        /** @type {number} */
        var maxDistUpper = 0;
        for (; dist > 0 && 100 > maxDistUpper;) {
          try {
            if (maxDistUpper++, self = tokens.shift(), dist--, 0 < self.win.location.toString().length && self.win != value) {
              return 0 == self.win.document.referrer.length || 0 == self.depth ? {
                url: self.win.location,
                depth: self.depth
              } : {
                url: self.win.document.referrer,
                depth: self.depth - 1
              };
            }
          } catch (o) {}
          valsLength = self.win.frames.length;
          /** @type {number} */
          var iframeId = 0;
          for (; valsLength > iframeId; iframeId++) {
            tokens.push({
              win: self.win.frames[iframeId],
              depth: self.depth + 1
            });
            dist++;
          }
        }
        return {
          url: "",
          depth: ""
        };
      } catch (s) {
        return {
          url: "",
          depth: ""
        };
      }
    }
    /**
     * @param {string} keys
     * @return {?}
     */
    function set(keys) {
      new String;
      var k;
      var fn;
      var str;
      /** @type {String} */
      var result = new String;
      /** @type {number} */
      k = 0;
      for (; k < keys.length; k++) {
        str = keys.charAt(k);
        /** @type {number} */
        fn = "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".indexOf(str);
        if (fn >= 0) {
          /** @type {string} */
          str = "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".charAt((fn + 47) % 94);
        }
        result += str;
      }
      return result;
    }

    /**
     * 生成一个16进制的guid
     * @return {?}
     */
    function createGUID() {
      /** @type {Array} */
      var uuid = [];
      /** @type {string} */
      var selector = "0123456789abcdef";
      /** @type {number} */
      var i = 0;
      for (; 36 > i; i++) {
        /** @type {string} */
        uuid[i] = selector.substr(Math.floor(16 * Math.random()), 1);
      }
      /** @type {string} */
      uuid[14] = "4";
      /** @type {string} */
      uuid[19] = selector.substr(3 & uuid[19] | 8, 1);
      /** @type {string} */
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
      /** @type {string} */
      var rv = uuid.join("");
      return rv;
    }

    /**
     * 生成一个大于等于0且小于1E12的整数
     * @return {Number}
     */
    function createInt() {
      return Math.floor(1E12 * (Math.random() + ""));
    }

    /**
     * 判断浏览器类型
     * @return {?} 浏览器标识。 Others : 0, IE : 1, Firefox : 2, Chrome : 3, Opera : 4, Safari : 5, PhantomJS : 99
     */
    function createBrowserId() {
      try {
        if (void 0 != window.opera && void 0 != window.history.navigationMode || void 0 != window.opr && (void 0 != window.opr.addons && "function" == typeof window.opr.addons.installExtension)) {
          return 4;
        }
        if (void 0 != window.chrome && ("function" == typeof window.chrome.csi && ("function" == typeof window.chrome.loadTimes && (void 0 != document.webkitHidden && (1 == document.webkitHidden || 0 == document.webkitHidden))))) {
          return 3;
        }
        if (void 0 != window.mozInnerScreenY && ("number" == typeof window.mozInnerScreenY && (void 0 != window.mozPaintCount && (0 <= window.mozPaintCount && (void 0 != window.InstallTrigger && void 0 != window.InstallTrigger.install))))) {
          return 2;
        }
        if (void 0 != document.uniqueID && ("string" == typeof document.uniqueID && (void 0 != document.documentMode && 0 <= document.documentMode || (void 0 != document.all && "object" == typeof document.all || void 0 != window.ActiveXObject && "function" == typeof window.ActiveXObject)))) {
          return 1;
        }
        if ("function" == typeof window.callPhantom) {
          return 99;
        }
        try {
          if ("function" == typeof window.top.callPhantom) {
            return 99;
          }
        } catch (t) {}

        /** @type {boolean} */
        var deep = false;
        try {
          new Text("!");
        } catch (n) {
          /** @type {boolean} */
          deep = true;
        }
        /** @type {boolean} */
        var copy = false;
        try {
          /** @type {Element} */
          var div = document.createElement("p");
          /** @type {string} */
          div.innerText = ".";
          /** @type {string} */
          div.style = "text-shadow: rgb(99, 116, 171) 20px -12px 2px";
          /** @type {boolean} */
          copy = void 0 != div.style.textShadow;
        } catch (a) {}
        return 0 < Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") && (deep && (copy && (void 0 != window.innerWidth && void 0 != window.innerHeight))) ? 5 : 0;
      } catch (o) {
        return 0;
      }
    }

    /**
     * 采集请求verify.js的参数，拼装URL
     * @return {?}
     */
    this.createRequest = function() {
      var file;
      //original: file = window._at_win.at_config ? window._at_win.at_config.bst2tid ? window._at_win.at_config.bst2tid : window._at_win.at_config.at_GetRnd ? window._at_win.at_config.at_GetRnd() : createInt() : createInt();
      file = 738477162318;
      var msgElm;
      /** @type {JSONType} */
      var failuresLink = window.parent.postMessage && window.JSON;
      /** @type {boolean} */
      var newMap = true;
      if (failuresLink) {
        try {
          var frame;
          var result = window._at_win.at_config.bst2turl || "";
          /** @type {string} */
          var path = "bst2t_" + file;
          if (document.createElement && ((frame = document.createElement("iframe")) && (frame.name = frame.id = window._at_win.at_config.emptyIframeID || "iframe_" + createInt(), frame.width = 0, frame.height = 0, frame.id = path, frame.style.display = "none", frame.src = result)), msgElm = frame, window._at_win.document.body) {
            window._at_win.document.body.insertBefore(msgElm, window._at_win.document.body.firstChild);
            /** @type {boolean} */
            newMap = true;
          } else {
            /** @type {number} */
            var f = 0;
            /**
             * @return {undefined}
             */
            var done = function() {
              if (window._at_win.document.body) {
                try {
                  window._at_win.document.body.insertBefore(msgElm, window._at_win.document.body.firstChild);
                } catch (t) {}
              } else {
                f++;
                if (150 > f) {
                  setTimeout(done, 20);
                }
              }
            };
            setTimeout(done, 20);
            /** @type {boolean} */
            newMap = false;
          }
        } catch (g) {}
      }
      /** @type {boolean} */
      var i = false;
      result = window._at_win;
      /** @type {number} */
      path = 0;
      /** @type {boolean} */
      frame = false;
      try {
        /** @type {number} */
        at_i = 0;
        for (; 10 >= at_i; at_i++) {
          if (null == result.parent || result.parent == result) {
            if (0 == at_i) {
              /** @type {boolean} */
              i = true;
            }
            break;
          }
          if (!(0 < result.parent.location.toString().length)) {
            /** @type {boolean} */
            i = false;
            break;
          }
          result = result.parent;
          path++;
          /** @type {boolean} */
          i = true;
        }
      } catch (h) {
        /** @type {boolean} */
        i = false;
      }
      if (0 == result.document.referrer.length) {
        i = result.location;
      } else {
        if (i) {
          i = result.location;
        } else {
          i = result.document.referrer;
          /** @type {boolean} */
          frame = true;
        }
      }
      if (!window._at_win._atScripts) {
        /** @type {Array} */
        window._at_win._atScripts = [];
      }
      /** @type {NodeList} */
      var scripts = document.getElementsByTagName("script");
      for (at_i in scripts) {
        var url = scripts[at_i].src;
        var uri = window._at_win.at_config.reqex || /^[ \t]*(http(s)?:\/\/)?[a-z\-]*cdn(s)?\.hegek7\.com:?[0-9]*\/atv.js/;
        if (url && (url.match(uri) && !objEquiv(window._at_win._atScripts, scripts[at_i]))) {
          this.at_script = scripts[at_i];
          window._at_win._atScripts.push(scripts[at_i]);
          var options;
          uri = {};
          try {
            /** @type {RegExp} */
            var regex = RegExp("[\\?&]([^&]*)=([^&#]*)", "gi");
            /** @type {(Array.<string>|null)} */
            var parts = regex.exec(url);
            for (; null != parts;) {
              if ("eparams" !== parts[1]) {
                /** @type {string} */
                uri[parts[1]] = parts[2];
              }
              /** @type {(Array.<string>|null)} */
              parts = regex.exec(url);
            }
            options = uri;
          } catch (x) {
            options = uri;
          }

          //original: return options.uid = file, options.guid = createGUID(), options.script = this.at_script, options.callbackName = "__verify_callback_" + options.uid, options.tagAdtag = null, options.tagPassback = null, options.tagIntegrityFlag = "", options.tagHasPassbackFlag = "", 0 == (null != options.tagformat && "2" == options.tagformat) && (file = success(options.script), options.tagAdtag = file.tagAdTag, options.tagPassback = file.tagPassback, file.isBadImp ? options.tagIntegrityFlag = "&isbadimp=1" : file.hasPassback && (options.tagHasPassbackFlag = "&tagpb=1")), options.protocol = "http:", options.ssl = "0", "https" == options.script.src.match("^https") && ("https" == window._at_win.location.toString().match("^https") && (options.protocol = "https:", options.ssl = "1")), configure(options), init(this, options, i, result, path, frame, failuresLink, newMap, scripts[at_i] && (scripts[at_i].parentElement && (scripts[at_i].parentElement.tagName && "HEAD" === scripts[at_i].parentElement.tagName)));

          return options.uid = file, options.guid = "505db12fff5b1c39e3971aab5161d91b", options.script = this.at_script, options.callbackName = "__verify_callback_" + options.uid, options.tagAdtag = null, options.tagPassback = null, options.tagIntegrityFlag = "", options.tagHasPassbackFlag = "", 0 == (null != options.tagformat && "2" == options.tagformat) && (file = success(options.script), options.tagAdtag = file.tagAdTag, options.tagPassback = file.tagPassback, file.isBadImp ? options.tagIntegrityFlag = "&isbadimp=1" : file.hasPassback && (options.tagHasPassbackFlag = "&tagpb=1")), options.protocol = "http:",
            options.ssl = "0", "https" == options.script.src.match("^https") && ("https" == window._at_win.location.toString().match("^https") && (options.protocol = "https:", options.ssl = "1")), configure(options), init(this, options, i, result, path, frame, failuresLink, newMap, scripts[at_i] && (scripts[at_i].parentElement && (scripts[at_i].parentElement.tagName && "HEAD" === scripts[at_i].parentElement.tagName)));
        }
      }
    };

    /**
     * 向页面插入JS
     * @param {string} url
     * @return {?}
     */
    this.sendRequest = function(url) {
      var current = callback(url, "tagformat");
      return current && "2" == current ? $atbs.domUtilities.addScriptResource(url, document.body) : writeScript(url), true;
    };
    /**
     * 是否适用标识
     * @return {?}
     */
    this.isApplicable = function() {
      return true;
    };
    /**
     * @return {undefined}
     */
    this.onFailure = function() {
      var fromCols = window._at_win._atScripts;
      var fromIndex = this.at_script;
      if (null != fromCols) {
        if (void 0 != fromCols) {
          if (fromIndex) {
            fromIndex = fromCols.at_indexOf(fromIndex);
            if (-1 != fromIndex) {
              fromCols.splice(fromIndex, 1);
            }
          }
        }
      }
    };
    if (window.debugScript) {
      /** @type {function (?, string, string, string, string, string, boolean, Object, ?): ?} */
      window.CreateUrl = init;
    }
    /**
     * @return {?}
     */
    this.getVersionParamName = function() {
      return "ver";
    };
    /**
     * @return {?}
     */
    this.getVersion = function() {
      return "1.3.4";
    };
  }

  /**
   * 配置参数
   * @param {Obj} obj
   * @param {Array} arr
   * @return {undefined}
   */
  function Define(obj, arr) {
    this.bs_baseHandlerIns = obj;
    this.bs_handlersDefs = arr;
    /**
     * @return {undefined}
     */
    this.exec = function() {
      try {
        window._at_win = window._at_win || window;
        window._at_win.$atbs = window._at_win.$atbs || new Atbs;
        window._at_win.at_config = window._at_win.at_config || {};
        window._at_win.at_config.bsAddress = window._at_win.at_config.bsAddress || "v.hegek7.com";
        window._at_win.at_config.bsErrAddress = window._at_win.at_config.bsErrAddress || (window._at_win.at_config.bsAddress || "error.hegek7.com");

        var params = (new Trigger(this.bs_handlersDefs, this.bs_baseHandlerIns)).handle();
        if (params) {
          if (params.length > 0) {
            emit(window._at_win.at_config.bsErrAddress + "/error.gif?a=ve", params);
          }
        }
      } catch (ex) {
        try {
          emit(window._at_win.at_config.bsErrAddress + "/error.gif?a=ve", {
            atp_jsErrMsg: encodeURIComponent(ex)
          });
        } catch (ex) {}
      }
    };
  }

  /**
   * 不带回调 Image 请求
   * @param {string} current
   */
  function sendByImage(url) {
    /** @type {string} */
    (new Image).src = url;
  }

  // 启动入口
  try {
    window._at_win = window._at_win || window;
    var init = new Init;
    /** @type {Array} */
    var arr = [];
    (new Define(init, arr)).exec();
  } catch (ex) {}

  /**
   * 发送beacon请求队列
   * @param {string} url
   * @param {Array} data
   * @return {undefined}
   */
  emit = function(url, data) {
    var byteIndex;
    /** @type {number} */
    byteIndex = 0;
    for (; byteIndex < data.length; byteIndex++) {
      var url = getData(url, data[byteIndex]);
      sendByImage(url);
    }
  };
  try {} catch (ex) {}
}();
