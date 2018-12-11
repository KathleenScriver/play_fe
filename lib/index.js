//base URL for Play BE endpoints
const playBackUrl = 'https://play-be.herokuapp.com/api/v1'

const showMainDisplay = () => {
  $('.song-search').hide();
};

const getSongResults = () => {
  $('.song-search').html('');
  const artist = $('.search-field').val();
  const apiKey = process.env.MUSIXMATCH_API_KEY;
  const url = `https://api.musixmatch.com/ws/1.1/track.search?apikey=${apiKey}&q_artist=${artist}&page_size=50&s_track_rating=desc`;

  fetch(url)
    .then(response => response.json())
    .then(musicInfo => displaySongs(musicInfo))
    .catch(error => console.log({ error }));

  $('.search-field').val('');
}

const displaySongs = (musicInfo) => {
  $('.song-search').css('display', 'block');
  const songs = musicInfo.message.body.track_list;

  songs.forEach((song, index) => {
    let name = song.track.track_name;
    let artistName = song.track.artist_name;
    let noGenre = song.track.primary_genres.music_genre_list.length === 0;
    let genre = noGenre ? "N/A" : song.track.primary_genres.music_genre_list[0].music_genre.music_genre_name;
    let songRating = song.track.track_rating;

    $('.song-search').append(`
       <article id="search-result-${index}" class='searched-song'>
         <p class='name'>${name}</p>
         <p class='artist-name'>${artistName}</p>
         <p class='genre'>${genre}</p>
         <p class='song-rating'>${songRating}</p>
         <button class='favorite-button'>Favorite</button>
        </article>
      `);
  });
};

const favoriteSong = event => {
  let name = $(event.target).siblings('p.name').text();
  let artistName = $(event.target).siblings('p.artist-name').text();
  let genre = $(event.target).siblings('p.genre').text();
  let songRating = parseInt($(event.target).siblings('p.song-rating').text());

  fetch(`${playBackUrl}/songs`, {
    method: 'POST',
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({
      name: name,
      artist_name: artistName,
      genre: genre,
      song_rating: songRating
    })
  }).then(response => response.json())
    .then(songResponse => addFavoriteResponse(songResponse))
  .catch(error => ({ error }))
};

const addFavoriteResponse = (response) => {
  let songName = response.songs.name;
  $('.messages').html(`<p>${songName} has been added to your favorites!</p>`).focus();
};

const clearMessages = () => {
  $('.messages').html('');
};

$('.submit-button').on('click', getSongResults);

$("#search-field").keypress(function(e) {
    if(e.which == 13) {
      e.preventDefault();
      $(".submit-button").click();
    }
});

$('.song-search').on('click', '.favorite-button', favoriteSong);
$(document).on('click', clearMessages);
$('.home').on('click', showMainDisplay);
