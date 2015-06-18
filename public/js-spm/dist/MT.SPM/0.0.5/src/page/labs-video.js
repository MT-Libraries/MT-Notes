define("MT.SPM/0.0.5/src/page/labs-video",[],function(e,o){var t=function(){var o=e("MT.SPM/0.0.5/src/page/public");o.init(),console.log("Live Page");var t="http://media.html5media.info/video.mp4",n=e("MT.SPM/0.0.5/src/components/html5-player").create($(".video-section"),$(".video-section video"),document.getElementById("html5-video"),{videoUrl:t,display:{all:!0,playControl:!0,muteControl:!0,fullScreenControl:!0,seekControl:!0,volumeControl:!0},control:{autoplay:!0,preload:!0,loop:!0,progress:!1,volume:!1}});n.init(),n.resume();var i=e("MT.SPM/0.0.5/src/components/update-browser").create("",!1);i.init()};o.init=t}),define("MT.SPM/0.0.5/src/page/public",[],function(e,o){o.init=function(){var o=e("MT.SPM/0.0.5/src/components/update-browser").create("",!1);o.init();var t=e("MT.SPM/0.0.5/src/components/toggle-nav").create($(".nav-ul-toggle a"),$(".nav-ul"));t.init()}}),define("MT.SPM/0.0.5/src/components/update-browser",[],function(e,o){var t={create:function(e,o){var t={},n={};n.options=e||{},n.options.versionRequied={i:10,f:23,o:12,s:6.2,n:12,c:28},n.options.versionDefault={i:9,f:23,o:12,s:6.2,n:12,c:28},n.options.versionMinimal={i:9,f:23,o:12,s:6.2,n:12,c:28},n.options.version=e.version||n.options.versionDefault;{var i;window.navigator}return t.init=function(){for(i in n.options.versionRequied)n.options.version[i]>=n.options.versionRequied[i]&&(n.options.version[i]=n.options.version[i]-.2),n.options.version[i]||(n.options.version[i]=n.options.versionDefault[i]),n.options.version[i]<n.options.versionMinimal[i]&&(n.options.version[i]=n.options.versionMinimal[i]);n.options.test=o||e.test||!1,"#test-bu"==window.location.hash&&(n.options.test=!0)},t.getBrowser=function(){var e,o,t=navigator.userAgent,n={i:"Internet Explorer",f:"Firefox",o:"Opera",s:"Apple Safari",n:"Netscape Navigator",c:"Chrome",x:"Other"};if(/bot|googlebot|facebook|slurp|wii|silk|blackberry|mediapartners|adsbot|silk|android|phone|bingbot|google web preview|like firefox|chromeframe|seamonkey|opera mini|min|meego|netfront|moblin|maemo|arora|camino|flot|k-meleon|fennec|kazehakase|galeon|android|mobile|iphone|ipod|ipad|epiphany|rekonq|symbian|webos/i.test(t))e="x";else if(/Trident.*rv:(\d+\.\d+)/i.test(t))e="i";else if(/Trident.(\d+\.\d+)/i.test(t))e="io";else if(/MSIE.(\d+\.\d+)/i.test(t))e="i";else if(/OPR.(\d+\.\d+)/i.test(t))e="o";else if(/Chrome.(\d+\.\d+)/i.test(t))e="c";else if(/Firefox.(\d+\.\d+)/i.test(t))e="f";else if(/Version.(\d+.\d+).{0,10}Safari/i.test(t))e="s";else if(/Safari.(\d+)/i.test(t))e="so";else if(/Opera.*Version.(\d+\.\d+)/i.test(t))e="o";else if(/Opera.(\d+\.?\d+)/i.test(t))e="o";else{if(!/Netscape.(\d+)/i.test(t))return{n:"x",v:0,t:n[e]};e="n"}return/windows.nt.5.0|windows.nt.4.0|windows.98|os x 10.4|os x 10.5|os x 10.3|os x 10.2/.test(t)&&(e="x"),"f"==e&&24==o&&(e="x"),/linux|x11|unix|bsd/.test(t)&&"o"==e&&o>12&&(e="x"),"x"==e?{n:"x",v:0,t:n[e]}:(o=new Number(RegExp.$1),"so"==e&&(o=100>o&&1||130>o&&1.2||320>o&&1.3||520>o&&2||524>o&&3||526>o&&3.2||4,e="s"),"i"==e&&7==o&&window.XDomainRequest&&(o=8),"io"==e&&(e="i",o=o>6?11:o>5?10:o>4?9:o>3.1?8:o>3?7:9),{n:e,v:o,t:n[e]+" "+o})},t.generateInfo=function(){var o=window.devicePixelRatio>1?2:1,t=document.createElement("div");n.options.div=t,t.id="update-browser",t.className="update-browser";var i='                    <div class="update-browser-box">                        <div class="update-browser-icon"><img src="/public/images/icons/'+o+'x/icon-update-browser.png" alt=""></div>                        <div class="update-browser-info"><p>\u9a6c\u4e0a\u5347\u7ea7\u60a8\u7684\u6d4f\u89c8\u5668\uff0c\u83b7\u5f97\u66f4\u6d41\u7545\u7684\u8bbf\u95ee\u4f53\u9a8c</p></div>                        <div class="update-browser-action"><a href="/labs/update-browser">\u514d\u8d39\u66f4\u65b0</a></div>                    </div>                    <div class="update-browser-close"><a id="update-browser-button-close" href="#">\u6b8b\u5fcd\u62d2\u7edd</a></div></div>';t.innerHTML=e.div||i;var r=document.createElement("style"),a=".update-browser {position: fixed;top: 0;left: 0;padding: 14px 0;width: 100%;display: table;background: #f4f4f4;box-shadow: 0 0 4px #000000;z-index: 9999;}.update-browser-box{margin: 0 auto;width: 600px;}.update-browser-box:before{content: ' ';display: table;}.update-browser-box:after{content: ' ';clear: both;display: table;}.update-browser-icon,.update-browser-info,.update-browser-action {display: inline-block;float: left;}.update-browser-icon img{width: 28px;vertical-align: middle;}.update-browser-info p{margin: 10px;display: block;font-size: 16px;color: #505050;}.update-browser-action a{padding: 10px 0;display: block;font-size: 16px;color: #2732c9;}.update-browser-close{position: absolute;top: 14px;right: 23px;}.update-browser-close a{display: block;text-decoration: none;font-size: 12px;color: #858689;}",s=e.style||a;document.body.insertBefore(t,document.body.firstChild),document.getElementsByTagName("head")[0].appendChild(r);try{r.innerText=s,r.innerHTML=s}catch(l){try{r.styleSheet.cssText=s}catch(l){return}}document.getElementById("update-browser-button-close").onclick=function(e){e.preventDefault(),n.options.div.style.display="none"}},t.appendInfo=function(){n.options.browser=t.getBrowser(),(n.options.test||n.options.browser&&n.options.browser.n&&"x"!=n.options.browser.n&&!(n.options.browser.v>n.options.version[n.options.browser.n]))&&t.generateInfo()},n.init=function(){t.init(),t.appendInfo()},n}};o.create=t.create}),define("MT.SPM/0.0.5/src/components/toggle-nav",[],function(e,o){var t={create:function(e,o){var t={},n=!1;return t.init=function(){e.click(function(){return n?o.fadeOut():o.fadeIn(),n=!n,!1})},t}};o.create=t.create}),define("MT.SPM/0.0.5/src/components/html5-player",[],function(e,o){var t={create:function(e,o,t,n){var i={},r={},e=e,o=o,t=t,a={videoUrl:"",display:{all:!0,playControl:!0,muteControl:!0,fullScreenControl:!0,seekControl:!0,volumeControl:!0},control:{autoplay:!0,preload:!0,loop:!0,progress:!1,volume:!1}},s={};if(n)for(var l in n)l in a&&(a[l]=n[l]);s=a;var d=n.videoUrl||"";return r.updateContainerSize=function(){e.width()},r.addPlayerControl=function(){var o="";o+='<div class="video-controls">',o+='<div class="controls-container">',o+='<div class="play">',o+='<a class="button" id="play-pause"></a>',o+="</div>",o+='<div class="progress">',o+='<input type="range" id="seek-bar" class="seek-bar" value="0">',o+="</div>",o+='<div class="mute">',o+='<a class="button" id="mute"></a>',o+="</div>",o+='<div class="volume">',o+='<input type="range" id="volume-bar" class="volume-bar" min="0" max="1" step="0.1" value="1">',o+="</div>",o+='<div class="full-screen">',o+='<a class="button" id="full-screen"></a>',o+="</div>",o+="</div>",o+="</div>",e.append(o)},r.updateControlStyle=function(){var o=e.find("video").width(),t=0;s.display.volumeControl||(e.find(".video-controls .mute").hide(),e.find(".video-controls .volume").hide()),s.display.volumeControl?(t=o-108-20,e.find(".progress").css({width:.6*t}),e.find(".volume").css({width:.35*t})):(t=o-72-12,e.find(".progress").css({width:.99*t}))},r.controlHandler=function(){if(s.display.all||(document.getElementsByClassName("video-controls")[0].style.display="none"),s.display.playControl){var e=document.getElementById("play-pause");e.addEventListener("click",function(){1==t.paused?t.play():t.pause()})}if(s.display.muteControl){var o=document.getElementById("mute");o.addEventListener("click",function(){0==t.muted?(t.muted=!0,o.style.backgroundImage="url(/public/images/player/player-mute.svg)"):(t.muted=!1,o.style.backgroundImage="url(/public/images/player/player-unmute.svg)")})}if(s.display.fullScreenControl){var n=document.getElementById("full-screen");n.addEventListener("click",function(){console.log("RequestFullScreen"),t.requestFullScreen?t.requestFullScreen():t.mozRequestFullScreen?t.mozRequestFullScreen():t.webkitRequestFullScreen?t.webkitRequestFullScreen():t.oRequestFullScreen?t.oRequestFullScreen():t.msRequestFullScreen&&t.msRequestFullScreen()})}if(s.display.seekControl){var i=document.getElementById("seek-bar");i.addEventListener("change",function(){function e(o){return t.seekable?(t.currentTime=o,!1):void setTimeout(function(){e(o)},500)}var o=t.duration*(i.value/100);s.control.progress?t.seekable?t.currentTime=o:e(o):console.log("Live, no seekable")})}if(s.display.volumeControl){var r=document.getElementById("volume-bar");r.addEventListener("change",function(){t.volume=r.value})}},r.playerHandler=function(){function e(){if(console.log(l()+" Player.Playing"),s.display.playControl){var e=document.getElementById("play-pause");e.style.backgroundImage="url(/public/images/player/player-pause.svg)"}}function o(){if(console.log(l()+" Player.Pause"),s.display.playControl){var e=document.getElementById("play-pause");e.style.backgroundImage="url(/public/images/player/player-play.svg)"}}function n(){console.log(l()+" Player.Play")}function i(){var e=100/t.duration*t.currentTime;if(s.display.seekControl){var o=document.getElementById("seek-bar");o.value=e}}function r(){console.log(l()+" Player.touchStart"),document.getElementsByClassName("video-controls")[0].style.opacity="0.9"}function a(){console.log(l()+" Player.touchEnd"),setTimeout(function(){document.getElementsByClassName("video-controls")[0].style.opacity="0"},2e3)}function l(){return(new Date).getTime()}t.addEventListener("play",n,!1),t.addEventListener("pause",o,!1),t.addEventListener("playing",e,!1),t.addEventListener("timeupdate",i,!1),t.addEventListener("touchstart",r,!1),t.addEventListener("touchend",a,!1)},r.updateVideoSize=function(e,o,t){function n(e,o){var t=null;return function(){var n=this,i=arguments;window.clearTimeout(t),t=window.setTimeout(function(){e.apply(n,i)},o)}}function i(){console.log(new Date);var n=e.parentNode.offsetHeight,i=e.parentNode.offsetWidth,r=o,a=t,s=n/a,l=i/r;l>s?(e.style.height="auto",e.style.width=i+"px"):(e.style.height=n+"px",e.style.width="auto")}document.addEventListener("DOMContentLoaded",i,!1),window.onresize=function(){n(i(),50)},e.style.position="absolute",e.style.top="50%",e.style.left="50%",e.style["-webkit-transform"]="translate(-50%, -50%)",e.style["-ms-transform"]="translate(-50%, -50%)",e.style.transform="translate(-50%, -50%)",e.parentNode.style.overflow="hidden"},r.updateVideoUrl=function(e,o,n){function i(){console.log("updateVideoUrl.playingHandler"),t.removeEventListener("playing",i,!1)}function r(e){var o=500;return 0==t.readyState?(setTimeout(function(){r(e)},2*o),!1):null!==t.currentTime&&t.duration>e?(console.log("TO SEEK"),t.currentTime=e,n(!0),void 0):(console.log("Wait for data ... biu biu biu ."),setTimeout(function(){r(e)},o),!1)}if(e){var a=t.currentTime.toFixed(1);t.src=o,t.load(),t.play(),r(a),t.addEventListener("playing",i,!1)}else t.src=o,t.load(),n(!1)},i.init=function(){o.remove(),o.find("source").attr("src",d),s.control.autoplay&&o.attr("autoplay","autoplay"),s.control.preload&&o.attr("preload","auto"),s.control.loop&&o.attr("loop","loop"),e.prepend(o),r.updateContainerSize(),r.addPlayerControl(),r.updateControlStyle()},i.resume=function(){t.src=d,t.load(),r.updateVideoSize(t,1280,720),r.controlHandler(),r.playerHandler()},i.updateVideoUrl=r.updateVideoUrl,i}};o.create=t.create});