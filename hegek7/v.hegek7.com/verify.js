/**
 * 代码翻译：听歌
 * 电子邮件：505253293@163.com
 * 个人主页：https://github.com/TingGe
 * 代码地址：
  http://v.hegek7.com/verify.js?jsCallback=__verify_callback_526116636581&cid=123&nid=456&uid=526116636581&guid=4d396710-f3f1-43fd-9443-bd4cd70b206d&brid=3&brver=48&bridua=3&srcurlD=0&ssl=0&refD=1&isbadimp=1&htmlmsging=1&callback=null&aUrlD=&eparams=DC4FC%3Dl9EEATbpTauTau56G%5C86%3F6C2%3D%5CH63%5D4%408EF45%3F%5D4%40%3ETauE6DE%5C9686%3CTau5%404%5C%3A7I%3CH2IGadcddfe%5D9E%3E%3DU2%3F4r92%3A%3Fl9EEATbpTauTau56G%5C86%3F6C2%3D%5CH63%5D4%408EF45%3F%5D4%40%3ETar9EEATbpTauTau56G%5C86%3F6C2%3D%5CH63%5D4%408EF45%3F%5D4%40%3EU2C8DlU2%26C%3Dl&ver=1.3.4
 * 文档地址：暂无
 *
 * @fileoverview AdbugTech 客户端 javascript代码: 主要用于监测可见曝光和停留时间
 */

// 执行 atv.js 的回调
__verify_callback_738477162318({ //根据请求的 jsCallback 对应
  ResultID: 3
});

/**
 * 发送信息给采集服务器
 * @param {string} name
 * @param {string} failing_message
 * @param {string} query
 * @return {undefined}
 */
function report(name, failing_message, query) {
  /** @type {string} */
  var src = "http://" + window._at_win.at_config.bsAddress + "/" + name + ".gif?";
  /** @type {string} */
  query = query || "";
  src += failing_message;
  src += "&guid=505db12fff5b1c39e3971aab5161d91b"; //由服务器端生成，不一定与请求 verify.js 的 guid 值相同
  src += "&nid=456"; //与请求的 nid 对应
  src += "&cid=123"; // 与请求的 cid 对应
  src += "&" + query;
  window._at_win.$atbs.domUtilities.addImage(src, document.body);
}

