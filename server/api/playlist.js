const axios = require('axios')
const { User, Song } = require('../db/models')

const router = require('express').Router()

router.post('/spotify/:userId/tracks', async (req, res, next) => {
  try {
    const user = await User.findById(+req.params.userId)
    const spotifyId = user.spotifyId
    const { spotifyPlaylistId, trackUris } = req.body

    const { data } = await axios({
      method: 'post',
      url: `https://api.spotify.com/v1/users/${spotifyId}/playlists/${spotifyPlaylistId}/tracks`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
        "Content-Type": "application/json"
      },
      data: {
        uris: trackUris.split(',')
      }
    })

    res.json(data)
  } catch (err) { next(err) }
})

router.post('/spotify/:userId', async (req, res, next) => {
  try {
    const userId = +req.params.userId
    const user = await User.findById(userId)
    const spotifyId = user.spotifyId

    const { data } = await axios({
      method: 'post',
      url: `https://api.spotify.com/v1/users/${spotifyId}/playlists`,
      headers: { Authorization: `Bearer ${user.accessToken}` },
      data: { name: req.body.name, public: false }
    })

      res.status(201).json(data)
    } catch (err) { next(err) }
  })


router.post('/:userId', async (req, res, next) => {
  try {
    // song's energy score from db is between 0 and 1, so we want to shift the energy result to from [-1,1] so we can compare with what's in the database
    const energyResult = (+req.body.energy + 1) / 2 // shifts energy quiz result to be between 0 and 2, then divides to be between 0 and 1
    const moodResult = +req.body.mood // between -1 and 1
    const quizVector = [energyResult, moodResult]

    const user = await User.findById(+req.params.userId, {
      include: [{ model: Song }]
    })

    // currently getting all of a user's associated songs in the database
    const allSongs = await User.getSongs()

    const _distance = (vectorA, vectorB) => {
      // we know the vectors have 2 elements in them
      const energyDistanceSqd = Math.pow(vectorA[0] - vectorB[0], 2)
      const moodDistanceSqd = Math.pow(vectorA[1] - vectorB[1], 2)

      const distance = Math.sqrt(energyDistanceSqd + moodDistanceSqd)
      return distance
    }

    const compareFunction = (songA, songB) => {
      const vectorA = [songA.energyLevel, songA.sentimentScore]
      const vectorB = [songB.energyLevel, songB.sentimentScore]
      // compare each song's distance with the quizVector
      if (_distance(vectorA, quizVector) < _distance(vectorB, quizVector)) {
        return -1
      } else if (_distance(vectorA, quizVector) > _distance(vectorB, quizVector)) {
        return 1
      } else {
        return 0
      }
    }

    const sorted = allSongs.sort(compareFunction)
    // send back closest 5 fits
    res.json(sorted.slice(0, 5))

  } catch (err) { next(err) }
})


module.exports = router
