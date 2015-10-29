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
/***/ function(module, exports) {

	/**
	 * Created by thonatos on 14/12/7.
	 */

	var init = function () {

	    console.log("\n\n" +
	    "这是个电台。\n"+
	    "听那些老歌，想念你。\n\n");
		
		var audio,
			musicList,
			currentIndex=0,
			$album=$('.album'),
			$info=$('.info'),
			$next=$('.player-next'),
			$playToogle = $('.player-play-pause'),
			$volumeRange = $('.player-seekbar').get(0);
			

		function load(musicObj){

			// Album
			$album.find('img')[0].src = musicObj.album.blurPicUrl; 

			// Title
			$info.find('.title').html(musicObj.album.name);
			
			// Audio
			audio.src = musicObj.mp3Url;
			audio.play();
		}

		function query(){
			audio = document.createElement('audio');
			$.get('/api/fm/playlist/'+PLAYLIST,function(data) {
				if(data && data.code === 200){
					console.log(data);
					musicList = data.result.tracks;
					
					load(musicList[currentIndex]);

				}
			});
		}
		
		// volume
		$volumeRange.onchange = function () {

			if(audio && audio.src!==''){
				audio.volume = $volumeRange.value / 10;
			};
		};

		// next
		$next.click(function(e){
			e.preventDefault();
			if(currentIndex < musicList.length){
				++currentIndex;
				load(musicList[currentIndex]);
			}else{
	            currentIndex = 0;
	            load(musicList[currentIndex]);
	        }
		});

		// play&pause
		$playToogle.click(function(e){
			e.preventDefault();
			if(audio){
				if(audio.paused){
					audio.play();
				}else{
					audio.pause();
				}
			}
		});
			
		query();

		if(audio){

			audio.addEventListener('play',function(){
				$playToogle.children('.fa-play').hide();
				$playToogle.children('.fa-pause').show();
			});

			audio.addEventListener('pause',function(){
				$playToogle.children('.fa-play').show();
				$playToogle.children('.fa-pause').hide();
			});

			audio.addEventListener('ended',function(){
				++currentIndex;
				load(musicList[currentIndex]);
			});
		}
	};

	init();

/***/ }
/******/ ]);