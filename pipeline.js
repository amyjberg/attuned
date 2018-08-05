const axios = require('axios')
const Song = require('./server/db/models')
const language = require('@google-cloud/language')
const client = new language.LanguageServiceClient()

async function fetchSongDataFromSpotify(trackName) {
  trackName = trackName.replace(' ', '%20')
  const { data } = await axios.get(`https://api.spotify.com/v1/search/q=${trackName}&type=track&limit=1`) // need to include 'authorization: bearer {my access token}' in the GET request

  return {
    spotifyId: data[0].id,
    album: data[0].album.name,
    artists: data[0].artists.map(artist => artist.name),
    name: data[0].name,
    uri: data[0].uri
  }
}

async function fetchSongLyrics(songObject) {
  const trackName = songObject.name.replace(' ', '%20')
  const artistName = songObject.artists[0].replace(' ', '%20')
  const response = await axios.get(`https://orion.apiseeds.com/api/music/lyric/${artistName}/${trackName}?apikey=Zw6fA18Cp0RuBQeKIObTB8U6fGBK0lx1BYzIXIyNriQxzhU95SsXJl6hi5fKfzCp`)
  const lyrics = response.track.text
  return lyrics
}

async function analyzeSongLyrics(lyrics) {
  // const results = await client.analyzeSentiment({
  //   content: lyrics,
  //   type: 'PLAIN_TEXT'
  // })
  // const sentiment = results[0].documentSentiment

  /*

  POST https://language.googleapis.com/v1/documents:analyzeSentiment?key=AIzaSyCKirhcF5eAbFtpkSUt0vuCpfSXyYPj4VU'

  */


  const { score, magnitude } = sentiment
  return { score, magnitude }
}

// remember to await this function when we call it!
async function pipeline(trackName) {
  const songData = await fetchSongDataFromSpotify(trackName)
  const lyrics = await fetchSongLyrics(songData)
  const sentimentObj = await analyzeSongLyrics(lyrics)
  return Song.create({
    ...songData,
    sentimentScore: sentimentObj.score,
    sentimentMagnitude: sentimentObj.magnitude
  })
}

module.exports = pipeline