try {
  ! function() {
    /**
     * 转10进制
     * @param {?} num
     * @return {Number}
     */
    function intval(num) {
      return parseInt(num, 10);
    }

    /**
     * 读取系统、浏览器、浏览器版本号、flash player及版本号
     * @return {?}
     */
    function getDeviceInfo() {
      /** @type {string} */
      var UNDEFINED = "undefined";
      /** @type {string} */
      var iteratee = "object";
      /** @type {string} */
      var SHOCKWAVE_FLASH = "Shockwave Flash";
      /** @type {string} */
      var SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash";
      /** @type {string} */
      var FLASH_MIME_TYPE = "application/x-shockwave-flash";
      /** @type {Window} */
      var win = window;
      /** @type {HTMLDocument} */
      var doc = document;
      /** @type {(Navigator|null)} */
      var nav = navigator;

      var resp = function() {
        /** @type {boolean} */
        var w3cdom = typeof doc.getElementById !== UNDEFINED && (typeof doc.getElementsByTagName !== UNDEFINED && typeof doc.createElement !== UNDEFINED);
        /** @type {string} */
        var out = nav.userAgent.toLowerCase();
        /** @type {string} */
        var test = nav.platform.toLowerCase();
        /** @type {boolean} */
        var windows = /win/.test(test ? test : out);
        /** @type {boolean} */
        var mac = /mac/.test(test ? test : out);
        /** @type {(boolean|number)} */
        var webkit = /webkit/.test(out) ? parseFloat(out.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false;
        /** @type {boolean} */
        var ie = "Microsoft Internet Explorer" === nav.appName;
        /** @type {(boolean|number)} */
        var edge = /trident/.test(out) ? parseFloat(out.replace(/^.*trident\/(\d+(\.\d+)?).*$/, "$1")) : false;
        /** @type {Array} */
        var obj = [0, 0, 0];
        /** @type {null} */
        var version = null;
        if (typeof nav.plugins !== UNDEFINED && typeof nav.plugins[SHOCKWAVE_FLASH] === iteratee) {
          version = nav.plugins[SHOCKWAVE_FLASH].description;
          if (version) {
            if (typeof nav.mimeTypes !== UNDEFINED) {
              if (nav.mimeTypes[FLASH_MIME_TYPE]) {
                if (nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin) {
                  /** @type {boolean} */
                  plugin = true;
                  /** @type {boolean} */
                  ie = false;
                  version = version.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                  obj[0] = intval(version.replace(/^(.*)\..*$/, "$1"));
                  obj[1] = intval(version.replace(/^.*\.(.*)\s.*$/, "$1"));
                  obj[2] = /[a-zA-Z]/.test(version) ? intval(version.replace(/^.*[a-zA-Z]+(.*)$/, "$1")) : 0;
                }
              }
            }
          }
        } else {
          if (typeof win.ActiveXObject !== UNDEFINED) {
            try {
              var activexobject = new ActiveXObject(SHOCKWAVE_FLASH_AX);
              if (activexobject) {
                version = activexobject.GetVariable("$version");
                if (version) {
                  /** @type {boolean} */
                  ie = true;
                  version = version.split(" ")[1].split(",");
                  /** @type {Array} */
                  obj = [intval(version[0]), intval(version[1]), intval(version[2])];
                }
              }
            } catch (ex) {}
          }
        }
        return {
          w3: w3cdom,
          edge: edge,
          pv: obj, // falsh player 版本号
          wk: webkit,
          ie: ie,
          win: windows,
          mac: mac
        };
      }();
      return resp;
    }

    /**
     * 获取浏览器可视区域尺寸
     * @return {?}
     */
    function getViewSize() {
      var body;
      var element;
      var size = {};
      if (getIframe) {
        if (doc = top.document, element = doc.documentElement, body = doc.getElementsByTagName("body")[0], _.isDef(top.innerWidth)) {
          /** @type {number} */
          size.width = top.innerWidth;
          /** @type {number} */
          size.height = top.innerHeight;
        } else {
          if (_.isDef(element.clientWidth)) {
            /** @type {number} */
            size.width = element.clientWidth;
            /** @type {number} */
            size.height = element.clientHeight;
          } else {
            if (!_.isDef(body.clientWidth)) {
              throw size.width = size.height = 0, "";
            }
            size.width = body.clientWidth;
            size.height = body.clientHeight;
          }
        }
      } else {
        if (_.isDef(window.outerWidth)) {
          /** @type {number} */
          size.width = window.outerWidth;
          /** @type {number} */
          size.height = window.outerHeight;
        }
      }
      return size;
    }

    /**
     * 鼠标相对于屏幕的坐标和浏览器可见区域尺寸
     * @return {Object}
     */
    function mouseHandler() {
      var x;
      var y;
      var view_width;
      var view_size;
      return view_size = getViewSize(), view_width = view_size.width, view_height = view_size.height, getIframe ? x = y = 0 : (_.isDef(window.screenX) && (x = window.screenX), _.isDef(window.screenY) && (y = window.screenY)), isNaN(x) || (isNaN(y) || (isNaN(view_width) || isNaN(view_height))) ? -1 : {
        x: that.round(x),
        y: that.round(y),
        width: that.round(view_width),
        height: that.round(view_height)
      };
    }

    /**
     * 获取 dom 元素 obj 的坐标和尺寸
     * @param {(Object|null)} obj
     * @return {?}
     */
    function updateElementPositionAndSize(obj) {
      var result = {};
      obj = obj.getBoundingClientRect();
      result.x = obj.left;
      result.y = obj.top;
      /** @type {number} */
      result.width = obj.right - obj.left;
      /** @type {number} */
      result.height = obj.bottom - obj.top;
      var key;
      for (key in obj) {
        if (!result.hasOwnProperty(key)) {
          result[key] = obj[key];
        }
      }
      return result;
    }

    /**
     * 兼容 Rect 的，获取 dom 元素 body 的坐标和尺寸
     * @param {(Object|null)} body
     * @return {?}
     */
    function getElementPositionAndSize(body) {
      var result = {};
      return body !== window.parent && (1 !== body.nodeType ? result = body : _.isDef(body.getBoundingClientRect) && ((element = updateElementPositionAndSize(body)) && (result = {
        x: element.left,
        y: element.top,
        width: element.width,
        height: element.height
      }))) ? result : void 0;
    }

    /**
     * 获取 dom 元素 element 的样式 key 的值
     * @param {(Object|null)} element
     * @param {string} key
     * @return {?}
     */
    function getStyle(element, key) {
      /** @type {string} */
      var val = "";
      return document.defaultView && document.defaultView.getComputedStyle ? val = document.defaultView.getComputedStyle(element, "").getPropertyValue(key) : element.currentStyle && (key = key.replace(/\-(\w)/g, function(dataAndEvents, letter) {
        return letter.toUpperCase();
      }), val = element.currentStyle[key]), val;
    }

    /**
     * Todo： ？ 判断 element 的宽高
     * @param {Element} element
     * @return {?}
     */
    function setup(element) {
      var elementRect = updateElementPositionAndSize(element);
      return element = 0 !== parseInt(getStyle(element, "width")) && 0 === elementRect.width, elementRect = 0 === elementRect.width || 0 === elementRect.height, element || elementRect;
    }

    /**
     * 判断是否element元素，并获取 dom 元素
     * @param {(Object|null)} body
     * @return {?}
     */
    function func(body) {
      var html = 1 === body.nodeType ? setup(body) : 0 === body.width || 0 === body.height;
      return isFunction ? false : html;
    }

    /**
     * Todo： ？ 比较 target 和 body
     * @param {(Object|null)} target
     * @param {(Object|null)} body
     * @return {?}
     */
    function compareElement(target, body) {
      var i;
      var j = func(body);
      var bounds = getElementPositionAndSize(body);
      i = target.x;
      var temp = bounds.x;
      /** @type {number} */
      i = Math.min(target.x + target.width, bounds.x + bounds.width) - Math.max(temp, i);
      temp = target.y;
      var ty = bounds.y;
      /** @type {number} */
      temp = Math.min(target.y + target.height, bounds.y + bounds.height) - Math.max(ty, temp);
      return i = 0 >= i || j ? 0 : that.round(i / bounds.width * 100), j = 0 >= temp || j ? 0 : that.round(temp / bounds.height * 100), that.round(i * j / 100);
    }

    /**
     * Todo： ？ 判断是否在可见区域
     * @param {number} m
     * @param {boolean} container
     * @return {?}
     */
    function Keyboard(m, container) {
      /** @type {number} */
      var index = 75;
      return (getIframe || container) && (index = m >= 75 ? "i" : 25 >= m ? "o" : m >= 50 ? "m" : "m"), index;
    }

    /**
     * 获取 window 对象
     * @return {?}
     */
    function getWindow() {
      var win;
      return win = getIframe ? window.frameElement : window;
    }

    /**
     * Todo： ？
     * @return {?}
     */
    function getName() {
      var mom = compareElement(mouseHandler(), getWindow());
      return Keyboard(mom);
    }

    /**
     * 组装 data的 lgs 参数
     * @param {string} val
     * @param {string} value
     * @return {undefined}
     */
    function add(val, value) {
      headers.push("T:" + val + "|TM:" + ((new Date).getTime() - startTime) + "|V:" + value);
    }

    /**
     * 监听页面的主控函数
     * @param {number} time
     * @param {(Function|null)} done
     * @param {(Object|null)} func
     * @return {undefined}
     */
    function runTest(time, done, func) {

      /**
       * 根据 u ，向data填充在可见区域的参数
       * @return {undefined}
       */
      function setInView() {
        index += frequency;
        if (u) {
          add("i", index);
        } else {
          /** @type {boolean} */
          u = true;
          add("fi", index);
        }
      }

      /**
       * 填充不在可见区域的参数
       * @return {undefined}
       */
      function setOutView() {
        add("o", index);
      }

      /** @type {number} */
      var index = 0;
      /** @type {number} */
      var frequency = 50;
      /** @type {boolean} */
      var u = false;
      /** @type {number} */
      var count = 0;
      /** @type {number} */
      var id = setInterval(function() {
        var self = _this.setInView();

        if (count > 150 && (func && func(), id && clearInterval(id)), isSupportedFlashPlayer && getIframe) {
          var name = getName();
          if ("i" == name && (i = 2) || "i" == self.str && (i = 1)) {
            setInView();
          } else {
            setOutView();
          }
        } else {
          if (isSupportedFlashPlayer && (!getIframe && ("i" == self.str ? setInView() : setOutView(), i = 1)), getIframe && !isSupportedFlashPlayer) {
            name = getName();
            if ("i" == name) {
              setInView();
            } else {
              setOutView();
            }
            /** @type {number} */
            i = 2;
          }
        }

        if (1 == i) {
          if (!_this.ready()) {
            count++;
          }
        }
        if (index == time || index > time) {
          /** @type {number} */
          S = 1;
          if (done) {
            done();
          }
          clearInterval(id);
        }
      }, frequency);
    }

    /**
     * 从页面移除请求节点
     * @return {undefined}
     */
    function throttledUpdate() {
      if (_this) {
        _this.destory();
      }
    }
    /**
     * 事件监听
     * @param {(Object|null)} body
     * @param {string} event
     * @param {(Function|null)} fn
     * @param {boolean} capture
     * @return {undefined}
     */
    function on(body, event, fn, capture) {
      if (_.isDef(body.addEventListener)) {
        body.addEventListener(event, fn, capture);
      } else {
        if (_.isDef(body.attachEvent)) {
          body.attachEvent("on" + event, fn);
        }
      }
    }

    /**
     * beforunload 事件回调函数
     * @return {undefined}
     */
    function handler() {
      /** @type {number} */
      var inteval = (new Date).getTime() - startTime;
      /** @type {string} */
      var redirect_uri = encodeURIComponent("dw=" + i + "&lf=" + inteval + "&fi=" + S + "&lgs=" + headers.join("#"));
      report("event", "at=vlog", "data=" + redirect_uri);
    }

    /** @type {number} */
    var startTime = (new Date).getTime();
    var deviceInfo = getDeviceInfo();

    var _ = {};
    /**
     * 判断是否已定义
     * @param {(Object|null)} val
     * @return {?}
     */
    _.isDef = function(val) {
      return "undefined" != typeof val;
    };

    /**
     * 判断是否函数
     * @param {?} arg
     * @return {?}
     */
    _.isFunction = function(arg) {
      return "function" == typeof arg;
    };
    /**
     * @param {boolean} result
     * @return {?}
     */
    _.useIfDef = function(result) {
      return _.isDef(result) ? result : false;
    };

    var data = {
      FLASH_MIME: "application/x-shockwave-flash",
      NA: "na",
      atd: "adt"
    };

    /**
     * 任务队列
     * @return {?}
     */
    var TaskQueue = function() {
      /** @type {Array} */
      var handlers = [];
      return {
        /**
         * @param {string} val
         * @return {undefined}
         */
        push: function(val) {
          /** @type {string} */
          handlers[handlers.length] = val;
        },
        /**
         * @return {undefined}
         */
        run: function() {
          /** @type {Arguments} */
          var args = arguments;
          /** @type {number} */
          var i = 0;
          for (; i < handlers.length; i++) {
            handlers[i].apply({}, args);
          }
        }
      };
    };
    /**
     *
     * @param {(Function|null)} fn
     * @return {?}
     */
    var access = function(fn) {
      var colModel = {};
      var n = that.now();
      /** @type {boolean} */
      var expected = true;
      var queue = new TaskQueue;
      /** @type {boolean} */
      var o = false;
      /**
       * @return {undefined}
       */
      fn = function() {
        /**
         * @return {undefined}
         */
        var tick = function() {
          n = that.now();
          window.webkitRequestAnimationFrame(tick);
        };
        window.webkitRequestAnimationFrame(tick);
        setInterval(function() {
          /** @type {boolean} */
          var result = 100 < that.now() - n;
          if (expected !== result) {
            /** @type {boolean} */
            expected = result;
            queue.run(result);
          }
        }, 100);
      };

      /**
       * 判断页面是否不可见
       * @return {?}
       */
      var isPageHidden = function() {
        /** @type {null} */
        var object = null;
        if (_.isDef(document.hidden) ? object = document.hidden : _.isDef(document.mozHidden) ? object = document.mozHidden : _.isDef(document.msHidden) ? object = document.msHidden : _.isDef(document.webkitHidden) && (object = document.webkitHidden), null !== object) {
          /** @type {null} */
          var result = object;
          if (expected !== result) {
            /** @type {null} */
            expected = result;
            queue.run(result);
          }
        }
        return object;
      };

      return colModel.onHiddenChange = function(source) {
        queue.push(source);
      }, colModel.isHidden = function() {
        return o && !window.top.document.hasFocus() || isPageHidden();
      }, null === isPageHidden() && (_.isDef(window.webkitRequestAnimationFrame) && (fn(), colModel.isHidden = function() {
        return expected;
      })), colModel;
    };

    // 数学处理的工具
    var that = {
      /**
       * @param {(Function|null)} fnc
       * @return {undefined}
       */
      execAtEndOfThread: function(fnc) {
        setTimeout(fnc, 0);
      },
      /**
       * @return {?}
       */
      now: function() {
        return (new Date).getTime();
      },
      /**
       * @return {?}
       */
      random: function() {
        return Math.random();
      },
      /**
       * @param {number} val
       * @return {?}
       */
      round: function(val) {
        return Math.round(val);
      },
      /**
       * @param {?} startAt
       * @return {?}
       */
      ceil: function(startAt) {
        return Math.ceil(startAt);
      },
      /**
       * @param {number} n
       * @return {?}
       */
      floor: function(n) {
        return Math.floor(n);
      }
    };

    /**
     * Todo: ?
     * @param {(Element|null)} container
     * @param {number} xpos
     * @param {number} deepDataAndEvents
     * @param {?} allBindingsAccessor
     * @return {?}
     */
    var init = function(container, xpos, deepDataAndEvents, allBindingsAccessor) {
      var elem;
      var skip;
      var expanded;
      var u;
      var tok;
      /**
       * @param {string} name
       * @param {string} value
       * @return {?}
       */
      var fn = function(name, value) {
        return '<param name="' + name + '" value="' + value + '"/>';
      };

      /**
       * 构建 test.swf 的 dom 对象
       * @return {?}
       */
      var divcreateTestHtmlSnippet = function() {
        /** @type {string} */
        var value = "http://cdn.hegek7.com/test.swf";
        var content = fn("allowscriptaccess", "always");
        var header = fn("movie", value) + fn("play", "true") + fn("loop", "true");
        return window.attachEvent ? (div = document.createElement("div"), div.innerHTML = '<object id="blag" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ' + (data.adt + '="true" ') + ('type="' + data.FLASH_MIME + '" ') + ('data="' + value + '" ') + ">" + header + content + "</object>", elem = div.firstChild) : (elem = document.createElement("object"), elem.data = value, elem.type = data.FLASH_MIME,
          elem.innerHTML = content, elem[data.adt] = "true"), elem.style.position = "absolute", elem.style.width = "1px", elem.style.opacity = "0", elem.style.height = "0px", elem;
      };

      /**
       * @param {(Element|null)} element
       * @return {undefined}
       */
      var constructor = function(element) {
        /** @type {string} */
        element.style.height = expanded ? "1px" : "2px";
        /** @type {boolean} */
        expanded = !expanded;
        that.execAtEndOfThread(function() {
          if (fail()) {
            try {
              skip = element.is();
            } catch (e) {
              initPlugins();
            }
          }
        });
      };
      /**
       * @return {undefined}
       */
      var initPlugins = function() {
        /** @type {boolean} */
        tok = false;
      };
      /**
       * @return {?}
       */
      var fail = function() {
        /** @type {string} */
        var key = "test";
        return (key = tok || elem && _.isFunction(elem[key])) && (!u && (tok = true, false)), key;
      };

      return function(container, xpos, deepDataAndEvents) {
        var testSwf = divcreateTestHtmlSnippet();
        var testStyle = testSwf.style;
        /** @type {string} */
        testStyle.left = xpos + "px";
        /** @type {string} */
        testStyle.top = deepDataAndEvents + "px";
        container.appendChild(testSwf);
        /** @type {string} */
        testStyle.height = "1px";
        allBindingsAccessor.onHiddenChange(function(dataAndEvents) {
          if (dataAndEvents) {
            /** @type {string} */
            testStyle.height = "0px";
          } else {
            constructor(testSwf);
          }
        });
      }(container, xpos, deepDataAndEvents), {
        /**
         * @return {?}
         */
        is: function() {
          var val;
          if (fail()) {
            try {
              val = elem.test();
            } catch (e) {
              initPlugins();
            }
            if (window.WebKitPoint) {
              if (val !== skip) {
                constructor(elem);
              }
            }
          }
          return fail() && val;
        },
        /**
         * @return {?}
         */
        isReady: function() {
          return !fail();
        },
        created: elem
      };
    };

    /**
     * @param {?} params
     * @param {number} dataAndEvents
     * @return {?}
     */
    var animate = function(params, dataAndEvents) {
      var a;
      var delta;
      var e;
      var x = params.width;
      var tmp = params.height;
      /** @type {Array} */
      var group = [];
      /** @type {number} */
      var percentScroll = x / (dataAndEvents + 1);
      /** @type {number} */
      var d = tmp / (dataAndEvents + 1);
      /** @type {number} */
      var zoomFactorDelta = 1;
      if (0 === x || 0 === tmp) {
        group.push({
          x: 1,
          y: 1,
          weight: 1
        });
      } else {
        /** @type {number} */
        e = d;
        for (; tmp > e; e += d, zoomFactorDelta++) {
          /** @type {number} */
          delta = percentScroll * zoomFactorDelta;
          if (delta > x / 2) {
            /** @type {number} */
            delta = x - delta;
          }
          a = {
            x: that.floor(delta),
            y: that.floor(e),
            weight: 1
          };
          delta = {
            x: that.floor(x - delta),
            y: that.floor(e),
            weight: 1
          };
          if (a.x === delta.x) {
            /** @type {number} */
            a.weight = 2;
            a.x += 1;
            a.y += 1;
            group.push(a);
          } else {
            group.push(a);
            group.push(delta);
          }
        }
      }

      return {
        /**
         * @return {?}
         */
        get: function() {
          return group;
        }
      };
    };

    /**
     *
     * @param {(Function|null)} type
     * @param {?} opt_interval
     * @param {(Function|null)} callback
     * @param {(number|string)} to
     * @param {?} onFailed
     * @param {number} units
     * @param {number} ui
     * @return {?}
     */
    var start = function(type, opt_interval, callback, to, onFailed, units, ui) {
      /**
       * @return {?}
       */
      function fn() {
        return {
          width: body.clientWidth,
          height: body.clientHeight
        };
      }
      var scrollIntervalId;
      var done;
      /** @type {Array} */
      var codeSegments = [];
      /** @type {boolean} */
      var started = false;
      /** @type {number} */
      var s = 0;
      /**
       * @return {?}
       */
      var _start = function() {
        var i;
        if (!started) {
          /** @type {boolean} */
          started = true;
          /** @type {number} */
          i = 0;
          for (; i < codeSegments.length; i++) {
            if (codeSegments[i].isReady()) {
              /** @type {boolean} */
              started = false;
              break;
            }
          }
        }
        return started;
      };

      /**
       * @return {?}
       */
      var setInView = function() {
        /** @type {number} */
        var sum = 0;
        /** @type {number} */
        var count = 0;
        /** @type {number} */
        var i = 0;
        for (; i < codeSegments.length; i++) {
          var item = codeSegments[i];
          count += item.weight;
          if (item.is()) {
            sum += item.weight;
          }
        }
        return that.round(sum / count * 100);
      };

      /** @type {(HTMLElement|null)} */
      var body = document.body;
      return function() {
        var resultItems = animate(fn(), 1).get();
        /** @type {number} */
        var i = 0;
        for (; i < resultItems.length; i++) {
          var item = resultItems[i];
          var out = new type(body, item.x, item.y, to, units, ui);
          out.weight = item.weight;
          codeSegments.push(out);
        }
      }(), callback = callback || function() {}, scrollIntervalId = setInterval(function() {
        if (_start() && !done) {
          /** @type {boolean} */
          done = true;
          callback();
          clearInterval(scrollIntervalId);
        } else {
          if (5 === ++s || done) {
            clearInterval(scrollIntervalId);
          }
        }
      }, 50), {
        /**
         * @return {?}
         */
        setInView: function() {
          var value;
          var raw = _start();
          return raw && (value = 50 <= setInView() ? "i" : "o"), raw && (!done && (done = true, callback())), {
            str: raw ? value : data.NA,
            pct: raw ? setInView() : -1
          };
        },
        /**
         * @return {?}
         */
        ready: function() {
          var db = _start();
          return db;
        },
        /**
         * @return {undefined}
         */
        destory: function() {
          /** @type {number} */
          var i = 0;
          for (; i < codeSegments.length; i++) {
            body.removeChild(codeSegments[i].created);
          }
        }
      };
    };

    // Todo: ? 没明白为何初始 495, 75
    var _this = start(init, {
      x: 495,
      y: 75
    }, function() {}, access());

    // 是否可获取到 iframe 的 window
    var getIframe = function() {
      var t;
      try {
        /** @type {boolean} */
        t = !!top.document;
        if (t) {
          /** @type {boolean} */
          t = !!window.frameElement;
        }
      } catch (e) {
        /** @type {boolean} */
        t = false;
      }
      return t;
    }();

    /** @type {boolean} */
    var isFunction = false;

    /** 判断 flash player 版本是否支持运行 test.swf */
    /** @type {boolean} */
    var isSupportedFlashPlayer = deviceInfo.pv[0] > 11 ? true : deviceInfo.pv[0] > 11 && deviceInfo.pv[1] > 6;

    if (deviceInfo.edge) {
      if (deviceInfo.edge > 6) {
        /** @type {boolean} */
        a = true;
      }
    }

    if (!isSupportedFlashPlayer) {
      if (!getIframe) {
        // 不能获取到主页面 document 信息
        report("error", "a=vi", "atp_jsErrMsg=tl");
        throttledUpdate();
      }
    }
    /** @type {Array} */
    var headers = [];
    /** @type {number} */
    var S = 0;
    /** @type {number} */
    var i = 0;

    //以 50ms 频率监测页面，更新 handler 请求参数
    runTest(1E3, function() {
      report("event", "f=v");
      throttledUpdate();
    }, function() {
      report("error", "a=vi", "atp_jsErrMsg=ft");
      throttledUpdate();
    });

    on(window, "beforeunload", handler, false);
  }();
} catch (ex) {
  // verify.js 执行错误
  report("error", "a=vi", "atp_jsErrMsg=" + encodeURIComponent(ex));
};
