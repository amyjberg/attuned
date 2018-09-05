const router = require('express').Router()
const { User, Song } = require('../db/models')
const axios = require('axios')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/spotify-recommendations', async function(req, res, next) {
  try {
    const user = await User.findById(+req.params.userId)
    const accessToken = user.accessToken
    const header = { headers: {
      Authorization: `Bearer ${accessToken}`
    }}

    console.log('==*== requesting user top tracks ==*==')
    const { data } = await axios.get('https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=short_term', header)
    let trackIds = data.items.reduce((string, track) => {
      string += (track.id + ',')
      return string
    }, '')
    trackIds = trackIds.slice(0, trackIds.length - 1)

    console.log("==*== getting recommendations based on those tracks ==*==")
    const recs = await axios.get(`https://api.spotify.com/v1/recommendations?seed_tracks=${trackIds}&limit=100`, header)
    let recIds = recs.data.tracks.reduce((string, track) => {
      string += (track.id + ',')
      return string
    }, '')
    recIds = recIds.slice(0, recIds.length - 1)

    console.log('==*== getting audio features for tracks ==*==')
    const audioFeatures = await axios.get(`https://api.spotify.com/v1/audio-features/?ids=${recIds}`, header)

    const songsArray = audioFeatures.data.audio_features.map(audioFeature => {
      const trackInfo = recs.data.tracks.find(track => track.id === audioFeature.id)
      return {
        spotifyId: trackInfo.id,
        album: trackInfo.album.name,
        artists: trackInfo.artists.map(artist => artist.name),
        name: trackInfo.name,
        uri: trackInfo.uri,
        energyLevel: audioFeature.energy,
        url: trackInfo.external_urls.spotify
      }
    })

    console.log('==*== finding song lyrics ==*==')
    const songInfoMusixmatch = await Promise.all(songsArray.map(song => {
      const name = encodeURIComponent(song.name)
      const artist = encodeURIComponent(song.artists[0])
      return axios.get(`https://api.musixmatch.com/ws/1.1/track.search?q_track=${name}&q_artist=${artist}&apikey=9c5411496232e141dfddda79d85fbdbf`)
    }))

    const musixMatchIds = songInfoMusixmatch.map(song => {
      if (song.data.message.body && song.data.message.body.track_list.length) {
        if (!song.data.message.body.track_list[0].track.has_lyrics) {
          return null
        }
        return song.data.message.body.track_list[0].track.track_id
      } else { return null }
    })

    // note that we will have some songs that we don't find any IDs for...
    console.log('==*== getting lyrics info ==*==')
    const lyricsInfo = await Promise.all(musixMatchIds.map(id => {
      if (id === null) return null
      else return axios.get(`https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${id}&apikey=9c5411496232e141dfddda79d85fbdbf`)
    }))

    const lyrics = lyricsInfo.map(infoObject => {
      if (!infoObject) return null
      else return infoObject.data.message.body.lyrics.lyrics_body
    })

    const lyricsAnalysis = await Promise.all(lyrics.map(songLyrics => {
      if (songLyrics) {
        const json = {
          "document":{
            "type":"PLAIN_TEXT",
            "content": songLyrics
          },
          "encodingType": "UTF8"
        }
        return axios.post(`https://language.googleapis.com/v1/documents:analyzeSentiment?key=AIzaSyCKirhcF5eAbFtpkSUt0vuCpfSXyYPj4VU`, json)
      } else {
        return null
      }
    }))

    const scores = lyricsAnalysis.map(analysis => {
      if (analysis) return analysis.data.documentSentiment
      else return null
    })

    console.log('==*== adding songs to database ==*==')
    const songs = await Promise.all(songsArray.map((song, index) => {
      if (scores[index]) {
        return Song.findOrCreate({
          where: { spotifyId: song.spotifyId },
          defaults: {
            album: song.album,
            artists: song.artists,
            name: song.name,
            uri: song.uri,
            url: song.url,
            energyLevel: song.energyLevel,
            sentimentScore: scores[index].score,
            sentimentMagnitude: scores[index].magnitude
          }
        })
      } else {
        return null
      }
    }))

    const songInstances = songs.filter(elem => {
      if (!elem) return false
      else return true
    }) // song is array with [instance, isNew]
    .map(song => song[0])

    await user.setSongs(songInstances.map(song => {
      return song.id
    }))

    res.status(201).json("success")
  } catch (err) { next(err) }
})
