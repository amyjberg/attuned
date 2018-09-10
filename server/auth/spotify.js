const passport = require('passport')
const router = require('express').Router()
const SpotifyStrategy = require('passport-spotify').Strategy
const { User } = require('../db/models')

if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
  console.log('Spotify client ID / secret not found. Skipping Spotify OAuth')
} else {
  const spotifyConfig = {
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: process.env.SPOTIFY_CALLBACK
  }

  const strategy = new SpotifyStrategy(spotifyConfig, (accessToken, refreshToken, expiresIn, profile, done) => {
    const options = {
      where: {
        spotifyId: profile.id,
        spotifyUrl: profile.Url,
        accessToken: accessToken
      }
    }

    User.findOrCreate({ where: {spotifyId: profile.id} })
      .then(([user]) => user.update({ accessToken: accessToken }))
      .then(user => done(null, user))
      .catch(done)
  })

  passport.use(strategy)

  router.get('/', passport.authenticate('spotify', {
    scope: ['user-top-read', 'playlist-modify-private']
  }))

  router.get('/callback', passport.authenticate('spotify', { failureRedirect: '/login'}), (req, res, next) => {
    res.redirect('/home')
  })
}

module.exports = router
