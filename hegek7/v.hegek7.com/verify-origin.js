__verify_callback_738477162318({
  ResultID: 3
});

function report(t, e, n) {
  var i = "http://" + window._at_win.at_config.bsAddress + "/" + t + ".gif?",
    n = n || "";
  i += e, i += "&guid=505db12fff5b1c39e3971aab5161d91b", i += "&nid=456", i += "&cid=123", i += "&" + n, window._at_win.$atbs.domUtilities.addImage(i, document.body)
}
try {
  ! function() {
    function t(t) {
      return parseInt(t, 10)
    }

    function e() {
      var e = "undefined",
        n = "object",
        i = "Shockwave Flash",
        r = "ShockwaveFlash.ShockwaveFlash",
        o = "application/x-shockwave-flash",
        a = window,
        u = document,
        c = navigator,
        d = function() {
          var d = typeof u.getElementById !== e && typeof u.getElementsByTagName !== e && typeof u.createElement !== e,
            f = c.userAgent.toLowerCase(),
            h = c.platform.toLowerCase(),
            s = /win/.test(h ? h : f),
            l = /mac/.test(h ? h : f),
            w = /webkit/.test(f) ? parseFloat(f.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1,
            p = "Microsoft Internet Explorer" === c.appName,
            v = /trident/.test(f) ? parseFloat(f.replace(/^.*trident\/(\d+(\.\d+)?).*$/, "$1")) : !1,
            g = [0, 0, 0],
            m = null;
          if (typeof c.plugins !== e && typeof c.plugins[i] === n) m = c.plugins[i].description, m && typeof c.mimeTypes !== e && c.mimeTypes[o] && c.mimeTypes[o].enabledPlugin && (plugin = !0, p = !1, m = m.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), g[0] = t(m.replace(/^(.*)\..*$/, "$1")), g[1] = t(m.replace(/^.*\.(.*)\s.*$/, "$1")), g[2] = /[a-zA-Z]/.test(m) ? t(m.replace(/^.*[a-zA-Z]+(.*)$/, "$1")) : 0);
          else if (typeof a.ActiveXObject !== e) try {
            var y = new ActiveXObject(r);
            y && (m = y.GetVariable("$version"), m && (p = !0, m = m.split(" ")[1].split(","), g = [t(m[0]), t(m[1]), t(m[2])]))
          } catch (b) {}
          return {
            w3: d,
            edge: v,
            pv: g,
            wk: w,
            ie: p,
            win: s,
            mac: l
          }
        }();
      return d
    }

    function n() {
      var t, e, n = {};
      if (C)
        if (t = top.document, e = t.documentElement, t = t.getElementsByTagName("body")[0], x.isDef(top.innerWidth)) n.width = top.innerWidth, n.height = top.innerHeight;
        else if (x.isDef(e.clientWidth)) n.width = e.clientWidth, n.height = e.clientHeight;
      else {
        if (!x.isDef(t.clientWidth)) throw n.width = n.height = 0, "";
        n.width = t.clientWidth, n.height = t.clientHeight
      } else x.isDef(window.outerWidth) && (n.width = window.outerWidth, n.height = window.outerHeight);
      return n
    }

    function i() {
      var t, e, i, r;
      return r = n(), i = r.width, r = r.height, C ? t = e = 0 : (x.isDef(window.screenX) && (t = window.screenX), x.isDef(window.screenY) && (e = window.screenY)), isNaN(t) || isNaN(e) || isNaN(i) || isNaN(r) ? -1 : {
        x: H.round(t),
        y: H.round(e),
        width: H.round(i),
        height: H.round(r)
      }
    }

    function r(t) {
      var e = {};
      t = t.getBoundingClientRect(), e.x = t.left, e.y = t.top, e.width = t.right - t.left, e.height = t.bottom - t.top;
      for (var n in t) e.hasOwnProperty(n) || (e[n] = t[n]);
      return e
    }

    function o(t) {
      var e = {};
      return t !== window.parent && (1 !== t.nodeType ? e = t : x.isDef(t.getBoundingClientRect) && (b = r(t)) && (e = {
        x: b.left,
        y: b.top,
        width: b.width,
        height: b.height
      })) ? e : void 0
    }

    function a(t, e) {
      var n = "";
      return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(t, "").getPropertyValue(e) : t.currentStyle && (e = e.replace(/\-(\w)/g, function(t, e) {
        return e.toUpperCase()
      }), n = t.currentStyle[e]), n
    }

    function u(t) {
      var e = r(t);
      return t = 0 !== parseInt(a(t, "width")) && 0 === e.width, e = 0 === e.width || 0 === e.height, t || e
    }

    function c(t) {
      var e = 1 === t.nodeType ? u(t) : 0 === t.width || 0 === t.height;
      return F ? !1 : e
    }

    function d(t, e) {
      var n, i = c(e),
        r = o(e);
      n = t.x;
      var a = r.x;
      n = Math.min(t.x + t.width, r.x + r.width) - Math.max(a, n);
      var a = t.y,
        u = r.y,
        a = Math.min(t.y + t.height, r.y + r.height) - Math.max(u, a);
      return n = 0 >= n || i ? 0 : H.round(n / r.width * 100), i = 0 >= a || i ? 0 : H.round(a / r.height * 100), H.round(n * i / 100)
    }

    function f(t, e) {
      var n = 75;
      return (C || e) && (n = t >= 75 ? "i" : 25 >= t ? "o" : t >= 50 ? "m" : "m"), n
    }

    function h() {
      var t;
      return t = C ? window.frameElement : window
    }

    function s() {
      var t = d(i(), h());
      return f(t)
    }

    function l(t, e) {
      N.push("T:" + t + "|TM:" + ((new Date).getTime() - m) + "|V:" + e)
    }

    function w(t, e, n) {
      function i() {
        o += a, u ? l("i", o) : (u = !0, l("fi", o))
      }

      function r() {
        l("o", o)
      }
      var o = 0,
        a = 50,
        u = !1,
        c = 0,
        d = setInterval(function() {
          var a = A.check();
          if (c > 150 && (n && n(), d && clearInterval(d)), $ && C) {
            var u = s();
            "i" == u && (_ = 2) || "i" == a.str && (_ = 1) ? i() : r()
          } else if ($ && !C && ("i" == a.str ? i() : r(), _ = 1), C && !$) {
            var u = s();
            "i" == u ? i() : r(), _ = 2
          }
          1 == _ && (A.ready() || c++), (o == t || o > t) && (S = 1, e && e(), clearInterval(d))
        }, a)
    }

    function p() {
      A && A.destory()
    }

    function v(t, e, n, i) {
      x.isDef(t.addEventListener) ? t.addEventListener(e, n, i) : x.isDef(t.attachEvent) && t.attachEvent("on" + e, n)
    }

    function g() {
      var t = (new Date).getTime() - m,
        e = encodeURIComponent("dw=" + _ + "&lf=" + t + "&fi=" + S + "&lgs=" + N.join("#"));
      report("event", "at=vlog", "data=" + e)
    }
    var m = (new Date).getTime(),
      y = e(),
      x = {};
    x.isDef = function(t) {
      return "undefined" != typeof t
    }, x.isFunction = function(t) {
      return "function" == typeof t
    }, x.useIfDef = function(t) {
      return x.isDef(t) ? t : !1
    };
    var E = {
        FLASH_MIME: "application/x-shockwave-flash",
        NA: "na",
        atd: "adt"
      },
      D = function() {
        var t = [];
        return {
          push: function(e) {
            t[t.length] = e
          },
          run: function() {
            for (var e = arguments, n = 0; n < t.length; n++) t[n].apply({}, e)
          }
        }
      },
      M = function(t) {
        var e = {},
          n = H.now(),
          i = !0,
          r = new D,
          o = !1;
        t = function() {
          var t = function() {
            n = H.now(), window.webkitRequestAnimationFrame(t)
          };
          window.webkitRequestAnimationFrame(t), setInterval(function() {
            var t = 100 < H.now() - n;
            i !== t && (i = t, r.run(t))
          }, 100)
        };
        var a = function() {
          var t = null;
          if (x.isDef(document.hidden) ? t = document.hidden : x.isDef(document.mozHidden) ? t = document.mozHidden : x.isDef(document.msHidden) ? t = document.msHidden : x.isDef(document.webkitHidden) && (t = document.webkitHidden), null !== t) {
            var e = t;
            i !== e && (i = e, r.run(e))
          }
          return t
        };
        return e.onHiddenChange = function(t) {
          r.push(t)
        }, e.isHidden = function() {
          return o && !window.top.document.hasFocus() || a()
        }, null === a() && x.isDef(window.webkitRequestAnimationFrame) && (t(), e.isHidden = function() {
          return i
        }), e
      },
      H = {
        execAtEndOfThread: function(t) {
          setTimeout(t, 0)
        },
        now: function() {
          return (new Date).getTime()
        },
        random: function() {
          return Math.random()
        },
        round: function(t) {
          return Math.round(t)
        },
        ceil: function(t) {
          return Math.ceil(t)
        },
        floor: function(t) {
          return Math.floor(t)
        }
      },
      I = function(t, e, n, i) {
        var r, o, a, u, c, d = function(t, e) {
            return '<param name="' + t + '" value="' + e + '"/>'
          },
          f = function() {
            var t = "http://cdn.hegek7.com/test.swf",
              e = d("allowscriptaccess", "always"),
              n = d("movie", t) + d("play", "true") + d("loop", "true");
            return window.attachEvent ? (b = document.createElement("div"), b.innerHTML = '<object id="blag" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ' + (E.adt + '="true" ') + ('type="' + E.FLASH_MIME + '" ') + ('data="' + t + '" ') + ">" + n + e + "</object>", r = b.firstChild) : (r = document.createElement("object"), r.data = t, r.type = E.FLASH_MIME, r.innerHTML = e, r[E.adt] = "true"), r.style.position = "absolute", r.style.width = "1px", r.style.opacity = "0", r.style.height = "0px", r
          },
          h = function(t) {
            t.style.height = a ? "1px" : "2px", a = !a, H.execAtEndOfThread(function() {
              if (l()) try {
                o = t.is()
              } catch (e) {
                s()
              }
            })
          },
          s = function() {
            c = !1
          },
          l = function() {
            var t = "test";
            return (t = c || r && x.isFunction(r[t])) && !u && (c = !0, !1), t
          };
        return function(t, e, n) {
          var r = f(),
            o = r.style;
          o.left = e + "px", o.top = n + "px", t.appendChild(r), o.height = "1px", i.onHiddenChange(function(t) {
            t ? o.height = "0px" : h(r)
          })
        }(t, e, n), {
          is: function() {
            var t;
            if (l()) {
              try {
                t = r.test()
              } catch (e) {
                s()
              }
              window.WebKitPoint && t !== o && h(r)
            }
            return l() && t
          },
          isReady: function() {
            return !l()
          },
          created: r
        }
      },
      T = function(t, e) {
        var n, i, r, o = t.width,
          a = t.height,
          u = [],
          c = o / (e + 1),
          d = a / (e + 1),
          f = 1;
        if (0 === o || 0 === a) u.push({
          x: 1,
          y: 1,
          weight: 1
        });
        else
          for (r = d; a > r; r += d, f++) i = c * f, i > o / 2 && (i = o - i), n = {
            x: H.floor(i),
            y: H.floor(r),
            weight: 1
          }, i = {
            x: H.floor(o - i),
            y: H.floor(r),
            weight: 1
          }, n.x === i.x ? (n.weight = 2, n.x += 1, n.y += 1, u.push(n)) : (u.push(n), u.push(i));
        return {
          get: function() {
            return u
          }
        }
      },
      k = function(t, e, n, i, r, o, a) {
        function u() {
          return {
            width: p.clientWidth,
            height: p.clientHeight
          }
        }
        var c, d, f = [],
          h = !1,
          s = 0,
          l = function() {
            var t;
            if (!h)
              for (h = !0, t = 0; t < f.length; t++)
                if (f[t].isReady()) {
                  h = !1;
                  break
                }
            return h
          },
          w = function() {
            for (var t = 0, e = 0, n = 0; n < f.length; n++) {
              var i = f[n];
              e += i.weight, i.is() && (t += i.weight)
            }
            return H.round(t / e * 100)
          },
          p = document.body;
        return function() {
          for (var e = T(u(), 1).get(), n = 0; n < e.length; n++) {
            var r = e[n],
              c = new t(p, r.x, r.y, i, o, a);
            c.weight = r.weight, f.push(c)
          }
        }(), n = n || function() {}, c = setInterval(function() {
          l() && !d ? (d = !0, n(), clearInterval(c)) : (5 === ++s || d) && clearInterval(c)
        }, 50), {
          check: function() {
            var t, e = l();
            return e && (t = 50 <= w() ? "i" : "o"), e && !d && (d = !0, n()), {
              str: e ? t : E.NA,
              pct: e ? w() : -1
            }
          },
          ready: function() {
            var t = l();
            return t
          },
          destory: function() {
            for (var t = 0; t < f.length; t++) p.removeChild(f[t].created)
          }
        }
      },
      A = k(I, {
        x: 495,
        y: 75
      }, function() {}, M()),
      C = function() {
        var t;
        try {
          t = !!top.document, t && (t = !!window.frameElement)
        } catch (e) {
          t = !1
        }
        return t
      }(),
      F = !1,
      $ = y.pv[0] > 11 ? !0 : y.pv[0] > 11 && y.pv[1] > 6;
    y.edge && y.edge > 6 && ($ = !0), $ || C || (report("error", "a=vi", "atp_jsErrMsg=tl"), p());
    var N = [],
      S = 0,
      _ = 0;
    w(1e3, function() {
      report("event", "f=v"), p()
    }, function() {
      report("error", "a=vi", "atp_jsErrMsg=ft"), p()
    }), v(window, "beforeunload", g, !1)
  }()
} catch (e) {
  report("error", "a=vi", "atp_jsErrMsg=" + encodeURIComponent(e))
}
