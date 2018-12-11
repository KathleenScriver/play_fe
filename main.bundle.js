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

	//base URL for Play BE endpoints
	var playBackUrl = 'https://play-be.herokuapp.com/api/v1';

	var getSongResults = function getSongResults() {
	  $('.song-search').html('');
	  var artist = $('.search-field').val();
	  var apiKey = ("b321359d9ba9b1a4f059db39f0b4c442");
	  var url = 'https://api.musixmatch.com/ws/1.1/track.search?apikey=' + apiKey + '&q_artist=' + artist + '&page_size=50&s_track_rating=desc';

	  fetch(url).then(function (response) {
	    return response.json();
	  }).then(function (musicInfo) {
	    return displaySongs(musicInfo);
	  }).catch(function (error) {
	    return console.log({ error: error });
	  });

	  $('.search-field').val('');
	};

	var displaySongs = function displaySongs(musicInfo) {
	  var songs = musicInfo.message.body.track_list;

	  songs.forEach(function (song, index) {
	    var name = song.track.track_name;
	    var artistName = song.track.artist_name;
	    var noGenre = song.track.primary_genres.music_genre_list.length === 0;
	    var genre = noGenre ? "N/A" : song.track.primary_genres.music_genre_list[0].music_genre.music_genre_name;
	    var songRating = song.track.track_rating;
	    $('.song-search').append('\n       <article id="search-result-' + index + '" class=\'searched-song\'>\n         <p class=\'name\'>' + name + '</p>\n         <p class=\'artist-name\'>' + artistName + '</p>\n         <p class=\'genre\'>' + genre + '</p>\n         <p class=\'song-rating\'>' + songRating + '</p>\n         <button class=\'favorite-button\'>Favorite</button>\n        </article>\n      ');
	  });
	};

	var favoriteSong = function favoriteSong(event) {
	  var name = $(event.target).siblings('p.name').text();
	  var artistName = $(event.target).siblings('p.artist-name').text();
	  var genre = $(event.target).siblings('p.genre').text();
	  var songRating = parseInt($(event.target).siblings('p.song-rating').text());

	  fetch(playBackUrl + '/songs', {
	    method: 'POST',
	    headers: { "Content-Type": "application/json" },
	    body: JSON.stringify({
	      name: name,
	      artist_name: artistName,
	      genre: genre,
	      song_rating: songRating
	    })
	  }).then(function (response) {
	    return response.json();
	  }).then(function (songResponse) {
	    return addFavoriteResponse(songResponse);
	  }).catch(function (error) {
	    return { error: error };
	  });
	};

	var addFavoriteResponse = function addFavoriteResponse(response) {
	  var songName = response.songs.name;
	  $('.messages').html('<p>' + songName + ' has been added to your favorites!</p>').focus();
	};

	var clearMessages = function clearMessages() {
	  $('.messages').html('');
	};

	$('.submit-button').on('click', getSongResults);

	$("#search-field").keypress(function (e) {
	  if (e.which == 13) {
	    e.preventDefault();
	    $(".submit-button").click();
	  }
	});

	$('.song-search').on('click', '.favorite-button', favoriteSong);
	$(document).on('click', clearMessages);

/***/ })
/******/ ]);