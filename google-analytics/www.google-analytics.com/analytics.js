/**
 * 代码翻译：听歌
 * 电子邮件：505253293@163.com
 * 个人主页：https://github.com/TingGe
 * 代码地址：https://www.google-analytics.com/analytics.js
 * 文档地址：
 *   https://developers.google.com/analytics/devguides/collection/analyticsjs/
 *   https://developers.google.com/analytics/devguides/collection/analyticsjs/?hl=zh-cn
 *
 * @fileoverview Google Analytics（分析）客户端javascript代码。
 */

(function () {
    var aa = encodeURIComponent,
      win = window,
      _Math = Math;

    function setHref(a, uri) {
        return a.href = uri;
    }

    var _replace = "replace",
      _data = "data",
      _match = "match",
      _port = "port",
      _createElement = "createElement",
      _setAttribute = "setAttribute",
      _getTime = "getTime",
      _split = "split",
      _location = "location",
      _hasOwnProperty = "hasOwnProperty",
      _hostname = "hostname",
      _search = "search",
      _protocol = "protocol",
      _href = "href",
      _action = "action",
      _apply = "apply",
      _push = "push",
      _hash = "hash",
      _test = "test",
      _slice = "slice",
      _cookie = "cookie",
      _indexOf = "indexOf",
      _defaultValue = "defaultValue",
      _name = "name",
      _length = "length",
      _sendBeacon = "sendBeacon",
      _prototype = "prototype",
      _clientWidth = "clientWidth",
      _target = "target",
      _call = "call",
      _clientHeight = "clientHeight",
      _substring = "substring",
      _navigator = "navigator",
      _join = "join",
      _toLowerCase = "toLowerCase";

    var $c = function (a) {
        this.w = a || []
    };
    $c[_prototype].set = function (a) {
        this.w[a] = !0
    };
    $c[_prototype].encode = function () {
        for (var a = [], b = 0; b < this.w[_length]; b++)this.w[b] && (a[_Math.floor(b / 6)] = a[_Math.floor(b / 6)] ^ 1 << b % 6);
        for (b = 0; b < a[_length]; b++)a[b] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(a[b] || 0);
        return a[_join]("") + "~"
    };
    var vd = new $c;

    function J(a) {
        vd.set(a)
    }

    var Nd = function (a, b) {
        var c = new $c(Dd(a));
        c.set(b);
        a.set(Gd, c.w)
    }, Td = function (a) {
        a = Dd(a);
        a = new $c(a);
        for (var b = vd.w[_slice](), c = 0; c < a.w[_length]; c++)b[c] = b[c] || a.w[c];
        return (new $c(b)).encode()
    }, Dd = function (a) {
        a = a.get(Gd);
        isArray(a) || (a = []);
        return a
    };

    var isFunction = function (a) {
        return "function" == typeof a
    }, isArray = function (a) {
        return "[object Array]" == Object[_prototype].toString[_call](Object(a))
    }, isString = function (a) {
        return void 0 != a && -1 < (a.constructor + "")[_indexOf]("String")
    }, startWith = function (a, b) {
        return 0 == a[_indexOf](b)
    }, trim = function (a) {
        return a ? a[_replace](/^[\s\xa0]+|[\s\xa0]+$/g, "") : ""
    }, sendBeacon = function (a) {
        var b = doc[_createElement]("img");
        b.width = 1;
        b.height = 1;
        b.src = a;
        return b
    }, ua = function () {
    }, K = function (a) {
        if (aa instanceof Function)return aa(a);
        J(28);
        return a
    }, L = function (a, b, c, d) {
        try {
            a.addEventListener ? a.addEventListener(b,
              c, !!d) : a.attachEvent && a.attachEvent("on" + b, c)
        } catch (e) {
            J(27)
        }
    }, insertScript = function (a, b) {
        if (a) {
            var c = doc[_createElement]("script");
            c.type = "text/javascript";
            c.async = !0;
            c.src = a;
            b && (c.id = b);
            var d = doc.getElementsByTagName("script")[0];
            d.parentNode.insertBefore(c, d)
        }
    }, isSSL = function () {
        return "https:" == doc[_location][_protocol]
    }, xa = function () {
        var a = "" + doc[_location][_hostname];
        return 0 == a[_indexOf]("www.") ? a[_substring](4) : a
    }, ya = function (a) {
        var b = doc.referrer;
        if (/^https?:\/\//i[_test](b)) {
            if (a)return b;
            a = "//" + doc[_location][_hostname];
            var c = b[_indexOf](a);
            if (5 == c || 6 == c)if (a = b.charAt(c + a[_length]), "/" == a || "?" == a || "" ==
              a || ":" == a)return;
            return b
        }
    }, za = function (a, b) {
        if (1 == b[_length] && null != b[0] && "object" === typeof b[0])return b[0];
        for (var c = {}, d = _Math.min(a[_length] + 1, b[_length]), e = 0; e < d; e++)if ("object" === typeof b[e]) {
            for (var g in b[e])b[e][_hasOwnProperty](g) && (c[g] = b[e][g]);
            break
        } else e < a[_length] && (c[a[e]] = b[e]);
        return c
    };

    var ee = function () {
        this.keys = [];
        this.values = {};
        this.m = {}
    };
    ee[_prototype].set = function (a, b, c) {
        this.keys[_push](a);
        c ? this.m[":" + a] = b : this.values[":" + a] = b
    };
    ee[_prototype].get = function (a) {
        return this.m[_hasOwnProperty](":" + a) ? this.m[":" + a] : this.values[":" + a]
    };
    ee[_prototype].map = function (a) {
        for (var b = 0; b < this.keys[_length]; b++) {
            var c = this.keys[b], d = this.get(c);
            d && a(c, d)
        }
    };

    var win = win,
      doc = document,
      Mc = function () {
          for (var a = win[_navigator].userAgent + (doc[_cookie] ? doc[_cookie] : "") + (doc.referrer ? doc.referrer : ""), b = a[_length], c = win.history[_length]; 0 < c;)a += c-- ^ b++;
          return La(a)
      };

    var Aa = function (a) {
        var b = win._gaUserPrefs;
        if (b && b.ioo && b.ioo() || a && !0 === win["ga-disable-" + a])return !0;
        try {
            var c = win.external;
            if (c && c._gaUserPrefs && "oo" == c._gaUserPrefs)return !0
        } catch (d) {
        }
        return !1
    };

    var Ca = function (a) {
        var b = [], c = doc[_cookie][_split](";");
        a = new RegExp("^\\s*" + a + "=\\s*(.*?)\\s*$");
        for (var d = 0; d < c[_length]; d++) {
            var e = c[d][_match](a);
            e && b[_push](e[1])
        }
        return b
    }, zc = function (a, b, c, d, e, g) {
        e = Aa(e) ? !1 : eb[_test](doc[_location][_hostname]) || "/" == c && vc[_test](d) ? !1 : !0;
        if (!e)return !1;
        b && 1200 < b[_length] && (b = b[_substring](0, 1200), J(24));
        c = a + "=" + b + "; path=" + c + "; ";
        g && (c += "expires=" + (new Date((new Date)[_getTime]() + g)).toGMTString() + "; ");
        d && "none" != d && (c += "domain=" + d + ";");
        d = doc[_cookie];
        doc.cookie = c;
        if (!(d = d != doc[_cookie]))a:{
            a = Ca(a);
            for (d = 0; d < a[_length]; d++)if (b == a[d]) {
                d = !0;
                break a
            }
            d = !1
        }
        return d
    }, Cc = function (a) {
        return K(a)[_replace](/\(/g, "%28")[_replace](/\)/g, "%29")
    }, vc = /^(www\.)?google(\.com?)?(\.[a-z]{2})?$/, eb = /(^|\.)doubleclick\.net$/i;

    var oc = function () {
        return (Ba || isSSL() ? "https:" : "http:") + "//www.google-analytics.com"
    }, Da = function (a) {
        this.name = "len";
        this.message = a + "-8192"
    }, ba = function (a, b, c) {
        c = c || ua;
        if (2036 >= b[_length])wc(a, b, c); else if (8192 >= b[_length])x(a, b, c) || sendByRequest(a, b, c) || wc(a, b, c); else throw ge("len", b[_length]), new Da(b[_length]);
    }, wc = function (a, b, c) {
        var d = sendBeacon(a + "?" + b);
        d.onload = d.onerror = function () {
            d.onload = null;
            d.onerror = null;
            c()
        }
    }, sendByRequest = function (a, b, c) {
        var d = win.XMLHttpRequest;
        if (!d)return !1;
        var e = new d;
        if (!("withCredentials"in e))return !1;
        e.open("POST",
          a, !0);
        e.withCredentials = !0;
        e.setRequestHeader("Content-Type", "text/plain");
        e.onreadystatechange = function () {
            4 == e.readyState && (c(), e = null)
        };
        e.send(b);
        return !0
    }, x = function (a, b, c) {
        if (!win[_navigator][_sendBeacon])return !1;
        2036 >= b[_length] && (a += "?" + b, b = "");
        return win[_navigator][_sendBeacon](a, b) ? (c(), !0) : !1
    }, ge = function (a, b, c) {
        1 <= 100 * _Math.random() || Aa("?") || (a = ["t=error", "_e=" + a, "_v=j35", "sr=1"], b && a[_push]("_f=" + b), c && a[_push]("_m=" + K(c[_substring](0, 100))), a[_push]("aip=1"), a[_push]("z=" + fe()), wc(oc() + "/collect", a[_join]("&"), ua))
    };

    var Ha = function () {
        this.t = []
    };
    Ha[_prototype].add = function (a) {
        this.t[_push](a)
    };
    Ha[_prototype].D = function (a) {
        try {
            for (var b = 0; b < this.t[_length]; b++) {
                var c = a.get(this.t[b]);
                c && isFunction(c) && c[_call](win, a)
            }
        } catch (d) {
        }
        b = a.get(Ia);
        b != ua && isFunction(b) && (a.set(Ia, ua, !0), setTimeout(b, 10))
    };
    function Ja(a) {
        if (100 != a.get(Ka) && La(P(a, Q)) % 1E4 >= 100 * R(a, Ka))throw"abort";
    }

    function Ma(a) {
        if (Aa(P(a, Na)))throw"abort";
    }

    function Oa() {
        var a = doc[_location][_protocol];
        if ("http:" != a && "https:" != a)throw"abort";
    }

    function Pa(a) {
        try {
            win[_navigator][_sendBeacon] ? J(42) : win.XMLHttpRequest && "withCredentials"in new win.XMLHttpRequest && J(40)
        } catch (b) {
        }
        a.set(ld, Td(a), !0);
        a.set(Ac, R(a, Ac) + 1);
        var c = [];
        Qa.map(function (b, e) {
            if (e.p) {
                var g = a.get(b);
                void 0 != g && g != e[_defaultValue] && ("boolean" == typeof g && (g *= 1), c[_push](e.p + "=" + K("" + g)))
            }
        });
        c[_push]("z=" + Bd());
        a.set(Ra, c[_join]("&"), !0)
    }

    function Sa(a) {
        var b = P(a, gd) || oc() + "/collect", c = P(a, fa);
        !c && a.get(Vd) && (c = "beacon");
        if (c) {
            var d = P(a, Ra), e = a.get(Ia), e = e || ua;
            "image" == c ? wc(b, d, e) : "xhr" == c && sendByRequest(b, d, e) || "beacon" == c && x(b, d, e) || ba(b, d, e)
        } else ba(b, P(a, Ra), a.get(Ia));
        a.set(Ia, ua, !0)
    }

    function Hc(a) {
        var b = win.gaData;
        b && (b.expId && a.set(Nc, b.expId), b.expVar && a.set(Oc, b.expVar))
    }

    function cd() {
        if (win[_navigator] && "preview" == win[_navigator].loadPurpose)throw"abort";
    }

    function yd(a) {
        var b = win.gaDevIds;
        isArray(b) && 0 != b[_length] && a.set("&did", b[_join](","), !0)
    }

    function vb(a) {
        if (!a.get(Na))throw"abort";
    }
    var hd = function () {
        return _Math.round(2147483647 * _Math.random())
    }, Bd = function () {
        try {
            var a = new Uint32Array(1);
            win.crypto.getRandomValues(a);
            return a[0] & 2147483647
        } catch (b) {
            return hd()
        }
    }, fe = hd;

    function Ta(a) {
        var b = R(a, Ua);
        500 <= b && J(15);
        var c = P(a, Va);
        if ("transaction" != c && "item" != c) {
            var c = R(a, Wa), d = (new Date)[_getTime](), e = R(a, Xa);
            0 == e && a.set(Xa, d);
            e = _Math.round(2 * (d - e) / 1E3);
            0 < e && (c = _Math.min(c + e, 20), a.set(Xa, d));
            if (0 >= c)throw"abort";
            a.set(Wa, --c)
        }
        a.set(Ua, ++b)
    }

    var Ya = function () {
        this.data = new ee
    }, Qa = new ee, Za = [];
    Ya[_prototype].get = function (a) {
        var b = $a(a), c = this[_data].get(a);
        b && void 0 == c && (c = isFunction(b[_defaultValue]) ? b[_defaultValue]() : b[_defaultValue]);
        return b && b.n ? b.n(this, a, c) : c
    };
    var P = function (a, b) {
        var c = a.get(b);
        return void 0 == c ? "" : "" + c
    }, R = function (a, b) {
        var c = a.get(b);
        return void 0 == c || "" === c ? 0 : 1 * c
    };
    Ya[_prototype].set = function (a, b, c) {
        if (a)if ("object" == typeof a)for (var d in a)a[_hasOwnProperty](d) && ab(this, d, a[d], c); else ab(this, a, b, c)
    };

    var ab = function (a, b, c, d) {
        if (void 0 != c)switch (b) {
            case Na:
                SiteIdReg[_test](c)
        }
        var e = $a(b);
        e && e.o ? e.o(a, b, c, d) : a[_data].set(b, c, d)
    }, bb = function (a, b, c, d, e) {
        this.name = a;
        this.p = b;
        this.n = d;
        this.o = e;
        this.defaultValue = c
    }, $a = function (a) {
        var b = Qa.get(a);
        if (!b)for (var c = 0; c < Za[_length]; c++) {
            var d = Za[c], e = d[0].exec(a);
            if (e) {
                b = d[1](e);
                Qa.set(b[_name], b);
                break
            }
        }
        return b
    }, yc = function (a) {
        var b;
        Qa.map(function (c, d) {
            d.p == a && (b = d)
        });
        return b && b[_name]
    }, S = function (a, b, c, d, e) {
        a = new bb(a, b, c, d, e);
        Qa.set(a[_name], a);
        return a[_name]
    }, cb = function (a, b) {
        Za[_push]([new RegExp("^" +
          a + "$"), b])
    }, T = function (a, b, c) {
        return S(a, b, c, void 0, db)
    }, db = function () {
    };

    var GANameSpace = isString(win.GoogleAnalyticsObject) && trim(win.GoogleAnalyticsObject) || "ga",
      Ba = !1,
      he = S("_br"),
      hb = T("apiVersion", "v"),
      ib = T("clientVersion", "_v");

    S("anonymizeIp", "aip");
    var jb = S("adSenseId", "a"), Va = S("hitType", "t"), Ia = S("hitCallback"), Ra = S("hitPayload");
    S("nonInteraction", "ni");
    S("currencyCode", "cu");
    S("dataSource", "ds");
    var Vd = S("useBeacon", void 0, !1), fa = S("transport");
    S("sessionControl", "sc", "");
    S("sessionGroup", "sg");
    S("queueTime", "qt");
    var Ac = S("_s", "_s");
    S("screenName", "cd");
    var kb = S("location", "dl", ""), lb = S("referrer", "dr"), mb = S("page", "dp", "");
    S("hostname", "dh");
    var nb = S("language", "ul"), ob = S("encoding", "de");
    S("title", "dt", function () {
        return doc.title || void 0
    });
    cb("contentGroup([0-9]+)", function (a) {
        return new bb(a[0], "cg" + a[1])
    });

    var pb = S("screenColors", "sd"),
      qb = S("screenResolution", "sr"),
      rb = S("viewportSize", "vp"),
      sb = S("javaEnabled", "je"),
      tb = S("flashVersion", "fl");

    S("campaignId", "ci");
    S("campaignName", "cn");
    S("campaignSource", "cs");
    S("campaignMedium", "cm");
    S("campaignKeyword", "ck");
    S("campaignContent", "cc");

    var ub = S("eventCategory", "ec"),
      xb = S("eventAction", "ea"),
      yb = S("eventLabel", "el"),
      zb = S("eventValue", "ev"),
      Bb = S("socialNetwork", "sn"),
      Cb = S("socialAction", "sa"),
      Db = S("socialTarget", "st"),
      Eb = S("l1", "plt"),
      Fb = S("l2", "pdt"),
      Gb = S("l3", "dns"),
      Hb = S("l4", "rrt"),
      Ib = S("l5", "srt"),
      Jb = S("l6", "tcp"),
      Kb = S("l7", "dit"),
      Lb = S("l8", "clt"),
      Mb = S("timingCategory", "utc"),
      Nb = S("timingVar", "utv"),
      Ob = S("timingLabel", "utl"),
      Pb = S("timingValue", "utt");

    S("appName", "an");
    S("appVersion", "av", "");
    S("appId", "aid", "");
    S("appInstallerId", "aiid", "");
    S("exDescription", "exd");
    S("exFatal", "exf");

    var Nc = S("expId", "xid"),
      Oc = S("expVar", "xvar"),
      Rc = S("_utma", "_utma"),
      Sc = S("_utmz", "_utmz"),
      Tc = S("_utmht", "_utmht"),
      Ua = S("_hc", void 0, 0),
      Xa = S("_ti", void 0, 0),
      Wa = S("_to", void 0, 20);

    cb("dimension([0-9]+)", function (a) {
        return new bb(a[0], "cd" + a[1])
    });
    cb("metric([0-9]+)", function (a) {
        return new bb(a[0], "cm" + a[1])
    });
    S("linkerParam", void 0, void 0, Bc, db);

    var ld = S("usage", "_u"), Gd = S("_um");
    S("forceSSL", void 0, void 0, function () {
        return Ba
    }, function (a, b, c) {
        J(34);
        Ba = !!c
    });

    var ed = S("_j1", "jid"), Hd = S("_j2");
    cb("\\&(.*)", function (a) {
        var b = new bb(a[0], a[1]), c = yc(a[0][_substring](1));
        c && (b.n = function (a) {
            return a.get(c)
        }, b.o = function (a, b, g, ca) {
            a.set(c, g, ca)
        }, b.p = void 0);
        return b
    });

    var Qb = T("_oot"),
      dd = S("previewTask"),
      Rb = S("checkProtocolTask"),
      md = S("validationTask"),
      Sb = S("checkStorageTask"),
      Uc = S("historyImportTask"),
      Tb = S("samplerTask"),
      Vb = S("_rlt"),
      Wb = S("buildHitTask"),
      Xb = S("sendHitTask"),
      Vc = S("ceTask"),
      zd = S("devIdTask"),
      Cd = S("timingTask"),
      Ld = S("displayFeaturesTask"),
      V = T("name"),
      Q = T("clientId", "cid"),
      Ad = S("userId", "uid"),
      Na = T("trackingId", "tid"),
      U = T("cookieName", void 0, "_ga"),
      W = T("cookieDomain"),
      Yb = T("cookiePath", void 0, "/"),
      Zb = T("cookieExpires", void 0, 63072E3),
      $b = T("legacyCookieDomain"),
      Wc = T("legacyHistoryImport", void 0, !0),
      ac = T("storage", void 0, "cookie"),
      bc = T("allowLinker", void 0, !1),
      cc = T("allowAnchor", void 0, !0),
      Ka = T("sampleRate", "sf", 100),
      dc = T("siteSpeedSampleRate", void 0, 1),
      ec = T("alwaysSendReferrer", void 0, !1),
      gd = S("transportUrl"),
      Md = S("_r", "_r");

    function X(a, b, c, d) {
        b[a] = function () {
            try {
                return d && J(d), c[_apply](this, arguments)
            } catch (b) {
                throw ge("exc", a, b && b[_name]), b;
            }
        }
    }
    var Od = function (a, b, c) {
        this.V = 1E4;
        this.fa = a;
        this.$ = !1;
        this.B = b;
        this.ea = c || 1
    }, Ed = function (a, b) {
        var c;
        if (a.fa && a.$)return 0;
        a.$ = !0;
        if (b) {
            if (a.B && R(b, a.B))return R(b, a.B);
            if (0 == b.get(dc))return 0
        }
        if (0 == a.V)return 0;
        void 0 === c && (c = Bd());
        return 0 == c % a.V ? _Math.floor(c / a.V) % a.ea + 1 : 0
    };

    var ie = new Od(!0, he, 7), je = function (a) {
        if (!isSSL() && !Ba) {
            var b = Ed(ie, a);
            if (b && !(!win[_navigator][_sendBeacon] && 4 <= b && 6 >= b)) {
                var c = (new Date).getHours(), d = [Bd(), Bd(), Bd()][_join](".");
                a = (3 == b || 5 == b ? "https:" : "http:") + "//www.google-analytics.com/collect?z=br.";
                a += [b, "A", c, d][_join](".");
                var e = 1 != b % 3 ? "https:" : "http:", e = e + "//www.google-analytics.com/collect?z=br.", e = e + [b, "B", c, d][_join](".");
                7 == b && (e = e[_replace]("//www.", "//ssl."));
                c = function () {
                    4 <= b && 6 >= b ? win[_navigator][_sendBeacon](e, "") : sendBeacon(e)
                };
                Bd() % 2 ? (sendBeacon(a), c()) : (c(), sendBeacon(a))
            }
        }
    };

    /**
     * 获取浏览器FLASH播放器的版本号。
     * @return {String} FLASH播放器的版本号。
     */
    function fc() {
        var a, b, c;
        if ((c = (c = win[_navigator]) ? c.plugins : null) && c[_length])for (var d = 0; d < c[_length] && !b; d++) {
            var e = c[d];
            -1 < e[_name][_indexOf]("Shockwave Flash") && (b = e.description)
        }
        if (!b)try {
            a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"), b = a.GetVariable("$version")
        } catch (g) {
        }
        if (!b)try {
            a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"), b = "WIN 6,0,21,0", a.AllowScriptAccess = "always", b = a.GetVariable("$version")
        } catch (ca) {
        }
        if (!b)try {
            a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), b = a.GetVariable("$version")
        } catch (l) {
        }
        b &&
        (a = b[_match](/[\d]+/g)) && 3 <= a[_length] && (b = a[0] + "." + a[1] + " r" + a[2]);
        return b || void 0
    }

    var gc = function (a, b) {
        var c = _Math.min(R(a, dc), 100);
        if (!(La(P(a, Q)) % 100 >= c) && (c = {}, Ec(c) || Fc(c))) {
            var d = c[Eb];
            void 0 == d || Infinity == d || isNaN(d) || (0 < d ? (Y(c, Gb), Y(c, Jb), Y(c, Ib), Y(c, Fb), Y(c, Hb), Y(c, Kb), Y(c, Lb), b(c)) : L(win, "load", function () {
                gc(a, b)
            }, !1))
        }
    }, Ec = function (a) {
        var b = win.performance || win.webkitPerformance, b = b && b.timing;
        if (!b)return !1;
        var c = b.navigationStart;
        if (0 == c)return !1;
        a[Eb] = b.loadEventStart - c;
        a[Gb] = b.domainLookupEnd - b.domainLookupStart;
        a[Jb] = b.connectEnd - b.connectStart;
        a[Ib] = b.responseStart - b.requestStart;
        a[Fb] = b.responseEnd - b.responseStart;
        a[Hb] = b.fetchStart - c;
        a[Kb] = b.domInteractive - c;
        a[Lb] = b.domContentLoadedEventStart - c;
        return !0
    }, Fc = function (a) {
        if (win.top != win)return !1;
        var b = win.external, c = b && b.onloadT;
        b && !b.isValidLoadTime && (c = void 0);
        2147483648 < c && (c = void 0);
        0 < c && b.setPageReadyTime();
        if (void 0 == c)return !1;
        a[Eb] = c;
        return !0
    }, Y = function (a, b) {
        var c = a[b];
        if (isNaN(c) || Infinity == c || 0 > c)a[b] = void 0
    }, Fd = function (a) {
        return function (b) {
            "pageview" != b.get(Va) || a.I || (a.I = !0, gc(b, function (b) {
                a.send("timing", b)
            }))
        }
    };
    var hc = !1, mc = function (a) {
          if ("cookie" == P(a, ac)) {
              var b = P(a, U), c = nd(a), d = kc(P(a, Yb)), e = lc(P(a, W)), g = 1E3 * R(a, Zb), ca = P(a, Na);
              if ("auto" != e)zc(b, c, d, e, ca, g) && (hc = !0); else {
                  J(32);
                  var l;
                  a:{
                      c = [];
                      e = xa()[_split](".");
                      if (4 == e[_length] && (l = e[e[_length] - 1], parseInt(l, 10) == l)) {
                          l = ["none"];
                          break a
                      }
                      for (l = e[_length] - 2; 0 <= l; l--)c[_push](e[_slice](l)[_join]("."));
                      c[_push]("none");
                      l = c
                  }
                  for (var k = 0; k < l[_length]; k++)if (e = l[k], a[_data].set(W, e), c = nd(a), zc(b, c, d, e, ca, g)) {
                      hc = !0;
                      return
                  }
                  a[_data].set(W, "auto")
              }
          }
      }, nc = function (a) {
          if ("cookie" == P(a, ac) && !hc && (mc(a), !hc))throw"abort";
      },
      Yc = function (a) {
          if (a.get(Wc)) {
              var b = P(a, W), c = P(a, $b) || xa(), d = Xc("__utma", c, b);
              d && (J(19), a.set(Tc, (new Date)[_getTime](), !0), a.set(Rc, d.R), (b = Xc("__utmz", c, b)) && d[_hash] == b[_hash] && a.set(Sc, b.R))
          }
      }, nd = function (a) {
          var b = Cc(P(a, Q)), c = ic(P(a, W));
          a = jc(P(a, Yb));
          1 < a && (c += "-" + a);
          return ["GA1", c, b][_join](".")
      }, Gc = function (a, b, c) {
          for (var d = [], e = [], g, ca = 0; ca < a[_length]; ca++) {
              var l = a[ca];
              if (l.r[c] == b)d[_push](l); else void 0 == g || l.r[c] < g ? (e = [l], g = l.r[c]) : l.r[c] == g && e[_push](l)
          }
          return 0 < d[_length] ? d : e
      }, lc = function (a) {
          return 0 == a[_indexOf](".") ? a.substr(1) :
            a
      }, ic = function (a) {
          return lc(a)[_split](".")[_length]
      }, kc = function (a) {
          if (!a)return "/";
          1 < a[_length] && a.lastIndexOf("/") == a[_length] - 1 && (a = a.substr(0, a[_length] - 1));
          0 != a[_indexOf]("/") && (a = "/" + a);
          return a
      }, jc = function (a) {
          a = kc(a);
          return "/" == a ? 1 : a[_split]("/")[_length]
      };

    function Xc(a, b, c) {
        "none" == b && (b = "");
        var d = [], e = Ca(a);
        a = "__utma" == a ? 6 : 2;
        for (var g = 0; g < e[_length]; g++) {
            var ca = ("" + e[g])[_split](".");
            ca[_length] >= a && d[_push]({hash: ca[0], R: e[g], win: ca})
        }
        return 0 == d[_length] ? void 0 : 1 == d[_length] ? d[0] : Zc(b, d) || Zc(c, d) || Zc(null, d) || d[0]
    }

    function Zc(a, b) {
        var c, d;
        null == a ? c = d = 1 : (c = La(a), d = La(startWith(a, ".") ? a[_substring](1) : "." + a));
        for (var e = 0; e < b[_length]; e++)if (b[e][_hash] == c || b[e][_hash] == d)return b[e]
    };
    var od = new RegExp(/^https?:\/\/([^\/:]+)/), pd = /(.*)([?&#])(?:_ga=[^&#]*)(?:&?)(.*)/;

    function Bc(a) {
        a = a.get(Q);
        var b = Ic(a, 0);
        return "_ga=1." + K(b + "." + a)
    }

    function Ic(a, b) {
        for (var c = new Date, d = win[_navigator], e = d.plugins || [], c = [a, d.userAgent, c.getTimezoneOffset(), c.getYear(), c.getDate(), c.getHours(), c.getMinutes() + b], d = 0; d < e[_length]; ++d)c[_push](e[d].description);
        return La(c[_join]("."))
    }

    var Dc = function (a) {
        J(48);
        this.target = a;
        this.T = !1
    };
    Dc[_prototype].Q = function (a, b) {
        if (a.tagName) {
            if ("a" == a.tagName[_toLowerCase]()) {
                a[_href] && setHref(a, qd(this, a[_href], b));
                return
            }
            if ("form" == a.tagName[_toLowerCase]())return rd(this, a)
        }
        if ("string" == typeof a)return qd(this, a, b)
    };
    var qd = function (a, b, c) {
        var d = pd.exec(b);
        d && 3 <= d[_length] && (b = d[1] + (d[3] ? d[2] + d[3] : ""));
        a = a[_target].get("linkerParam");
        var e = b[_indexOf]("?"), d = b[_indexOf]("#");
        c ? b += (-1 == d ? "#" : "&") + a : (c = -1 == e ? "?" : "&", b = -1 == d ? b + (c + a) : b[_substring](0, d) + c + a + b[_substring](d));
        return b
    }, rd = function (a, b) {
        if (b && b[_action]) {
            var c = a[_target].get("linkerParam")[_split]("=")[1];
            if ("get" == b.method[_toLowerCase]()) {
                for (var d = b.childNodes || [], e = 0; e < d[_length]; e++)if ("_ga" == d[e][[_name]]) {
                    d[e][_setAttribute]("value", c);
                    return
                }
                d = doc[_createElement]("input");
                d[_setAttribute]("type", "hidden");
                d[_setAttribute]("name", "_ga");
                d[_setAttribute]("value", c);
                b.appendChild(d)
            } else"post" ==
            b.method[_toLowerCase]() && (b.action = qd(a, b[_action]))
        }
    };
    Dc[_prototype].S = function (a, b, c) {
        function d(c) {
            try {
                c = c || win.event;
                var d;
                a:{
                    var g = c[_target] || c.srcElement;
                    for (c = 100; g && 0 < c;) {
                        if (g[_href] && g.nodeName[_match](/^a(?:rea)?$/i)) {
                            d = g;
                            break a
                        }
                        g = g.parentNode;
                        c--
                    }
                    d = {}
                }
                ("http:" == d[_protocol] || "https:" == d[_protocol]) && sd(a, d[_hostname] || "") && d[_href] && setHref(d, qd(e, d[_href], b))
            } catch (w) {
                J(26)
            }
        }

        var e = this;
        this.T || (this.T = !0, L(doc, "mousedown", d, !1), L(doc, "touchstart", d, !1), L(doc, "keyup", d, !1));
        if (c) {
            c = function (b) {
                b = b || win.event;
                if ((b = b[_target] || b.srcElement) && b[_action]) {
                    var c = b[_action][_match](od);
                    c && sd(a, c[1]) && rd(e, b)
                }
            };
            for (var g = 0; g < doc.forms[_length]; g++)L(doc.forms[g],
              "submit", c)
        }
    };
    function sd(a, b) {
        if (b == doc[_location][_hostname])return !1;
        for (var c = 0; c < a[_length]; c++)if (a[c]instanceof RegExp) {
            if (a[c][_test](b))return !0
        } else if (0 <= b[_indexOf](a[c]))return !0;
        return !1
    };
    var Jd = function (a, b, c, d) {
        this.U = b;
        this.aa = c;
        (b = d) || (b = (b = P(a, V)) && "t0" != b ? Wd[_test](b) ? "_gat_" + Cc(P(a, Na)) : "_gat_" + Cc(b) : "_gat");
        this.Y = b
    }, Rd = function (a, b) {
        var c = b.get(Wb);
        b.set(Wb, function (b) {
            Pd(a, b);
            var d = c(b);
            Qd(a, b);
            return d
        });
        var d = b.get(Xb);
        b.set(Xb, function (b) {
            var c = d(b);
            Id(a, b);
            return c
        })
    }, Pd = function (a, b) {
        b.get(a.U) || ("1" == Ca(a.Y)[0] ? b.set(a.U, "", !0) : b.set(a.U, "" + fe(), !0))
    }, Qd = function (a, b) {
        b.get(a.U) && zc(a.Y, "1", b.get(Yb), b.get(W), b.get(Na), 6E5)
    }, Id = function (a, b) {
        if (b.get(a.U)) {
            var c = new ee,
              d = function (a) {
                  $a(a).p && c.set($a(a).p, b.get(a))
              };
            d(hb);
            d(ib);
            d(Na);
            d(Q);
            d(a.U);
            c.set($a(ld).p, Td(b));
            var e = a.aa;
            c.map(function (a, b) {
                e += K(a) + "=";
                e += K("" + b) + "&"
            });
            e += "z=" + fe();
            sendBeacon(e);
            b.set(a.U, "", !0)
        }
    }, Wd = /^gtm\d+$/;
    var fd = function (a, b) {
        var c = a.b;
        if (!c.get("dcLoaded")) {
            Nd(c, 29);
            b = b || {};
            var d;
            b[U] && (d = Cc(b[U]));
            d = new Jd(c, ed, "https://stats.g.doubleclick.net/collect?t=dc&aip=1&", d);
            Rd(d, c);
            c.set("dcLoaded", !0)
        }
    };
    var Sd = function (a) {
        var b;
        b = a.get("dcLoaded") ? !1 : "cookie" != a.get(ac) ? !1 : !0;
        b && (Nd(a, 51), b = new Jd(a, ed), Pd(b, a), Qd(b, a), a.get(b.U) && (a.set(Md, 1, !0), a.set(gd, oc() + "/r/collect", !0)))
    };
    var Kd = function (a, b) {
        var c = a.b;
        if (!c.get("_rlsaLoaded")) {
            Nd(c, 38);
            b = b || {};
            if (b[U])var d = Cc(b[U]);
            d = new Jd(c, Hd, "https://www.google.com/ads/ga-audiences?t=sr&aip=1&", d);
            Rd(d, c);
            c.set("_rlsaLoaded", !0);
            tc("displayfeatures", a, b)
        }
    };
    var Lc = function () {
        var a = win.gaGlobal = win.gaGlobal || {};
        return a.hid = a.hid || fe()
    };
    var ad, bd = function (a, b, c) {
        if (!ad) {
            var d;
            d = doc[_location][_hash];
            var e = win[_name], g = /^#?gaso=([^&]*)/;
            if (e = (d = (d = d && d[_match](g) || e && e[_match](g)) ? d[1] : Ca("GASO")[0] || "") && d[_match](/^(?:!([-0-9a-z.]{1,40})!)?([-.\w]{10,1200})$/i))zc("GASO", "" + d, c, b, a, 0), f._udo || (f._udo = b), f._utcp || (f._utcp = c), a = e[1], insertScript("https://www.google.com/analytics/web/inpage/pub/inpage.js?" + (a ? "prefix=" + a + "&" : "") + fe(), "_gasojs");
            ad = !0
        }
    };
    var SiteIdReg = /^(UA|YT|MO|GP)-(\d+)-(\d+)$/,
      pc = function (a) {
        function b(a, b) {
            d.b[_data].set(a, b)
        }

        function c(a, c) {
            b(a, c);
            d.filters.add(a)
        }

        var d = this;
        this.b = new Ya;
        this.filters = new Ha;
        b(V, a[V]);
        b(Na, trim(a[Na]));
        b(U, a[U]);
        b(W, a[W] || xa());
        b(Yb, a[Yb]);
        b(Zb, a[Zb]);
        b($b, a[$b]);
        b(Wc, a[Wc]);
        b(bc, a[bc]);
        b(cc, a[cc]);
        b(Ka, a[Ka]);
        b(dc, a[dc]);
        b(ec, a[ec]);
        b(ac, a[ac]);
        b(Ad, a[Ad]);
        b(hb, 1);
        b(ib, "j35");
        c(Qb, Ma);
        c(dd, cd);
        c(Rb, Oa);
        c(md, vb);
        c(Sb, nc);
        c(Uc, Yc);
        c(Tb, Ja);
        c(Vb, Ta);
        c(Vc, Hc);
        c(zd, yd);
        c(Ld, Sd);
        c(Wb, Pa);
        c(Xb, Sa);
        c(Cd, Fd(this));
        Jc(this.b, a[Q]);
        Kc(this.b);
        this.b.set(jb, Lc());
        bd(this.b.get(Na), this.b.get(W), this.b.get(Yb))
    }, Jc = function (a, b) {
        if ("cookie" == P(a, ac)) {
            hc = !1;
            var c;
            b:{
                var d = Ca(P(a, U));
                if (d && !(1 > d[_length])) {
                    c = [];
                    for (var e = 0; e < d[_length]; e++) {
                        var g;
                        g = d[e][_split](".");
                        var ca = g.shift();
                        ("GA1" == ca || "1" == ca) && 1 < g[_length] ? (ca = g.shift()[_split]("-"), 1 == ca[_length] && (ca[1] = "1"), ca[0] *= 1, ca[1] *= 1, g = {
                            r: ca,
                            s: g[_join](".")
                        }) : g = void 0;
                        g && c[_push](g)
                    }
                    if (1 == c[_length]) {
                        J(13);
                        c = c[0].s;
                        break b
                    }
                    if (0 == c[_length])J(12); else {
                        J(14);
                        d = ic(P(a, W));
                        c = Gc(c, d, 0);
                        if (1 == c[_length]) {
                            c = c[0].s;
                            break b
                        }
                        d =
                          jc(P(a, Yb));
                        c = Gc(c, d, 1);
                        c = c[0] && c[0].s;
                        break b
                    }
                }
                c = void 0
            }
            c || (c = P(a, W), d = P(a, $b) || xa(), c = Xc("__utma", d, c), void 0 != c ? (J(10), c = c.win[1] + "." + c.win[2]) : c = void 0);
            c && (a[_data].set(Q, c), hc = !0)
        }
        c = a.get(cc);
        if (e = (c = doc[_location][c ? "href" : "search"][_match]("(?:&|#|\\?)" + K("_ga")[_replace](/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1") + "=([^&#]*)")) && 2 == c[_length] ? c[1] : "")a.get(bc) ? (c = e[_indexOf]("."), -1 == c ? J(22) : (d = e[_substring](c + 1), "1" != e[_substring](0, c) ? J(22) : (c = d[_indexOf]("."), -1 == c ? J(22) : (e = d[_substring](0, c), c = d[_substring](c + 1), e != Ic(c, 0) && e != Ic(c, -1) && e != Ic(c, -2) ? J(23) : (J(11), a[_data].set(Q,
          c)))))) : J(21);
        b && (J(9), a[_data].set(Q, K(b)));
        a.get(Q) || ((c = (c = win.gaGlobal && win.gaGlobal.vid) && -1 != c[_search](/^(?:utma\.)?\d+\.\d+$/) ? c : void 0) ? (J(17), a[_data].set(Q, c)) : (J(8), a[_data].set(Q, [fe() ^ Mc() & 2147483647, _Math.round((new Date)[_getTime]() / 1E3)][_join]("."))));
        mc(a)
    }, Kc = function (a) {
        var b = win[_navigator], c = win.screen, d = doc[_location];
        a.set(lb, ya(a.get(ec)));
        if (d) {
            var e = d.pathname || "";
            "/" != e.charAt(0) && (J(31), e = "/" + e);
            a.set(kb, d[_protocol] + "//" + d[_hostname] + e + d[_search])
        }
        c && a.set(qb, c.width + "x" + c.height);
        c && a.set(pb, c.colorDepth + "-bit");
        var c = doc.documentElement, g = (e =
            doc.body) && e[_clientWidth] && e[_clientHeight], ca = [];
        c && c[_clientWidth] && c[_clientHeight] && ("CSS1Compat" === doc.compatMode || !g) ? ca = [c[_clientWidth], c[_clientHeight]] : g && (ca = [e[_clientWidth], e[_clientHeight]]);
        c = 0 >= ca[0] || 0 >= ca[1] ? "" : ca[_join]("x");
        a.set(rb, c);
        a.set(tb, fc());
        a.set(ob, doc.characterSet || doc.charset);
        a.set(sb, b && "function" === typeof b.javaEnabled && b.javaEnabled() || !1);
        a.set(nb, (b && (b.language || b.browserLanguage) || "")[_toLowerCase]());
        if (d && a.get(cc) && (b = doc[_location][_hash])) {
            b = b[_split](/[?&#]+/);
            d = [];
            for (c = 0; c < b[_length]; ++c)(startWith(b[c], "utm_id") || startWith(b[c], "utm_campaign") || startWith(b[c], "utm_source") || startWith(b[c], "utm_medium") || startWith(b[c],
              "utm_term") || startWith(b[c], "utm_content") || startWith(b[c], "gclid") || startWith(b[c], "dclid") || startWith(b[c], "gclsrc")) && d[_push](b[c]);
            0 < d[_length] && (b = "#" + d[_join]("&"), a.set(kb, a.get(kb) + b))
        }
    };
    pc[_prototype].get = function (a) {
        return this.b.get(a)
    };
    pc[_prototype].set = function (a, b) {
        this.b.set(a, b)
    };
    var qc = {
        pageview: [mb],
        event: [ub, xb, yb, zb],
        social: [Bb, Cb, Db],
        timing: [Mb, Nb, Pb, Ob]
    };

    pc[_prototype].send = function (a) {
        if (!(1 > arguments[_length])) {
            var b, c;
            "string" === typeof arguments[0] ? (b = arguments[0], c = [][_slice][_call](arguments, 1)) : (b = arguments[0] && arguments[0][Va], c = arguments);
            b && (c = za(qc[b] || [], c), c[Va] = b, this.b.set(c, void 0, !0), this.filters.startWith(this.b), this.b[_data].m = {}, je(this.b))
        }
    };
    var rc = function (a) {
        if ("prerender" == doc.visibilityState)return !1;
        a();
        return !0
    };
    var td = /^(?:(\w+)\.)?(?:(\w+):)?(\w+)$/, sc = function (a) {
        if (isFunction(a[0]))this.u = a[0]; else {
            var b = td.exec(a[0]);
            null != b && 4 == b[_length] && (this.c = b[1] || "t0", this.e = b[2] || "", this.d = b[3], this.a = [][_slice][_call](a, 1), this.e || (this.A = "create" == this.d, this.i = "require" == this.d, this.g = "provide" == this.d, this.ba = "remove" == this.d), this.i && (3 <= this.a[_length] ? (this.X = this.a[1], this.W = this.a[2]) : this.a[1] && (isString(this.a[1]) ? this.X = this.a[1] : this.W = this.a[1])));
            b = a[1];
            a = a[2];
            if (!this.d)throw"abort";
            if (this.i && (!isString(b) || "" == b))throw"abort";
            if (this.g &&
              (!isString(b) || "" == b || !isFunction(a)))throw"abort";
            if (ud(this.c) || ud(this.e))throw"abort";
            if (this.g && "t0" != this.c)throw"abort";
        }
    };

    function ud(a) {
        return 0 <= a[_indexOf](".") || 0 <= a[_indexOf](":")
    }
    var Yd, Zd, $d;
    Yd = new ee;
    $d = new ee;
    Zd = {ec: 45, ecommerce: 46, linkid: 47};
    var tc = function (a, b, c) {
        b == N || b.get(V);
        var d = Yd.get(a);
        if (!isFunction(d))return !1;
        b.plugins_ = b.plugins_ || new ee;
        if (b.plugins_.get(a))return !0;
        b.plugins_.set(a, new d(b, c || {}));
        return !0
    }, ae = function (a) {
        function b(a) {
            var b = (a[_hostname] || "")[_split](":")[0][_toLowerCase](), c = (a[_protocol] || "")[_toLowerCase](), c = 1 * a[_port] || ("http:" == c ? 80 : "https:" == c ? 443 : "");
            a = a.pathname || "";
            startWith(a, "/") || (a = "/" + a);
            return [b, "" + c, a]
        }

        var c = doc[_createElement]("a");
        setHref(c, doc[_location][_href]);
        var d = (c[_protocol] || "")[_toLowerCase](), e = b(c), g = c[_search] || "", ca = d + "//" + e[0] + (e[1] ? ":" + e[1] : "");
        startWith(a, "//") ? a = d + a : startWith(a, "/") ? a = ca + a : !a || startWith(a,
          "?") ? a = ca + e[2] + (a || g) : 0 > a[_split]("/")[0][_indexOf](":") && (a = ca + e[2][_substring](0, e[2].lastIndexOf("/")) + "/" + a);
        setHref(c, a);
        d = b(c);
        return {protocol: (c[_protocol] || "")[_toLowerCase](), host: d[0], port: d[1], path: d[2], G: c[_search] || "", url: a || ""}
    };
    var Z = {
        ga: function () {
            Z.f = []
        }
    };
    Z.ga();
    Z.D = function (a) {
        var b = Z.J[_apply](Z, arguments), b = Z.f.concat(b);
        for (Z.f = []; 0 < b[_length] && !Z.v(b[0]) && !(b.shift(), 0 < Z.f[_length]););
        Z.f = Z.f.concat(b)
    };
    Z.J = function (a) {
        for (var b = [], c = 0; c < arguments[_length]; c++)try {
            var d = new sc(arguments[c]);
            if (d.g)Yd.set(d.a[0], d.a[1]); else {
                if (d.i) {
                    var e = d, g = e.a[0];
                    if (!isFunction(Yd.get(g)) && !$d.get(g)) {
                        Zd[_hasOwnProperty](g) && J(Zd[g]);
                        var ca = e.X;
                        !ca && Zd[_hasOwnProperty](g) ? (J(39), ca = g + ".js") : J(43);
                        if (ca) {
                            ca && 0 <= ca[_indexOf]("/") || (ca = (Ba || isSSL() ? "https:" : "http:") + "//www.google-analytics.com/plugins/ua/" + ca);
                            var l = ae(ca), e = void 0;
                            var k = l[_protocol], w = doc[_location][_protocol], e = "https:" == k || k == w ? !0 : "http:" != k ? !1 : "http:" == w;
                            var Xd;
                            if (Xd = e) {
                                var e = l, be = ae(doc[_location][_href]);
                                if (e.G || 0 <= e.url[_indexOf]("?") ||
                                  0 <= e.path[_indexOf]("://"))Xd = !1; else if (e.host == be.host && e[_port] == be[_port])Xd = !0; else {
                                    var ce = "http:" == e[_protocol] ? 80 : 443;
                                    Xd = "www.google-analytics.com" == e.host && (e[_port] || ce) == ce && startWith(e.path, "/plugins/") ? !0 : !1
                                }
                            }
                            Xd && (insertScript(l.url), $d.set(g, !0))
                        }
                    }
                }
                b[_push](d)
            }
        } catch (de) {
        }
        return b
    };
    Z.v = function (a) {
        try {
            if (a.u)a.u[_call](win, N.j("t0")); else {
                var b = a.c == GANameSpace ? N : N.j(a.c);
                if (a.A)"t0" == a.c && N.create[_apply](N, a.a); else if (a.ba)N.remove(a.c); else if (b)if (a.i) {
                    if (!tc(a.a[0], b, a.W))return !0
                } else if (a.e) {
                    var c = a.d, d = a.a, e = b.plugins_.get(a.e);
                    e[c][_apply](e, d)
                } else b[a.d][_apply](b, a.a)
            }
        } catch (g) {
        }
    };
    var N = function (a) {
        J(1);
        Z.D[_apply](Z, [arguments])
    };
    N.h = {};
    N.P = [];
    N.L = 0;
    N.answer = 42;
    var uc = [Na, W, V];
    N.create = function (a) {
        var b = za(uc, [][_slice][_call](arguments));
        b[V] || (b[V] = "t0");
        var c = "" + b[V];
        if (N.h[c])return N.h[c];
        b = new pc(b);
        N.h[c] = b;
        N.P[_push](b);
        return b
    };
    N.remove = function (a) {
        for (var b = 0; b < N.P[_length]; b++)if (N.P[b].get(V) == a) {
            N.P.splice(b, 1);
            N.h[a] = null;
            break
        }
    };
    N.j = function (a) {
        return N.h[a]
    };
    N.getAll = function () {
        return N.P[_slice](0)
    };
    N.N = function () {
        "ga" != GANameSpace && J(49);
        var a = win[GANameSpace];
        if (!a || 42 != a.answer) {
            N.L = a && a.l;
            N.loaded = !0;
            var b = win[GANameSpace] = N;
            X("create", b, b.create);
            X("remove", b, b.remove);
            X("getByName", b,
              b.j, 5);
            X("getAll", b, b.getAll, 6);
            b = pc[_prototype];
            X("get", b, b.get, 7);
            X("set", b, b.set, 4);
            X("send", b, b.send);
            b = Ya[_prototype];
            X("get", b, b.get);
            X("set", b, b.set);
            if (!isSSL() && !Ba) {
                a:{
                    for (var b = doc.getElementsByTagName("script"), c = 0; c < b[_length] && 100 > c; c++) {
                        var d = b[c].src;
                        if (d && 0 == d[_indexOf]("https://www.google-analytics.com/analytics")) {
                            J(33);
                            b = !0;
                            break a
                        }
                    }
                    b = !1
                }
                b && (Ba = !0)
            }
            isSSL() || Ba || !Ed(new Od) || (J(36), Ba = !0);
            (win.gaplugins = win.gaplugins || {}).Linker = Dc;
            b = Dc[_prototype];
            Yd.set("linker", Dc);
            X("decorate", b, b.Q, 20);
            X("autoLink", b, b.S, 25);
            Yd.set("displayfeatures", fd);
            Yd.set("adfeatures", Kd);
            a = a && a.q;
            isArray(a) ? Z.D[_apply](N, a) : J(50)
        }
    };
    N.k = function () {
        for (var a = N.getAll(), b = 0; b < a[_length]; b++)a[b].get(V)
    };
    (function () {
        var a = N.N;
        if (!rc(a)) {
            J(16);
            var b = !1, c = function () {
                if (!b && rc(a)) {
                    b = !0;
                    var d = c, e = doc;
                    e.removeEventListener ? e.removeEventListener("visibilitychange", d, !1) : e.detachEvent && e.detachEvent("onvisibilitychange", d)
                }
            };
            L(doc, "visibilitychange", c)
        }
    })();

    function La(a) {
        var b = 1, c = 0, d;
        if (a)for (b = 0, d = a[_length] - 1; 0 <= d; d--)c = a.charCodeAt(d), b = (b << 6 & 268435455) + c + (c << 14), c = b & 266338304, b = 0 != c ? b ^ c >> 21 : b;
        return b
    }
})(window);
