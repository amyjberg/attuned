const Sequelize = require('sequelize')
const db = require('../db')

const Song = db.define('song', {
  spotifyId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
  },
  url: {
    type: Sequelize.STRING
  },
  uri: {
    type: Sequelize.STRING,
  },
  artists: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  album: {
    type: Sequelize.STRING
  },
  energyLevel: {
    type: Sequelize.DECIMAL(10, 2)
  },
  lyrics: {
    type: Sequelize.TEXT
  },
  sentimentScore: {
    type: Sequelize.DECIMAL(10, 2)
  },
  sentimentMagnitude: {
    type: Sequelize.DECIMAL(10, 2)
  }
})

module.exports = Song
