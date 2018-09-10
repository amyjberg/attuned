const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Song = db.model('song')

describe('Playlist routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('POST /api/playlist/:userId', () => {
    // takes the user's scores and generates a playlist for them
    beforeEach(async () => {
      await User.create({spotifyId: 1})
      return Song.bulkCreate([
      { spotifyId: '5byerP6yub0Elj1gZS8DAJ',
        album: 'Let The Music Take You Home',
        artists: [ 'Seamus Kennedy' ],
        name: 'The Old Dun Cow',
        uri: 'spotify:track:5byerP6yub0Elj1gZS8DAJ',
        energyLevel: 0.336,
        sentimentScore: -.35,
        url: 'https://open.spotify.com/track/5byerP6yub0Elj1gZS8DAJ', userId: 1
      },
      { spotifyId: '6K9cjIloubdwJxwxrDcETI',
        album: 'Live At The Gaiety',
        artists: [ 'The Dubliners' ],
        name: 'The Wild Rover',
        uri: 'spotify:track:6K9cjIloubdwJxwxrDcETI',
        energyLevel: 0.678,
        sentimentScore: -.15,
        url: 'https://open.spotify.com/track/6K9cjIloubdwJxwxrDcETI',
        userId: 1
      },
      { spotifyId: '2OLTFf6VeS2v8WoEl9uKMA',
        album: 'Legacy, Vol. 2',
        artists: [ 'Celtic Thunder' ],
        name: 'Song for Mira',
        uri: 'spotify:track:2OLTFf6VeS2v8WoEl9uKMA',
        energyLevel: 0.27,
        sentimentScore: .18,
        url: 'https://open.spotify.com/track/2OLTFf6VeS2v8WoEl9uKMA', userId: 1
      },
      { spotifyId: '59Y2VYsl2fdXKDABg85GwK',
        album: 'Ireland\'s Fight for Freedom - Irish Revolutionary Songs',
        artists: [ 'Declan Hunt' ],
        name: 'Old Fenian Gun',
        uri: 'spotify:track:59Y2VYsl2fdXKDABg85GwK',
        energyLevel: 0.339,
        sentimentScore: 0,
        url: 'https://open.spotify.com/track/59Y2VYsl2fdXKDABg85GwK',
        userId: 1
      }
      ])
    })

    it('sends back an array of songs', async () => {
      const res = await request(app)
        .post('/api/playlist/1', {})

        expect(res.body).to.be.an('array')
        expect(res.body.length).to.be.equal(4)
    })

  })

  describe('POST /api/playlist/spotify/:userId', () => {
    // creates the spotify playlist itself
  })

  describe('POST /api/playlist/spotify/:userId/tracks', () => {
    // fills the spotify playlist with the tracks

  })
})
