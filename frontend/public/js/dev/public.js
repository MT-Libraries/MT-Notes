/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by thonatos on 15/1/18.
	 */

	var loader;
	var SVGLoader = __webpack_require__(2);
	var updateBrowser = __webpack_require__(4).create('',false);
	    
	$(document).ready(function(){  
	      
	    // 浏览版本检测    
	    updateBrowser.init();
	    
	    // 浏览器版本是否低于IE8    
	    var lessThenIE = function () {
	        var UA = navigator.userAgent,
	            isIE = UA.indexOf('MSIE') > -1,
	            v = isIE ? /\d+/.exec(UA.split(';')[1]) : 'no ie';
	        return v < 10;
	    }();    
	                   
	    if (lessThenIE) {        
	        $('#loader').hide();        
	    } else {
	        loader = new SVGLoader(document.getElementById('loader'), { speedIn: 300, easingIn: mina.easeinout });
	        loader.show();
	        
	        setTimeout(function(){
	                loader.hide();
	        },2000);
	    } 
	    
	});

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * SVGLoader.
	 *
	 * @project     localhost_insta360
	 * @datetime    17:51 - 15/9/4
	 * @author      Thonatos.Yang <thonatos.yang@gmail.com>
	 * @copyright   Thonatos.Yang <https://www.thonatos.com>
	 *
	 */

	/**
	 * svgLoader.js v1.0.0
	 * http://www.codrops.com
	 *
	 * Licensed under the MIT license.
	 * http://www.opensource.org/licenses/mit-license.php
	 *
	 * Copyright 2014, Codrops
	 * http://www.codrops.com
	 */

	'use strict';

	var classie = __webpack_require__(3);

	function extend(a, b) {
	    for (var key in b) {
	        if (b.hasOwnProperty(key)) {
	            a[key] = b[key];
	        }
	    }
	    return a;
	}

	function SVGLoader(el, options) {
	    this.el = el;
	    this.options = extend({}, this.options);
	    extend(this.options, options);
	    this._init();
	}

	SVGLoader.prototype.options = {
	    speedIn: 500,
	    easingIn: mina.linear
	}

	SVGLoader.prototype._init = function () {
	    var s = Snap(this.el.querySelector('svg'));
	    this.path = s.select('path');
	    this.initialPath = this.path.attr('d');

	    var openingStepsStr = this.el.getAttribute('data-opening');
	    this.openingSteps = openingStepsStr ? openingStepsStr.split(';') : '';
	    this.openingStepsTotal = openingStepsStr ? this.openingSteps.length : 0;
	    if (this.openingStepsTotal === 0) return;

	    // if data-closing is not defined then the path will animate to its original shape
	    var closingStepsStr = this.el.getAttribute('data-closing') ? this.el.getAttribute('data-closing') : this.initialPath;
	    this.closingSteps = closingStepsStr ? closingStepsStr.split(';') : '';
	    this.closingStepsTotal = closingStepsStr ? this.closingSteps.length : 0;

	    this.isAnimating = false;

	    if (!this.options.speedOut) {
	        this.options.speedOut = this.options.speedIn;
	    }
	    if (!this.options.easingOut) {
	        this.options.easingOut = this.options.easingIn;
	    }
	}

	SVGLoader.prototype.show = function () {
	    if (this.isAnimating) return false;
	    this.isAnimating = true;
	    // animate svg
	    var self = this,
	        onEndAnimation = function () {
	            classie.addClass(self.el, 'pageload-loading');
	        };
	    this._animateSVG('in', onEndAnimation);
	    classie.add(this.el, 'show');
	}

	SVGLoader.prototype.hide = function () {
	    var self = this;
	    classie.removeClass(this.el, 'pageload-loading');
	    this._animateSVG('out', function () {
	        // reset path
	        self.path.attr('d', self.initialPath);
	        classie.removeClass(self.el, 'show');  
	        self.isAnimating = false;
	    });
	}

	SVGLoader.prototype._animateSVG = function (dir, callback) {
	    var self = this,
	        pos = 0,
	        steps = dir === 'out' ? this.closingSteps : this.openingSteps,
	        stepsTotal = dir === 'out' ? this.closingStepsTotal : this.openingStepsTotal,
	        speed = dir === 'out' ? self.options.speedOut : self.options.speedIn,
	        easing = dir === 'out' ? self.options.easingOut : self.options.easingIn,
	        nextStep = function (pos) {
	            if (pos > stepsTotal - 1) {
	                if (callback && typeof callback == 'function') {
	                    callback();
	                }
	                return;
	            }
	            self.path.animate({'path': steps[pos]}, speed, easing, function () {
	                nextStep(pos);
	            });
	            pos++;
	        };

	    nextStep(pos);
	}


	module.exports = SVGLoader;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 *
	 * classie.
	 *
	 * @project     localhost_insta360
	 * @datetime    17:59 - 15/9/4
	 * @author      Thonatos.Yang <thonatos.yang@gmail.com>
	 * @copyright   Thonatos.Yang <https://www.thonatos.com>
	 *
	 */

	/*!
	 * classie - class helper functions
	 * from bonzo https://github.com/ded/bonzo
	 *
	 * classie.has( elem, 'my-class' ) -> true/false
	 * classie.add( elem, 'my-new-class' )
	 * classie.remove( elem, 'my-unwanted-class' )
	 * classie.toggle( elem, 'my-class' )
	 */

	/*jshint browser: true, strict: true, undef: true */
	/*global define: false */

	( function( window ) {

	    'use strict';

	// class helper functions from bonzo https://github.com/ded/bonzo

	    function classReg( className ) {
	        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
	    }

	// classList support for class management
	// altho to be fair, the api sucks because it won't accept multiple classes at once
	    var hasClass, addClass, removeClass;

	    if ( 'classList' in document.documentElement ) {
	        hasClass = function( elem, c ) {
	            return elem.classList.contains( c );
	        };
	        addClass = function( elem, c ) {
	            elem.classList.add( c );
	        };
	        removeClass = function( elem, c ) {
	            elem.classList.remove( c );
	        };
	    }
	    else {
	        hasClass = function( elem, c ) {
	            return classReg( c ).test( elem.className );
	        };
	        addClass = function( elem, c ) {
	            if ( !hasClass( elem, c ) ) {
	                elem.className = elem.className + ' ' + c;
	            }
	        };
	        removeClass = function( elem, c ) {
	            elem.className = elem.className.replace( classReg( c ), ' ' );
	        };
	    }

	    function toggleClass( elem, c ) {
	        var fn = hasClass( elem, c ) ? removeClass : addClass;
	        fn( elem, c );
	    }

	    var classie = {
	        // full names
	        hasClass: hasClass,
	        addClass: addClass,
	        removeClass: removeClass,
	        toggleClass: toggleClass,
	        // short names
	        has: hasClass,
	        add: addClass,
	        remove: removeClass,
	        toggle: toggleClass
	    };

	// transport
	    if ( true ) {
	        // AMD
	        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (classie), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module != 'undefined' && module.exports) {
	        module.exports = classie;
	    }else {
	        // browser global
	        window.classie = classie;
	    }

	})( window );

/***/ },
/* 4 */
/***/ function(module, exports) {

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
	                        <div class="update-browser-action"><a href="/public/html/update-browser.html">免费更新</a></div>\
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


/***/ }
/******/ ]);