const Sequelize = require('sequelize')
const db = require('../db')

const Choice = db.define('choices', {
  label: {
    type: Sequelize.STRING,
    allowNull: false
  },
  value: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  photoUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  }
})

module.exports = Choice
