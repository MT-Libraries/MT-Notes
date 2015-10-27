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

    // if (typeof define === "function" && define.cmd) {
    //     // 有 Sea.js 等 CMD 模块加载器存在

    //     module.exports = function (a, c) {
    //         return new b(a,c);
    //     };
    // }
    
    module.exports = function (a, c) {
        return new b(a,c);
    };    

}(jQuery);