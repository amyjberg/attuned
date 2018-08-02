const axios = require('axios')

class Spotify {

  static findSongsBySearch(searchTerm) {
    return axios.get(`https://api.spotify.com/v1/search/q=${searchTerm}&type=track&limit=50`)
  }

  static getAudioFeatures(trackIdsString) {
    return axios.get(`https://api.spotify.com/v1/audio-features/?ids=${trackIdsString}`)
  }

  static generatePlaylist(tracks, audioFeatures) {
    const playlist = []
    // generate a playlist of objects with the info that we care about
    tracks.forEach(track => {
      const feat = audioFeatures.find(trackInfo => trackInfo.id === track.id)
      playlist.push({
        id: track.id,
        album: track.album,
        artists: track.artists,
        name: track.name,
        uri: track.uri,
        energy: feat.energy,
        instrumentalness: feat.instrumentalness
      })
    })
    return playlist
  }

  static submitPlaylist(playlist, spotifyUserId) {
    // must get the appropriately configured playlist object
    return axios.post(`https://api.spotify.com/v1/users/${spotifyUserId}/playlists`, playlist)
  }

}

module.exports = Spotify
