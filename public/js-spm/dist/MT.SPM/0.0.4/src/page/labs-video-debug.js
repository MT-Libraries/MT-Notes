define("MT.SPM/0.0.4/src/page/labs-video-debug", [], function(require, exports, module){
/**
 * Created by thonatos on 14/12/16.
 */

var init = function () {

    var public = require("MT.SPM/0.0.4/src/page/public-debug");
    public.init();

    console.log('Live Page');

    var SOURCE = 'http://media.html5media.info/video.mp4';
    var html5Player = require("MT.SPM/0.0.4/src/components/html5-player-debug").create(
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

    var updateBrowser = require("MT.SPM/0.0.4/src/components/update-browser-debug").create('',false);

    updateBrowser.init();
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
define("MT.SPM/0.0.4/src/components/html5-player-debug", [], function(require, exports, module){
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
