//base URL for Play BE endpoints
const playBackUrl = 'https://play-be.herokuapp.com/api/v1'

const showMainDisplay = () => {
  $('.song-search').hide();
  $('.playlist-songs').hide();

  $('.playlist-drop-down').css('visibility', 'hidden');
};

const getFavorites = () => {
  fetch(`${playBackUrl}/favorites`)
    .then(response => response.json())
    .then(favoriteInfo => displayFavorites(favoriteInfo))
    .catch(error => console.log({ error }));
};

const displayFavorites = (favoriteSongs) => {
  favoriteSongs.forEach(song => {
    $('#favorite-song-list').append(`<tr value=${song.id}>
      <td>${song.name}</td>
      <td>${song.artist_name}</td>
      <td>${song.genre}</td>
      <td>${song.song_rating}</td>
      <td><button class='playlist-add-button'>Add to Playlist</button></td></tr>`)
  });
  setPlaylistSelectOptions();
};


const setPlaylistSelectOptions = () => {
  // get all Playlists from Andrew's fetch call
  // test names for now
  //also need to pull in the ids and pass them through to the list items
  let option1 = 'Rock';
  let option2 = 'Pop';

  $('.playlist-add-button').append(`<div class='playlist-drop-down'>
  <ul><li>${option1}</li>
  <li>${option2}</li>
  </ul></div>`)
}

const displayPlaylistOptions = (event) => {
  $('.playlist-drop-down').css('visibility', 'hidden');
  $(event.target).children().css('visibility', 'visible');
  $('.playlist-drop-down li').click((e) => {
    e.stopPropagation();
    let playlist = $(e.target).text();
    let songId = parseInt($(e.target).parents('tr').attr('value'));
    addSongToPlaylist(playlist, songId);
  })
};

const addSongToPlaylist = (playlist, songId) => {
  fetch(`${playBackUrl}/playlists/${playlist}/songs/${songId}`, {
    method: 'POST',
    headers: {"Content-Type": "application/json"}
  })
  .then(response => response.json())
  .then(message => addedSongToPlaylistResponse(message))
  .catch(error => ({ error }));
};

const addedSongToPlaylistResponse = (message) => {
  $('.messages').focus();
  $('.messages').html(`<p>${message}</p>`);
}


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
  $('.song-search').css('display', 'flex');
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
  $('.playlist-drop-down').css('visibility', 'hidden');
};

const clearMessages = () => {
  $('.messages').html('');
};

const getPlaylists = () => {
  fetch(`${playBackUrl}/playlists`)
    .then(response => response.json())
    .then(playlistsInfo => displayPlaylists(playlistsInfo))
    .catch(error => console.log({ error }));
}

const displayPlaylists = (playlistsInfo) => {
  const playlists = playlistsInfo;

  playlists.forEach((playlist, index) => {
    let playlist_name = playlist.playlist_name;
    let id = playlist.id;

    $('.playlists').append(`
      <article id="playlist-${index}" class='retrieved-playlist'>
        <div class='playlist-name'>
          <p id="${id}">${playlist_name}</p>
        </div>
      </article>`
    );
  });
};

const getOnePlaylist = event => {
  let playlist_name = $(event.target).text();
  let id = $(event.target).attr('id');
  fetch(`${playBackUrl}/playlists/${id}/songs`)
    .then(response => response.json())
    .then(playlistSongs => displayOnePlaylistsSongs(playlistSongs, playlist_name))
    .catch(error => console.log({ error }));
}

const displayOnePlaylistsSongs = (playlist) => {
  // $('.playlist-songs').html('<h2></h2>');
  $('.playlist-songs').css('display', 'block');
  const playlist_name = playlist.playlist_name
  const songs = playlist.songs;
  $('.playlist-songs h2').text(`${playlist_name}`);

  songs.forEach((song, index) => {
    let name = song.name;
    let artistName = song.artist_name;
    let genre = song.genre;
    let songRating = song.song_rating;
    $('.list-songs').append(`
       <article id="search-result-${index}" class='searched-song'>
         <p class='name'>${name}</p>
         <p class='artist-name'>${artistName}</p>
         <p class='genre'>${genre}</p>
         <p class='song-rating'>${songRating}</p>
        </article>
      `);
  });
}

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
$('#favorite-song-list').on('click', '.playlist-add-button', displayPlaylistOptions);


$('.playlists').on('click', '.playlist-name', getOnePlaylist);

getPlaylists();
getFavorites();
