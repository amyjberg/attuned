import axios from 'axios'
import history from '../history'

// ACTION TYPES
const ADD_SONGS = 'ADD_SONGS'
const CLEAR_PLAYLIST = 'CLEAR_PLAYLIST'

// INITIAL STATE
const initialState = []

// ACTION CREATORS
const addSongs = playlist => ({
  type: ADD_SONGS,
  songs: playlist
})

const clearPlaylist = () => ({
  type: CLEAR_PLAYLIST
})

// THUNK CREATORS
// need one for fetching the playlist based on the search
export const fetchPlaylistFromSearch = searchInfo => {
  return async dispatch => {
    // NOTE: make sure the search term we send to this thunk has already swapped spaces for '%20'
    const { searchTerm, energyLevel, mood } = searchInfo
      // we await a get request to spotify for the songs with that term
      const { data } = await axios.get(`https://api.spotify.com/v1/search/q=${searchTerm}&type=track&limit=50`)

      const playlist = []
      let trackIds = ""
      data.forEach(track => {
        playlist.push({
          id: track.id,
          album: track.album,
          artists: track.artists,
          name: track.name,
          uri: track.uri
        })
        trackIds += (track.id + ',')
      })

      // we await a get request to spotify for audio features for all of those songs
      const { data } = await axios.get(`https://api.spotify.com/v1/audio-features/?ids=${trackIds}`)

      data.forEach(trackInfo => {
        const track = playlist.find(elem => elem.id === trackInfo.id)
        track.energy = trackInfo.energy
        track.instrumentalness = trackInfo.instrumentalness
      }) // hopefully now our tracks in the playlist array have these features added onto them...

      // we filter based on the energy level in the results



    /*
      we await a get request/get requests for the lyrics of those songs (and add the lyrics as a property on our song object)

      we feed the lyrics into the sentiment analysis and add the score to our track object?
      *** we want each track object to have its spotify id, name, audio track, energy level, lyrics, and mood score ***
      we filter based on the mood score

    */

    dispatch(addSongs(playlist))
  }
}

// need one for clearing the playlist without saving to spotify
export const resetPlaylist = () => {
  return dispatch => {
    dispatch(clearPlaylist())
  }
}

// need one for saving the playlist to spotify (and then it clears the playlist on the store)
export const savePlaylistToAccount = (playlist, spotifyUserId) => {
  return async dispatch => {
    // need to configure playlist and send it with post request, check docs for what is required
    const { data } = await axios.post(`https://api.spotify.com/v1/users/${spotifyUserId}/playlists` )
    dispatch(clearPlaylist())
  }
}


// REDUCER

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SONGS:
      return action.songs
    case CLEAR_PLAYLIST:
      return []
    default:
      return state
  }
}

export default reducer
