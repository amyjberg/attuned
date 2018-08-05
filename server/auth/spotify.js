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
    console.log('=== profile', profile)
    console.log('** access token', accessToken)
    console.log(' ** refresh token', refreshToken)
    const options = {
      where: {
        spotifyId: profile.id,
        spotifyUrl: profile.Url,
        accessToken: accessToken
      }
    }

    // changing this to see if the access token updates
    User.findOrCreate({ where: {spotifyId: profile.id} })
      .then(([user]) => user.update({ accessToken: accessToken }))
      .then(user => done(null, user))
      .catch(done)
    // (err, user) => done(err, user)
  })

  passport.use(strategy)

  router.get('/', passport.authenticate('spotify', {
    scope: ['user-top-read', 'playlist-modify-private']
  }))

  router.get('/callback', passport.authenticate('spotify', { failureRedirect: '/login'}), (req, res, next) => {
    res.redirect('/home')
  })
}

// router.get('/', function(req, res) {
//   var scopes = 'playlist-modify-public user-read-email';
//   res.redirect('https://accounts.spotify.com/authorize' +
//     '?response_type=code' +
//     '&client_id=' + my_client_id +
//     (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
//     '&redirect_uri=' + encodeURIComponent('/'));
//   });

  /*

  to make a new playlist, POST https://api.spotify.com/v1/users/{user_id}/playlists

  */

  module.exports = router
