const axios = require('axios')

class Lyrics {

  static findSongLyrics(trackName, artistName) {
    trackName = trackName.replace(' ', '%20')
    artistName = artistName.replace(' ', '%20')
    return axios.get(`https://orion.apiseeds.com/api/music/lyric/${artistName}/${trackName}?apikey=${process.env.LYRICS_APIKEY}`)
    // returns an object with a .track.text property that has the lyrics in a string
  }

  static analyizeSongLyrics(lyrics) {
    // return async call to our sentiment analysis api
  }

}

module.exports = Lyrics
