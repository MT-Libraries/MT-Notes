define("MT.SPM/0.0.5/src/page/index-mood-debug", [], function(require, exports, module){
/**
 * Created by thonatos on 15/6/12.
 */

exports.init = function () {

    var _protected = {};

    var blogTimeLine = {};

    // For timeline items(DOM) & mood items(Json);

    var currentPage = 1,
        pageCount = 1;

    var $cleanItem = $('.item');
    var $queryMoreBtn = $('.query-more');


    // Protected Functions

    _protected.initPublic = function () {
        var public = require("MT.SPM/0.0.5/src/page/public-debug");
        public.init();
    };

    _protected.queryMood = function(cPage,callback){

        $.get('/api/moods/gets/'+cPage,function(data) {

            if(data && data.code === 200){

                console.log(data);

                callback(data.data)

            }else{
                console.log('err');
            }
        });
    };

    _protected.initTimeline = function () {

        var timeline = require("MT.SPM/0.0.5/src/utils/timeline-debug");

        blogTimeLine = timeline('.timeline',{
            item   : '.item',
            margin : 60, //左右之间的间距
            top    : 20 ,  //距离上一个item的间距
            minTop : 10,  //如在手机下显示，可以将上下间距适当缩小
            resize : true, //监听窗口变化
            minScreen : 640 //当窗口小于640时，单列显示
        });

        blogTimeLine.render();
    };

    // Call Protected Methods;

    _protected.initPublic();
    _protected.initTimeline();

    _protected.queryMood(currentPage, function (data) {

        currentPage = data.currentPage;
        pageCount = data.pageCount;
        var showMoreBtn = pageCount > currentPage;

        if(showMoreBtn){
            // show nextPage btn;
            $queryMoreBtn.show();

        }else{
            // hide nextPage btn;
            $queryMoreBtn.hide();
        }

        $('.item').remove();

        var _moods = data.moods;

        for (var i = _moods.length - 1; i >= 0; i--) {
            var _mood = _moods[i];

            var _tMood = $cleanItem.clone();
            $(_tMood).find('.post-content').html(_mood.content);
            $(_tMood).find('.post-date').html(_mood.datetime);

            $('.timeline').append(_tMood);

            blogTimeLine.render();
        }
    });

    $queryMoreBtn.click(function(e){
        e.preventDefault();

        if(pageCount > currentPage){
            _protected.queryMood(currentPage+1);
        }else{
            alert('No more to load...');
        }

    });

};
});
define("MT.SPM/0.0.5/src/page/public-debug", [], function(require, exports, module){
/**
 * Created by thonatos on 15/1/18.
 */

exports.init = function () {

    var updateBrowser = require("MT.SPM/0.0.5/src/components/update-browser-debug").create('',false);
    updateBrowser.init();

    var toggleNav = require("MT.SPM/0.0.5/src/components/toggle-nav-debug").create($('.nav-ul-toggle a'),$('.nav-ul'));
    toggleNav.init();

};
});
define("MT.SPM/0.0.5/src/components/update-browser-debug", [], function(require, exports, module){
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
define("MT.SPM/0.0.5/src/components/toggle-nav-debug", [], function(require, exports, module){
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
define("MT.SPM/0.0.5/src/utils/timeline-debug", [], function(require, exports, module){
/**
 * smohanTimeLine
 * Author:Smohan
 * Version:3.0.1
 * url: http://www.smohan.net/lab/smohan_timeline.html
 * 使用请保留以上信息
 */

!function (a) {
    "use strict";

    function b(b, c) {
        this.version = "3.0.1";
        var d = this.config;
        return this.config = a.extend({}, d, c), "string" == typeof b && (b = a(b)), this.el = b, this.render(), this.config.resize && this.resize(), this
    }

    b.prototype.config = {
        item: ".item",
        margin: 120,
        top: 20,
        minTop: 10,
        resize: !0,
        minScreen: 640
    }, b.prototype.calculate = function () {
        var a = this,
            b = a.config,
            c = a.el;
        c.css({
            position: "relative"
        }), c.find(b.item);
        var f, e = c[0].offsetWidth;
        return f = a.isSmallScreen() ? e : Math.round((e - b.margin) / 2), {
            el: e,
            item: f
        }
    }, b.prototype.render = function () {
        var a = this,
            b = a.config,
            c = a.el,
            d = c.find(b.item),
            e = a.methods,
            f = [],
            g = a.calculate();
        d.css({
            width: g.item + "px",
            margin: 0,
            padding: 0,
            overflow: "visible"
        });
        var h = d[0].offsetHeight;
        if (a.isSmallScreen()) d.css({
            position: "static",
            marginTop: b.minTop + "px"
        }), c.find(".lines").length && c.find(".lines").hide(), d.find(".point,.corner").hide();
        else {
            d.css("position", "absolute"), c.find(".lines").length ? c.find(".lines").show() : c.append('<div class="lines"></div>'), d.find(".point").length ? d.find(".point").show() : d.append('<div class="point"></div>'), d.find(".corner").length ? d.find(".corner").show() : d.append('<div class="corner"></div>');
            for (var i = d.find(".point"), j = i[0].offsetWidth, k = 0, l = d.length; l > k; k++) {
                var m = d[k].offsetHeight;
                if (2 > k) {
                    f[k] = m;
                    var n = k * (g.item + b.margin),
                        o = 0 === n ? "isLeft" : "isRight",
                        p = 0 === n ? {
                            left: Math.round((b.margin - j) / 2 + g.item) + "px"
                        } : {
                            left: -Math.round((b.margin + j) / 2) + "px"
                        };
                    d.eq(k).css({
                        top: 0,
                        left: n + "px"
                    }).removeClass("isLeft isRight").addClass(o).find(".point").css(p)
                } else {
                    h = e.getMin(f);
                    var q = e.getKey(f, h);
                    f[q] += m + b.top;
                    var n = q * (g.item + b.margin),
                        o = 0 === n ? "isLeft" : "isRight",
                        p = 0 === n ? {
                            left: Math.round((b.margin - j) / 2 + g.item) + "px"
                        } : {
                            left: -Math.round((b.margin + j) / 2) + "px"
                        };
                    d.eq(k).css({
                        top: h + b.top + "px",
                        left: n + "px"
                    }).removeClass("isLeft isRight").addClass(o).find(".point").css(p)
                }
                var r = e.getKey(f, e.getMax(f));
                c.css({
                    height: f[r] + 60
                })
            }
            var s = c.find(".lines").width();
            c.find(".lines").css({
                left: "50%",
                "margin-left": -(s / 2) + "px"
            }).animate({
                height: "100%"
            }, {
                queue: !1,
                duration: 2e3
            })
        }
    }, b.prototype.resize = function () {
        var a = this,
            b = a.el,
            c = a.config;
        b.find(c.item), window.onresize = function () {
            return a.render()
        }
    }, b.prototype.methods = {
        getKey: function (a, b) {
            for (var c in a)
                if (a[c] === b) return c
        },
        getMin: function (a) {
            return Math.min.apply(Math, a)
        },
        getMax: function (a) {
            return Math.max.apply(Math, a)
        }
    }, b.prototype.isSmallScreen = function () {
        var b = this,
            c = b.config;
        return c.resize === !0 && c.minScreen && a(window).width() <= Math.round(c.minScreen)
    }, window.smohanTimeLine = function (a, c) {
        return new b(a, c)
    }, a.fn.smohanTimeLine = function (a) {
        return new b(this, a)
    }


    if (typeof define === "function" && define.cmd) {
        // 有 Sea.js 等 CMD 模块加载器存在

        module.exports = function (a, c) {
            return new b(a,c);
        };
    }

}(jQuery);
});
