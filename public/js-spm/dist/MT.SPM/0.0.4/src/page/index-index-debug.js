define("MT.SPM/0.0.4/src/page/index-index-debug", [], function(require, exports, module){
/**
 * Created by thonatos on 14/11/27.
 */

var init = function () {


    var public = require("MT.SPM/0.0.4/src/page/public-debug");
    public.init();

    console.log("\n\n" +
    "儿时的梦想，终究未能实现。\n"+
    "如今还剩下什么呢？\n\n");

};



exports.init = init;

});
define("MT.SPM/0.0.4/src/page/public-debug", [], function(require, exports, module){
/**
 * Created by thonatos on 15/1/18.
 */

exports.init = function () {

    var updateBrowser = require("MT.SPM/0.0.4/src/components/update-browser-debug").create('',false);
    updateBrowser.init();

    var toggleNav = require("MT.SPM/0.0.4/src/components/toggle-nav-debug").create($('.nav-ul-toggle a'),$('.nav-ul'));
    toggleNav.init();

};
});
define("MT.SPM/0.0.4/src/components/update-browser-debug", [], function(require, exports, module){
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
define("MT.SPM/0.0.4/src/components/toggle-nav-debug", [], function(require, exports, module){
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
