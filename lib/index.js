// This file is in the entry point in your webpack config.
const getSongResults = () => {
  const artist = $('.search-field').val();
  const apiKey = process.env.MUSIXMATCH_API_KEY;
  const url = `https://api.musixmatch.com/ws/1.1/track.search?apikey=${apiKey}&q_artist=${artist}&page_size=50`

  fetch(url)
    .then(response => response.json())
    .then(musicInfo => displaySongs(musicInfo))
    .catch(error => console.log({ error }));

  $('.search-field').val('');
}

const displaySongs = (songInformation) => {
  console.log(songInformation);
}

$('.submit-button').on('click', getSongResults);
