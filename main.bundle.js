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

  
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _api = __webpack_require__(1);

	var getSongResults = function getSongResults(artist) {
	  // const artist = $('.search-field').val();
	  var apiKey = _api.MUSIXMATCH_API_KEY;
	  var url = 'https://api.musixmatch.com/ws/1.1/track.search?apikey=' + apiKey + '&q_artist=' + artist + '&page_size=50';

	  fetch(url).then(function (response) {
	    return response.json();
	  }).then(function (musicInfo) {
	    return displaySongs(musicInfo);
	  }).catch(function (error) {
	    return console.log({ error: error });
	  });

	  $('.search-field').val('');
	}; // This file is in the entry point in your webpack config.


	var displaySongs = function displaySongs(musicInfo) {
	  var songs = musicInfo.message.body.track_list;
	  songs.forEach(function (song) {
	    var name = song.track.track_name;
	    var artist_name = song.track.artist_name;
	    var genre = "Rock";
	    var songRating = song.track.track_rating;

	    $('.song-search').append('\n       <article class=\'searched-song\'>\n         <p class=\'name\'>' + name + '</p>\n         <p class=\'artist-name\'>' + artist_name + '</p>\n         <p class=\'genre\'>' + genre + '</p>\n         <p class=\'song-rating\'>' + songRating + '</p>\n         <button id="' + name + (artist - name) + '"\n           class=\'favorite-button\'>Favorite</button>\n        </article>\n      ');
	  });
	};

	$('.submit-button').on('click', getSongResults);

	getSongResults("Queen");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var MUSIXMATCH_API_KEY = exports.MUSIXMATCH_API_KEY = "b321359d9ba9b1a4f059db39f0b4c442";


/***/ })
/******/ ]);