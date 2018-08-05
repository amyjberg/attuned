const Sequelize = require('sequelize')
const db = require('../db')

const Question = db.define('questions', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.ENUM('energy', 'mood')
  }
})

module.exports = Question
