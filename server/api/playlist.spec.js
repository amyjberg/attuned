const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('Playlist routes', () => {

  describe('POST /api/playlist/:userId', () => {
    // takes the user's scores and generates a playlist for them

  })

  describe('POST /api/playlist/spotify/:userId', () => {
    // creates the spotify playlist itself
  })

  describe('POST /api/playlist/spotify/:userId/tracks', () => {
    // fills the spotify playlist with the tracks

  })
})
