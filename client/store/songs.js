import axios from 'axios'
import history from '../history'
import { runInNewContext } from 'vm';

// ACTION TYPES
const ADD_SONGS = 'ADD_SONGS'
const CLEAR_PLAYLIST = 'CLEAR_PLAYLIST'
const GOT_USER_RECS = 'GOT_USER_RECS'

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

const gotUserRecs = () => ({
  type: GOT_USER_RECS
})

// THUNK CREATORS
export const getUserSpotifyData = (userId) => {
  return async dispatch => {
    try {
      await axios.get(`/api/users/${userId}/spotify-recommendations`)
      dispatch(gotUserRecs())
    } catch (err) { console.error(err) }
  }
}

export const createPlaylist = (moodScore, energyScore, userId) => {
  return async dispatch => {
    try {
      const score = { mood: moodScore, energy: energyScore }
      const { data } = await axios.post(`/api/playlist/${userId}`, score)
      dispatch(addSongs(data))
    } catch (err) { console.error(err) }
  }
}

export const resetPlaylist = () => {
  return dispatch => {
    dispatch(clearPlaylist())
  }
}

export const savePlaylistToAccount = (playlist, userId) => {
  return async dispatch => {
    // playlist object must have playlist.name, playlist.songs
    try {
      const { data } = await axios.post(`/api/playlist/spotify/${userId}`, { name: playlist.name }) // this works -- I make the empty playlist

      const spotifyPlaylistId = data.id
      let trackUris = playlist.songs.reduce((string, song) => {
        string += (song.uri + ',')
        return string
      }, '')
      trackUris = trackUris.slice(0, trackUris.length - 1)

      const res = await axios.post(`/api/playlist/spotify/${userId}/tracks`, { spotifyPlaylistId, trackUris })

      dispatch(clearPlaylist())
    } catch (err) { console.error(err) }
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
