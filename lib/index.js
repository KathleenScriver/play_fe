// This file is in the entry point in your webpack config.
import { MUSIXMATCH_API_KEY } from '../api'

const getSongResults = (artist) => {
  // const artist = $('.search-field').val();
  const apiKey = MUSIXMATCH_API_KEY;
  const url = `https://api.musixmatch.com/ws/1.1/track.search?apikey=${apiKey}&q_artist=${artist}&page_size=50`

  fetch(url)
    .then(response => response.json())
    .then(musicInfo => displaySongs(musicInfo))
    .catch(error => console.log({ error }));

  $('.search-field').val('');
}

const displaySongs = (musicInfo) => {
  const songs = musicInfo.message.body.track_list;
  songs.forEach(song => {
    let name = song.track.track_name;
    let artistName = song.track.artist_name;
    let genre = "Rock";
    let songRating = song.track.track_rating;

    $('.song-search').append(`
       <article class='searched-song'>
         <p class='name'>${name}</p>
         <p class='artist-name'>${artistName}</p>
         <p class='genre'>${genre}</p>
         <p class='song-rating'>${songRating}</p>
         <button id="${name}${artistName}"
           class='favorite-button'>Favorite</button>
        </article>
      `);
  });
};

$('.submit-button').on('click', getSongResults);

getSongResults("Queen");
