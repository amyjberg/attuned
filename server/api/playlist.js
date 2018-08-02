const axios = require('axios')
const { Spotify, Lyrics } = require('../db/models')

const router = require('express').Router()

router.get('/:searchTerm/:energy/:sentiment', async (req, res, next) => {
  try {
    // find the top 50 songs that match our track name search
    const tracks = await Spotify.findSongsBySearch(req.params.searchTerm)

    // make our string for a bulk audio features request and send the request out
    const trackIds = tracks.reduce((string, track) => {
      return string + track.id + ','
    }, '')
    const audioFeats = await Spotify.getAudioFeatures(trackIds.slice(0, trackIds.length - 1))// to cut off last comma

    // use our resulting data to make a playlist of song objects
    let playlist = Spotify.generatePlaylist(tracks, audioFeats)

    // now to find the lyrics information for each song and add it to each one...
    const lyricsArray = await Promise.all(playlist.map(song => {
      return Lyrics.findSongLyrics(song.name, song.artists[0])
      })
    )

    const scores = await Promise.all(lyricsArray.map(lyrics => {
        return Lyrics.analyzeSongLyrics(lyrics)
      })
    )

    // update playlist tracks with the appropriate scores
    playlist = playlist.map((song, index) => {
      return {...song, sentiment: scores[index]} // this is returning the correct index, right?
    })

    // send back the playlist info in JSON!
  } catch (err) { next (err) }

})

router.post('/:userId', async (req, res, next) => {
  try {
    // make sure req.body has the appropriately configured playlist object
    const submitted = await Spotify.submitPlaylist(req.body, req.params.userId)

    // if (!submitted) {
    //   const err = new Error('Unable to save your playlist to Spotify')
    //   err.status = 500
    //   return next(err)
    // }

    res.status(201).json(submitted)
  } catch (err) { next(err) }
})

module.exports = router
