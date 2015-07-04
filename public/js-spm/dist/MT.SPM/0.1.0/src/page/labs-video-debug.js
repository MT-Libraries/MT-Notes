define("MT.SPM/0.1.0/src/page/labs-video-debug", [], function(require, exports, module){
/**
 * Created by thonatos on 14/12/16.
 */

var init = function () {

    var public = require("MT.SPM/0.1.0/src/page/public-debug");
    public.init();

    console.log('Live Page');

    var SOURCE = 'http://media.html5media.info/video.mp4';
    var html5Player = require("MT.SPM/0.1.0/src/components/html5-player-debug").create(
        $('.video-section'),
        $('.video-section video'),
        document.getElementById("html5-video"),
        {
            videoUrl: SOURCE,
            display: {
                all:true,
                playControl: true,
                muteControl: true,
                fullScreenControl: true,
                seekControl: true,
                volumeControl: true
            },
            control: {
                autoplay:true,
                preload:true,
                loop:true,
                progress: false,
                volume: false
            }
        }

    );
    html5Player.init();
    html5Player.resume();

    var updateBrowser = require("MT.SPM/0.1.0/src/components/update-browser-debug").create('',false);

    updateBrowser.init();
};



exports.init = init;
});
define("MT.SPM/0.1.0/src/page/public-debug", [], function(require, exports, module){
/**
 * Created by thonatos on 15/1/18.
 */

exports.init = function () {

    var updateBrowser = require("MT.SPM/0.1.0/src/components/update-browser-debug").create('',false);
    updateBrowser.init();

    var toggleNav = require("MT.SPM/0.1.0/src/components/toggle-nav-debug").create($('.nav-ul-toggle a'),$('.nav-ul'));
    toggleNav.init();

    var wechat = require("MT.SPM/0.1.0/src/components/wechat-debug").create();
    wechat.init();

};
});
define("MT.SPM/0.1.0/src/components/update-browser-debug", [], function(require, exports, module){
/**
 * Created by thonatos on 15/1/16.
 */


var updateBrowser = {

    create: function (options, test) {
        
        var _protected = {};

        var obj = {};

        obj.options = options || {};

        obj.options.versionRequied = {i: 10, f: 23, o: 12, s: 6.2, n: 12, c: 28};
        obj.options.versionDefault = {i: 9, f: 23, o: 12, s: 6.2, n: 12, c: 28};
        obj.options.versionMinimal = {i: 9, f: 23, o: 12, s: 6.2, n: 12, c: 28};

        obj.options.version = options.version || obj.options.versionDefault;

        // Options

        var _navigator = window.navigator, _browser;

        _protected.init = function () {

            // Loop
            for (_browser in obj.options.versionRequied) {
                if (obj.options.version[_browser] >= obj.options.versionRequied[_browser])
                    obj.options.version[_browser] = obj.options.version[_browser] - 0.2;
                if (!obj.options.version[_browser])
                    obj.options.version[_browser] = obj.options.versionDefault[_browser];
                if (obj.options.version[_browser] < obj.options.versionMinimal[_browser])
                    obj.options.version[_browser] = obj.options.versionMinimal[_browser];
            }

            obj.options.test = test || options.test || false;

            if (window.location.hash == "#test-bu") {
                obj.options.test = true;
            }

        };

        _protected.getBrowser = function () {

            var n, v, t, ua = navigator.userAgent;
            var names = {
                i: 'Internet Explorer',
                f: 'Firefox',
                o: 'Opera',
                s: 'Apple Safari',
                n: 'Netscape Navigator',
                c: "Chrome",
                x: "Other"
            };
            if (/bot|googlebot|facebook|slurp|wii|silk|blackberry|mediapartners|adsbot|silk|android|phone|bingbot|google web preview|like firefox|chromeframe|seamonkey|opera mini|min|meego|netfront|moblin|maemo|arora|camino|flot|k-meleon|fennec|kazehakase|galeon|android|mobile|iphone|ipod|ipad|epiphany|rekonq|symbian|webos/i.test(ua)) n = "x";
            else if (/Trident.*rv:(\d+\.\d+)/i.test(ua)) n = "i";
            else if (/Trident.(\d+\.\d+)/i.test(ua)) n = "io";
            else if (/MSIE.(\d+\.\d+)/i.test(ua)) n = "i";
            else if (/OPR.(\d+\.\d+)/i.test(ua)) n = "o";
            else if (/Chrome.(\d+\.\d+)/i.test(ua)) n = "c";
            else if (/Firefox.(\d+\.\d+)/i.test(ua)) n = "f";
            else if (/Version.(\d+.\d+).{0,10}Safari/i.test(ua))    n = "s";
            else if (/Safari.(\d+)/i.test(ua)) n = "so";
            else if (/Opera.*Version.(\d+\.\d+)/i.test(ua)) n = "o";
            else if (/Opera.(\d+\.?\d+)/i.test(ua)) n = "o";
            else if (/Netscape.(\d+)/i.test(ua)) n = "n";
            else return {n: "x", v: 0, t: names[n]};

            //do not notify ver old systems since their is no up-to-date browser available
            if (/windows.nt.5.0|windows.nt.4.0|windows.98|os x 10.4|os x 10.5|os x 10.3|os x 10.2/.test(ua)) n = "x";

            //do not notify firefox ESR
            if (n == "f" && v == 24)
                n = "x";
            //do not notify opera 12 on linux since it is the latest version
            if (/linux|x11|unix|bsd/.test(ua) && n == "o" && v > 12)
                n = "x";

            if (n == "x") return {n: "x", v: 0, t: names[n]};

            v = new Number(RegExp.$1);
            if (n == "so") {
                v = ((v < 100) && 1.0) || ((v < 130) && 1.2) || ((v < 320) && 1.3) || ((v < 520) && 2.0) || ((v < 524) && 3.0) || ((v < 526) && 3.2) || 4.0;
                n = "s";
            }
            if (n == "i" && v == 7 && window.XDomainRequest) {
                v = 8;
            }
            if (n == "io") {
                n = "i";
                if (v > 6) v = 11;
                else if (v > 5) v = 10;
                else if (v > 4) v = 9;
                else if (v > 3.1) v = 8;
                else if (v > 3) v = 7;
                else v = 9;
            }
            return {n: n, v: v, t: names[n] + " " + v};
        };

        _protected.generateInfo = function () {

            // Div

            var _PixRatio = (window.devicePixelRatio > 1)?2:1;

            var div = document.createElement("div");
            obj.options.div = div;

            div.id = "update-browser";
            div.className = "update-browser";

            var _rawHTML = '\
                    <div class="update-browser-box">\
                        <div class="update-browser-icon"><img src="/public/images/icons/'+_PixRatio+'x/icon-update-browser.png'+'" alt=""></div>\
                        <div class="update-browser-info"><p>马上升级您的浏览器，获得更流畅的访问体验</p></div>\
                        <div class="update-browser-action"><a href="/labs/update-browser">免费更新</a></div>\
                    </div>\
                    <div class="update-browser-close"><a id="update-browser-button-close" href="#">残忍拒绝</a></div></div>';

            div.innerHTML = options.div || _rawHTML;

            // Style
            var sheet = document.createElement("style");

            var _rawCSS =  '.update-browser {position: fixed;top: 0;left: 0;padding: 14px 0;width: 100%;display: table;background: #f4f4f4;box-shadow: 0 0 4px #000000;z-index: 9999;}\
.update-browser-box{margin: 0 auto;width: 600px;}\
.update-browser-box:before{content: \' \';display: table;}\
.update-browser-box:after{content: \' \';clear: both;display: table;}\
.update-browser-icon,.update-browser-info,.update-browser-action {display: inline-block;float: left;}\
.update-browser-icon img{width: 28px;vertical-align: middle;}\
.update-browser-info p{margin: 10px;display: block;font-size: 16px;color: #505050;}\
.update-browser-action a{padding: 10px 0;display: block;font-size: 16px;color: #2732c9;}\
.update-browser-close{position: absolute;top: 14px;right: 23px;}\
.update-browser-close a{display: block;text-decoration: none;font-size: 12px;color: #858689;}';

            var style = options.style || _rawCSS;

            // Insert
            document.body.insertBefore(div, document.body.firstChild);
            document.getElementsByTagName("head")[0].appendChild(sheet);

            // Append
            try {
                sheet.innerText = style;
                sheet.innerHTML = style;
            }
            catch (e) {
                try {
                    sheet.styleSheet.cssText = style;
                }
                catch (e) {
                    return;
                }
            }

            document.getElementById('update-browser-button-close').onclick = function (e) {
                e.preventDefault();

                obj.options.div.style.display = "none";

            }
        };

        _protected.appendInfo = function () {

            // GetBrowser
            obj.options.browser = _protected.getBrowser();

            // Detect
            if (!obj.options.test && (!obj.options.browser || !obj.options.browser.n || obj.options.browser.n == "x" || obj.options.browser.v > obj.options.version[obj.options.browser.n])){
                return;
            }

            _protected.generateInfo();
            
        };


        obj.init = function () {
            _protected.init();

            _protected.appendInfo();
        };

        return obj;

    }
};

exports.create = updateBrowser.create;

});
define("MT.SPM/0.1.0/src/components/toggle-nav-debug", [], function(require, exports, module){
/**
 * Created by thonatos on 15/1/18.
 */


var toggleNav = {
    create: function ($toggle, $container) {

        var obj = {};

        var active = false;

        obj.init = function () {

            $toggle.click(function (e) {


                if(active){
                    $container.fadeOut();
                }else{
                    $container.fadeIn();
                }

                active = !active;

                return false;
            });
        };

        return obj;
    }
};

exports.create = toggleNav.create;


});
define("MT.SPM/0.1.0/src/components/wechat-debug", [], function(require, exports, module){
/**
 * Created by thonatos on 15/7/4.
 */

var wx = require("MT.SPM/0.1.0/src/utils/jweixin-1.0.0-debug");

var Wechat = {

    create : function(bundleInterface, bundleProtected){
        var obj = {};

        var _interface = bundleInterface || {};
        var _protected = bundleProtected || {};

        _protected.init = function(options){

            var _options = options || {} ;

            wx.config({
                debug: true,
                appId: _options.appId,
                timestamp: _options.timestamp,
                nonceStr: _options.nonceStr,
                signature: _options.signature ,
                jsApiList: []
            });

            wx.ready(function(){
                console.log('ready');
            });


            wx.error(function (res) {
                alert(res.errMsg);
            });

        };


        _protected.getSignature = function(token){

            $.get('/api/wechat/signature/gen?access_token='+token ,function(data) {

                if(data && data.code === 200){

                    console.log(data);

                    _protected.init(data.data);

                }else{
                    console.log('err');
                }
            });
        };

        _protected.getToken = function(){

            $.get('/api/wechat/token/get',function(data) {

                if(data && data.code === 200){

                    console.log(data);

                    var _access_token = data.data.access_token;


                    _protected.getSignature(_access_token);

                }else{
                    console.log('err');
                }
            });

        };
        
        obj.init = function () {

            _protected.getToken();
        };

        return obj;
    }
};

exports.create = Wechat.create;
});
define("MT.SPM/0.1.0/src/utils/jweixin-1.0.0-debug", [], function(require, exports, module){
! function(a, b) {
    "function" == typeof define && (define.amd || define.cmd) ? define(function() {
        return b(a)
    }) : b(a, !0)
}(this, function(a, b) {
    function c(b, c, d) {
        a.WeixinJSBridge ? WeixinJSBridge.invoke(b, e(c), function(a) {
            g(b, a, d)
        }) : j(b, d)
    }

    function d(b, c, d) {
        a.WeixinJSBridge ? WeixinJSBridge.on(b, function(a) {
            d && d.trigger && d.trigger(a), g(b, a, c)
        }) : d ? j(b, d) : j(b, c)
    }

    function e(a) {
        return a = a || {}, a.appId = z.appId, a.verifyAppId = z.appId, a.verifySignType = "sha1", a.verifyTimestamp = z.timestamp + "", a.verifyNonceStr = z.nonceStr, a.verifySignature = z.signature, a
    }

    function f(a) {
        return {
            timeStamp: a.timestamp + "",
            nonceStr: a.nonceStr,
            "package": a.package,
            paySign: a.paySign,
            signType: a.signType || "SHA1"
        }
    }

    function g(a, b, c) {
        var d, e, f;
        switch (delete b.err_code, delete b.err_desc, delete b.err_detail, d = b.errMsg, d || (d = b.err_msg, delete b.err_msg, d = h(a, d, c), b.errMsg = d), c = c || {}, c._complete && (c._complete(b), delete c._complete), d = b.errMsg || "", z.debug && !c.isInnerInvoke && alert(JSON.stringify(b)), e = d.indexOf(":"), f = d.substring(e + 1)) {
            case "ok":
                c.success && c.success(b);
                break;
            case "cancel":
                c.cancel && c.cancel(b);
                break;
            default:
                c.fail && c.fail(b)
        }
        c.complete && c.complete(b)
    }

    function h(a, b) {
        var d, e, f, g;
        if (b) {
            switch (d = b.indexOf(":"), a) {
                case o.config:
                    e = "config";
                    break;
                case o.openProductSpecificView:
                    e = "openProductSpecificView";
                    break;
                default:
                    e = b.substring(0, d), e = e.replace(/_/g, " "), e = e.replace(/\b\w+\b/g, function(a) {
                        return a.substring(0, 1).toUpperCase() + a.substring(1)
                    }), e = e.substring(0, 1).toLowerCase() + e.substring(1), e = e.replace(/ /g, ""), -1 != e.indexOf("Wcpay") && (e = e.replace("Wcpay", "WCPay")), f = p[e], f && (e = f)
            }
            g = b.substring(d + 1), "confirm" == g && (g = "ok"), "failed" == g && (g = "fail"), -1 != g.indexOf("failed_") && (g = g.substring(7)), -1 != g.indexOf("fail_") && (g = g.substring(5)), g = g.replace(/_/g, " "), g = g.toLowerCase(), ("access denied" == g || "no permission to execute" == g) && (g = "permission denied"), "config" == e && "function not exist" == g && (g = "ok"), b = e + ":" + g
        }
        return b
    }

    function i(a) {
        var b, c, d, e;
        if (a) {
            for (b = 0, c = a.length; c > b; ++b) d = a[b], e = o[d], e && (a[b] = e);
            return a
        }
    }

    function j(a, b) {
        if (!(!z.debug || b && b.isInnerInvoke)) {
            var c = p[a];
            c && (a = c), b && b._complete && delete b._complete, console.log('"' + a + '",', b || "")
        }
    }

    function k() {
        if (!("6.0.2" > w || y.systemType < 0)) {
            var b = new Image;
            y.appId = z.appId, y.initTime = x.initEndTime - x.initStartTime, y.preVerifyTime = x.preVerifyEndTime - x.preVerifyStartTime, C.getNetworkType({
                isInnerInvoke: !0,
                success: function(a) {
                    y.networkType = a.networkType;
                    var c = "https://open.weixin.qq.com/sdk/report?v=" + y.version + "&o=" + y.isPreVerifyOk + "&s=" + y.systemType + "&c=" + y.clientVersion + "&a=" + y.appId + "&n=" + y.networkType + "&i=" + y.initTime + "&p=" + y.preVerifyTime + "&u=" + y.url;
                    b.src = c
                }
            })
        }
    }

    function l() {
        return (new Date).getTime()
    }

    function m(b) {
        t && (a.WeixinJSBridge ? b() : q.addEventListener && q.addEventListener("WeixinJSBridgeReady", b, !1))
    }

    function n() {
        C.invoke || (C.invoke = function(b, c, d) {
            a.WeixinJSBridge && WeixinJSBridge.invoke(b, e(c), d)
        }, C.on = function(b, c) {
            a.WeixinJSBridge && WeixinJSBridge.on(b, c)
        })
    }
    var o, p, q, r, s, t, u, v, w, x, y, z, A, B, C;
    if (!a.jWeixin) return o = {
        config: "preVerifyJSAPI",
        onMenuShareTimeline: "menu:share:timeline",
        onMenuShareAppMessage: "menu:share:appmessage",
        onMenuShareQQ: "menu:share:qq",
        onMenuShareWeibo: "menu:share:weiboApp",
        onMenuShareQZone: "menu:share:QZone",
        previewImage: "imagePreview",
        getLocation: "geoLocation",
        openProductSpecificView: "openProductViewWithPid",
        addCard: "batchAddCard",
        openCard: "batchViewCard",
        chooseWXPay: "getBrandWCPayRequest"
    }, p = function() {
        var b, a = {};
        for (b in o) a[o[b]] = b;
        return a
    }(), q = a.document, r = q.title, s = navigator.userAgent.toLowerCase(), t = -1 != s.indexOf("micromessenger"), u = -1 != s.indexOf("android"), v = -1 != s.indexOf("iphone") || -1 != s.indexOf("ipad"), w = function() {
        var a = s.match(/micromessenger\/(\d+\.\d+\.\d+)/) || s.match(/micromessenger\/(\d+\.\d+)/);
        return a ? a[1] : ""
    }(), x = {
        initStartTime: l(),
        initEndTime: 0,
        preVerifyStartTime: 0,
        preVerifyEndTime: 0
    }, y = {
        version: 1,
        appId: "",
        initTime: 0,
        preVerifyTime: 0,
        networkType: "",
        isPreVerifyOk: 1,
        systemType: v ? 1 : u ? 2 : -1,
        clientVersion: w,
        url: encodeURIComponent(location.href)
    }, z = {}, A = {
        _completes: []
    }, B = {
        state: 0,
        res: {}
    }, m(function() {
        x.initEndTime = l()
    }), C = {
        config: function(a) {
            z = a, j("config", a);
            var b = z.check === !1 ? !1 : !0;
            m(function() {
                var a, d, e;
                if (b) c(o.config, {
                    verifyJsApiList: i(z.jsApiList)
                }, function() {
                    A._complete = function(a) {
                        x.preVerifyEndTime = l(), B.state = 1, B.res = a
                    }, A.success = function() {
                        y.isPreVerifyOk = 0
                    }, A.fail = function(a) {
                        A._fail ? A._fail(a) : B.state = -1
                    };
                    var a = A._completes;
                    return a.push(function() {
                        z.debug || k()
                    }), A.complete = function() {
                        for (var c = 0, d = a.length; d > c; ++c) a[c]();
                        A._completes = []
                    }, A
                }()), x.preVerifyStartTime = l();
                else {
                    for (B.state = 1, a = A._completes, d = 0, e = a.length; e > d; ++d) a[d]();
                    A._completes = []
                }
            }), z.beta && n()
        },
        ready: function(a) {
            0 != B.state ? a() : (A._completes.push(a), !t && z.debug && a())
        },
        error: function(a) {
            "6.0.2" > w || (-1 == B.state ? a(B.res) : A._fail = a)
        },
        checkJsApi: function(a) {
            var b = function(a) {
                var c, d, b = a.checkResult;
                for (c in b) d = p[c], d && (b[d] = b[c], delete b[c]);
                return a
            };
            c("checkJsApi", {
                jsApiList: i(a.jsApiList)
            }, function() {
                return a._complete = function(a) {
                    if (u) {
                        var c = a.checkResult;
                        c && (a.checkResult = JSON.parse(c))
                    }
                    a = b(a)
                }, a
            }())
        },
        onMenuShareTimeline: function(a) {
            d(o.onMenuShareTimeline, {
                complete: function() {
                    c("shareTimeline", {
                        title: a.title || r,
                        desc: a.title || r,
                        img_url: a.imgUrl || "",
                        link: a.link || location.href
                    }, a)
                }
            }, a)
        },
        onMenuShareAppMessage: function(a) {
            d(o.onMenuShareAppMessage, {
                complete: function() {
                    c("sendAppMessage", {
                        title: a.title || r,
                        desc: a.desc || "",
                        link: a.link || location.href,
                        img_url: a.imgUrl || "",
                        type: a.type || "link",
                        data_url: a.dataUrl || ""
                    }, a)
                }
            }, a)
        },
        onMenuShareQQ: function(a) {
            d(o.onMenuShareQQ, {
                complete: function() {
                    c("shareQQ", {
                        title: a.title || r,
                        desc: a.desc || "",
                        img_url: a.imgUrl || "",
                        link: a.link || location.href
                    }, a)
                }
            }, a)
        },
        onMenuShareWeibo: function(a) {
            d(o.onMenuShareWeibo, {
                complete: function() {
                    c("shareWeiboApp", {
                        title: a.title || r,
                        desc: a.desc || "",
                        img_url: a.imgUrl || "",
                        link: a.link || location.href
                    }, a)
                }
            }, a)
        },
        onMenuShareQZone: function(a) {
            d(o.onMenuShareQZone, {
                complete: function() {
                    c("shareQZone", {
                        title: a.title || r,
                        desc: a.desc || "",
                        img_url: a.imgUrl || "",
                        link: a.link || location.href
                    }, a)
                }
            }, a)
        },
        startRecord: function(a) {
            c("startRecord", {}, a)
        },
        stopRecord: function(a) {
            c("stopRecord", {}, a)
        },
        onVoiceRecordEnd: function(a) {
            d("onVoiceRecordEnd", a)
        },
        playVoice: function(a) {
            c("playVoice", {
                localId: a.localId
            }, a)
        },
        pauseVoice: function(a) {
            c("pauseVoice", {
                localId: a.localId
            }, a)
        },
        stopVoice: function(a) {
            c("stopVoice", {
                localId: a.localId
            }, a)
        },
        onVoicePlayEnd: function(a) {
            d("onVoicePlayEnd", a)
        },
        uploadVoice: function(a) {
            c("uploadVoice", {
                localId: a.localId,
                isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
            }, a)
        },
        downloadVoice: function(a) {
            c("downloadVoice", {
                serverId: a.serverId,
                isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
            }, a)
        },
        translateVoice: function(a) {
            c("translateVoice", {
                localId: a.localId,
                isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
            }, a)
        },
        chooseImage: function(a) {
            c("chooseImage", {
                scene: "1|2",
                count: a.count || 9,
                sizeType: a.sizeType || ["original", "compressed"],
                sourceType: a.sourceType || ["album", "camera"]
            }, function() {
                return a._complete = function(a) {
                    if (u) {
                        var b = a.localIds;
                        b && (a.localIds = JSON.parse(b))
                    }
                }, a
            }())
        },
        previewImage: function(a) {
            c(o.previewImage, {
                current: a.current,
                urls: a.urls
            }, a)
        },
        uploadImage: function(a) {
            c("uploadImage", {
                localId: a.localId,
                isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
            }, a)
        },
        downloadImage: function(a) {
            c("downloadImage", {
                serverId: a.serverId,
                isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
            }, a)
        },
        getNetworkType: function(a) {
            var b = function(a) {
                var c, d, e, b = a.errMsg;
                if (a.errMsg = "getNetworkType:ok", c = a.subtype, delete a.subtype, c) a.networkType = c;
                else switch (d = b.indexOf(":"), e = b.substring(d + 1)) {
                    case "wifi":
                    case "edge":
                    case "wwan":
                        a.networkType = e;
                        break;
                    default:
                        a.errMsg = "getNetworkType:fail"
                }
                return a
            };
            c("getNetworkType", {}, function() {
                return a._complete = function(a) {
                    a = b(a)
                }, a
            }())
        },
        openLocation: function(a) {
            c("openLocation", {
                latitude: a.latitude,
                longitude: a.longitude,
                name: a.name || "",
                address: a.address || "",
                scale: a.scale || 28,
                infoUrl: a.infoUrl || ""
            }, a)
        },
        getLocation: function(a) {
            a = a || {}, c(o.getLocation, {
                type: a.type || "wgs84"
            }, function() {
                return a._complete = function(a) {
                    delete a.type
                }, a
            }())
        },
        hideOptionMenu: function(a) {
            c("hideOptionMenu", {}, a)
        },
        showOptionMenu: function(a) {
            c("showOptionMenu", {}, a)
        },
        closeWindow: function(a) {
            a = a || {}, c("closeWindow", {
                immediate_close: a.immediateClose || 0
            }, a)
        },
        hideMenuItems: function(a) {
            c("hideMenuItems", {
                menuList: a.menuList
            }, a)
        },
        showMenuItems: function(a) {
            c("showMenuItems", {
                menuList: a.menuList
            }, a)
        },
        hideAllNonBaseMenuItem: function(a) {
            c("hideAllNonBaseMenuItem", {}, a)
        },
        showAllNonBaseMenuItem: function(a) {
            c("showAllNonBaseMenuItem", {}, a)
        },
        scanQRCode: function(a) {
            a = a || {}, c("scanQRCode", {
                needResult: a.needResult || 0,
                scanType: a.scanType || ["qrCode", "barCode"]
            }, function() {
                return a._complete = function(a) {
                    var b, c;
                    v && (b = a.resultStr, b && (c = JSON.parse(b), a.resultStr = c && c.scan_code && c.scan_code.scan_result))
                }, a
            }())
        },
        openProductSpecificView: function(a) {
            c(o.openProductSpecificView, {
                pid: a.productId,
                view_type: a.viewType || 0
            }, a)
        },
        addCard: function(a) {
            var e, f, g, h, b = a.cardList,
                d = [];
            for (e = 0, f = b.length; f > e; ++e) g = b[e], h = {
                card_id: g.cardId,
                card_ext: g.cardExt
            }, d.push(h);
            c(o.addCard, {
                card_list: d
            }, function() {
                return a._complete = function(a) {
                    var c, d, e, b = a.card_list;
                    if (b) {
                        for (b = JSON.parse(b), c = 0, d = b.length; d > c; ++c) e = b[c], e.cardId = e.card_id, e.cardExt = e.card_ext, e.isSuccess = e.is_succ ? !0 : !1, delete e.card_id, delete e.card_ext, delete e.is_succ;
                        a.cardList = b, delete a.card_list
                    }
                }, a
            }())
        },
        chooseCard: function(a) {
            c("chooseCard", {
                app_id: z.appId,
                location_id: a.shopId || "",
                sign_type: a.signType || "SHA1",
                card_id: a.cardId || "",
                card_type: a.cardType || "",
                card_sign: a.cardSign,
                time_stamp: a.timestamp + "",
                nonce_str: a.nonceStr
            }, function() {
                return a._complete = function(a) {
                    a.cardList = a.choose_card_info, delete a.choose_card_info
                }, a
            }())
        },
        openCard: function(a) {
            var e, f, g, h, b = a.cardList,
                d = [];
            for (e = 0, f = b.length; f > e; ++e) g = b[e], h = {
                card_id: g.cardId,
                code: g.code
            }, d.push(h);
            c(o.openCard, {
                card_list: d
            }, a)
        },
        chooseWXPay: function(a) {
            c(o.chooseWXPay, f(a), a)
        }
    }, b && (a.wx = a.jWeixin = C), C
});

});
define("MT.SPM/0.1.0/src/components/html5-player-debug", [], function(require, exports, module){
/**
 * Created by thonatos on 14/12/17.
 */

var html5Player = {

    create: function ($container, $video, $player, options) {

        var obj = {};
        var _protected = {};

        /**
         * Variable
         * --------
         *
         * $container
         * $video
         * $player
         *
         * options
         *      play
         *      mute
         *      progress
         *      volume
         *      fullScreen
         *
         * _dataUrl
         *
         */

        var $container = $container;
        var $video = $video;
        var $player = $player;

        var defaultOptions =  {
            videoUrl: '',
            display: {
                all:true,
                playControl: true,
                muteControl: true,
                fullScreenControl: true,
                seekControl: true,
                volumeControl: true
            },
            control: {
                autoplay:true,
                preload:true,
                loop:true,
                progress: false,
                volume: false
            }
        };

        var currentOptions = {};

        if (options) {
            for (var key in options) {
                if (key in defaultOptions) {
                    defaultOptions[key] = options[key];
                }
            }
        }

        currentOptions = defaultOptions;

        var PLAYER_PROPORTION = 16 / 9;

        var _dataUrl = options.videoUrl || '';

        _protected.updateContainerSize = function () {

            var width = $container.width();
            var height = width / PLAYER_PROPORTION;

            //$container.find('.preview,video').css({
            //    "width": width,
            //    "height": height
            //});
        };

        _protected.addPlayerControl = function () {

            var _controls = '';

            _controls += '<div class="video-controls">';
            _controls += '<div class="controls-container">';
            _controls += '<div class="play">';
            _controls += '<a class="button" id="play-pause"></a>';
            _controls += '</div>';
            _controls += '<div class="progress">';
            _controls += '<input type="range" id="seek-bar" class="seek-bar" value="0">';
            _controls += '</div>';
            _controls += '<div class="mute">';
            _controls += '<a class="button" id="mute"></a>';
            _controls += '</div>';
            _controls += '<div class="volume">';
            _controls += '<input type="range" id="volume-bar" class="volume-bar" min="0" max="1" step="0.1" value="1">';
            _controls += '</div>';
            _controls += '<div class="full-screen">';
            _controls += '<a class="button" id="full-screen"></a>';
            _controls += '</div>';
            _controls += '</div>';
            _controls += '</div>';

            $container.append(_controls);
        };

        _protected.updateControlStyle = function () {

            // Container
            var _videoWidth = $container.find('video').width();
            var _left = 0;

            // hide volume and mute
            if (!currentOptions.display.volumeControl) {
                $container.find('.video-controls .mute').hide();
                $container.find('.video-controls .volume').hide();
            }

            // show / hide volume
            if (currentOptions.display.volumeControl) {

                _left = _videoWidth - 36 * 3 - 4 * 5;

                $container.find('.progress').css({
                    'width': _left * 0.6
                });

                $container.find('.volume').css({
                    'width': _left * 0.35
                });
            } else {

                _left = _videoWidth - 36 * 2 - 4 * 3;

                $container.find('.progress').css({
                    'width': _left * 0.99
                });
            }

        };

        _protected.controlHandler = function () {

            /**
             * Event
             * --------
             * playButton.play-pause.click
             * muteButton.mute.click
             * fullScreenButton.full-screen.click
             *
             * seekBar.change
             * volumeBar.change
             */

            if (!currentOptions.display.all) {
                document.getElementsByClassName('video-controls')[0].style.display='none';
            }

            // Event listener for the play/pause button
            if (currentOptions.display.playControl) {

                var playButton = document.getElementById("play-pause");

                playButton.addEventListener("click", function () {
                    if ($player.paused == true) {
                        $player.play();
                    } else {
                        $player.pause();
                    }
                });
            }

            // Event listener for the mute button
            if (currentOptions.display.muteControl) {

                var muteButton = document.getElementById("mute");

                muteButton.addEventListener("click", function () {
                    if ($player.muted == false) {
                        $player.muted = true;
                        //muteButton.innerHTML = "Unmute";
                        muteButton.style.backgroundImage = 'url(/public/images/player/player-mute.svg)';
                    } else {
                        $player.muted = false;
                        //muteButton.innerHTML = "Mute";
                        muteButton.style.backgroundImage = 'url(/public/images/player/player-unmute.svg)';
                    }
                });
            }

            // Event listener for the full-screen button
            if (currentOptions.display.fullScreenControl) {

                var fullScreenButton = document.getElementById("full-screen");

                fullScreenButton.addEventListener("click", function () {
                    console.log('RequestFullScreen');
                    if ($player.requestFullScreen) {
                        $player.requestFullScreen();
                    } else if ($player.mozRequestFullScreen) {
                        $player.mozRequestFullScreen(); // Firefox
                    } else if ($player.webkitRequestFullScreen) {
                        $player.webkitRequestFullScreen(); // Chrome and Safari
                    } else if ($player.oRequestFullScreen) {
                        $player.oRequestFullScreen(); // Chrome and Safari
                    } else if ($player.msRequestFullScreen) {
                        $player.msRequestFullScreen(); // Chrome and Safari
                    }
                });
            }

            // Event listener for the seek bar
            if (currentOptions.display.seekControl) {

                var seekBar = document.getElementById("seek-bar");

                seekBar.addEventListener("change", function () {
                    var _time = $player.duration * (seekBar.value / 100);

                    if (currentOptions.control.progress) {
                        if ($player.seekable) {
                            $player.currentTime = _time;
                        } else {
                            seekTo(_time);
                        }
                    } else {
                        // LIVE
                        console.log('Live, no seekable');
                    }

                    function seekTo(value) {
                        if ($player.seekable) {
                            $player.currentTime = value;

                            return false;
                        } else {
                            setTimeout(function () {
                                seekTo(value);
                            }, 500)
                        }
                    }
                });
            }

            // Event listener for the volume bar
            if (currentOptions.display.volumeControl) {

                var volumeBar = document.getElementById("volume-bar");

                volumeBar.addEventListener("change", function () {
                    $player.volume = volumeBar.value;
                });
            }
        };

        _protected.playerHandler = function () {

            //Add listener handler
            $player.addEventListener('play', playHandler, false);
            $player.addEventListener('pause', pauseHandler, false);
            $player.addEventListener('playing', playingHandler, false);
            $player.addEventListener('timeupdate', timeUpdateHandler, false);
            $player.addEventListener('touchstart', touchStartHandler, false);
            $player.addEventListener('touchend', touchEndHandler, false);

            /**
             * Handler
             * --------
             *
             * playingHandler
             * playHandler
             * pauseHandler
             * timeupdateHandler
             *
             * toggleFullScreen
             * toggleMute
             *
             * timeupdate
             *
             * touchStartHandler
             * touchEndHandler
             *
             */

            function playingHandler() {

                console.log(getTime() + ' Player.Playing');

                if (currentOptions.display.playControl) {
                    var playButton = document.getElementById("play-pause");
                    playButton.style.backgroundImage = 'url(/public/images/player/player-pause.svg)';
                }

            }

            function pauseHandler() {

                console.log(getTime() + ' Player.Pause');

                if (currentOptions.display.playControl) {
                    var playButton = document.getElementById("play-pause");
                    playButton.style.backgroundImage = 'url(/public/images/player/player-play.svg)';
                }

            }

            function playHandler() {
                console.log(getTime() + ' Player.Play');
            }

            function timeUpdateHandler() {
                //console.log(getTime() + ' Player.timeUpdate');
                var _value = (100 / $player.duration) * $player.currentTime;

                if (currentOptions.display.seekControl) {
                    var seekBar = document.getElementById("seek-bar");
                    seekBar.value = _value;
                }
            }

            function touchStartHandler() {
                console.log(getTime() + ' Player.touchStart');

                document.getElementsByClassName('video-controls')[0].style.opacity = '0.9';
            }

            function touchEndHandler() {
                console.log(getTime() + ' Player.touchEnd');
                setTimeout(function () {
                    document.getElementsByClassName('video-controls')[0].style.opacity = '0';
                }, 2000);
            }

            function getTime() {
                return (new Date().getTime());
            }
        };

        _protected.updateVideoSize = function (elem,width, height) {

            // From Covervid
            // https://github.com/stefanerickson/covervid

            // call sizeVideo on load
            document.addEventListener('DOMContentLoaded', sizeVideo,false);

            // call sizeVideo on resize
            window.onresize = function () {
                debounce(sizeVideo(), 50);
            };

            // debounce for resize function
            function debounce(fn, delay) {
                var timer = null;

                return function () {
                    var context = this,
                        args = arguments;

                    window.clearTimeout(timer);

                    timer = window.setTimeout(function () {
                        fn.apply(context, args);
                    }, delay);
                };
            }

            // Set necessary styles to position video "center center"
            elem.style.position = 'absolute';
            elem.style.top = '50%';
            elem.style.left = '50%';
            elem.style['-webkit-transform'] = 'translate(-50%, -50%)';
            elem.style['-ms-transform'] = 'translate(-50%, -50%)';
            elem.style.transform = 'translate(-50%, -50%)';

            // Set overflow hidden on parent element
            elem.parentNode.style.overflow = 'hidden';

            // Define the attached selector
            function sizeVideo() {

                console.log(new Date());

                // Get parent element height and width
                var parentHeight = elem.parentNode.offsetHeight;
                var parentWidth = elem.parentNode.offsetWidth;

                // Get native video width and height
                var nativeWidth = width;
                var nativeHeight = height;

                // Get the scale factors
                var heightScaleFactor = parentHeight / nativeHeight;
                var widthScaleFactor = parentWidth / nativeWidth;

                // Based on highest scale factor set width and height
                if (widthScaleFactor > heightScaleFactor) {
                    elem.style.height = 'auto';
                    elem.style.width = parentWidth+'px';
                } else {
                    elem.style.height = parentHeight+'px';
                    elem.style.width = 'auto';
                }
            }
        };

        /**
         *
         * @param videoUrl
         * @param callback
         */
        _protected.updateVideoUrl = function (playing, videoUrl, callback) {


            /**
             * 是否正在播放？
             * 是，更换视频流，并回放到原始位置；
             * 否，更新视频流，并等待用户点击开始。
             *
             * 返回信息playing:
             *      true: 播放
             *      false：未播放
             */

            if (playing) {

                // 视频已播放
                var _currentTime = $player.currentTime.toFixed(1);
                $player.src = videoUrl;
                $player.load();
                $player.play();
                seekTo(_currentTime);

                // Add listener to auto hide event-info
                $player.addEventListener("playing", playingHandler, false);
            } else {

                // 视频未播放
                $player.src = videoUrl;
                $player.load();
                callback(false);
            }


            function playingHandler() {
                console.log("updateVideoUrl.playingHandler");
                $player.removeEventListener("playing", playingHandler, false);
            }

            function seekTo(value) {

                var _SEEK_DELAY = 500;

                if ($player.readyState == 0) {

                    setTimeout(function () {
                        seekTo(value);
                    }, _SEEK_DELAY * 2);
                    return false;

                } else {

                    if (($player.currentTime !== null) && ($player.duration > value)) {
                        console.log('TO SEEK');
                        $player.currentTime = value;
                        callback(true);
                    } else {
                        console.log('Wait for data ... biu biu biu .');
                        setTimeout(function () {
                            seekTo(value);
                        }, _SEEK_DELAY);
                        return false;
                    }
                }
            }
        };

        /**
         * obj
         * --------
         *
         * init
         * resume
         * resize
         * updateVideoUrl
         *
         */

        obj.init = function () {

            $video.remove();
            $video.find('source').attr('src', _dataUrl);

            // ADD ATTRIBUTE
            if(currentOptions.control.autoplay){
                $video.attr('autoplay', 'autoplay');
            }

            if(currentOptions.control.preload){
                $video.attr("preload", "auto");
            }

            if(currentOptions.control.loop){
                $video.attr("loop", "loop");
            }

            $container.prepend($video);
            _protected.updateContainerSize();
            _protected.addPlayerControl();
            _protected.updateControlStyle();
        };

        obj.resume = function () {

            $player.src = _dataUrl;
            $player.load();
            _protected.updateVideoSize($player,1280,720);
            _protected.controlHandler();
            _protected.playerHandler();

        };

        obj.updateVideoUrl = _protected.updateVideoUrl;

        return obj;
    }
};

exports.create = html5Player.create;
});
