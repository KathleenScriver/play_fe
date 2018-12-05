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
    let title = song.track.track_name
    console.log(title)
  });
};

$('.submit-button').on('click', getSongResults);

getSongResults("Queen");
