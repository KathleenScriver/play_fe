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
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _api = __webpack_require__(1);

	var getSongResults = function getSongResults() {
	  var artist = $('.search-field').val();
	  var apiKey = _api.MUSIXMATCH_API_KEY;
	  var url = 'https://api.musixmatch.com/ws/1.1/track.search?apikey=' + apiKey + '&q_artist=' + artist + '&page_size=50&s_track_rating=desc';

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
	    var artistName = song.track.artist_name;
	    var noGenre = song.track.primary_genres.music_genre_list.length === 0;
	    var genre = noGenre ? "N/A" : song.track.primary_genres.music_genre_list[0].music_genre.music_genre_name;
	    var songRating = song.track.track_rating;

	    $('.song-search').append('\n       <article class=\'searched-song\'>\n         <p class=\'name\'>' + name + '</p>\n         <p class=\'artist-name\'>' + artistName + '</p>\n         <p class=\'genre\'>' + genre + '</p>\n         <p class=\'song-rating\'>' + songRating + '</p>\n         <button id="' + name + artistName + '"\n           class=\'favorite-button\'>Favorite</button>\n        </article>\n      ');
	  });
	};

	$('.submit-button').on('click', getSongResults);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var MUSIXMATCH_API_KEY = exports.MUSIXMATCH_API_KEY = "ec2af6b6422141c1db6d05489b2a6be9";

/***/ })
/******/ ]);