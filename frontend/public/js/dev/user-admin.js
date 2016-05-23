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
	 *
	 * user-admin.
	 *
	 * @project     localhost_thonatos.com
	 * @datetime    23:14 - 16/5/23
	 * @author      Thonatos.Yang <thonatos.yang@gmail.com>
	 * @copyright   Thonatos.Yang <https://www.thonatos.com>
	 *
	 */

	Vue.config.delimiters = ['${', '}'];

	var data = {
	    mood: ''
	};

	var vm = new Vue({
	    el: '#mood-add',
	    data: data,
	    methods: {
	        postMood: function (e) {
	            e.preventDefault();
	            vm.$log();

	            $.post('/api/moods/mood', data)
	                .success(function (response) {
	                    console.log(response);
	                    if(response.errors) {
	                        alert(response.message);
	                        return;
	                    }

	                    if(response.code === "600"){
	                        alert(response.msg);
	                        return;
	                    }

	                    data.mood = '';
	                    alert('add release success');
	                })
	                .fail(function() {
	                    alert('net work error or server error');
	                })

	        },
	        load: function() {
	        }
	    }
	});

	$(document).ready(function () {
	    console.log(vm);
	});

/***/ }
/******/ ]);