const User = require('./user')
const Question = require('./Questions')
const Choice = require('./Choice')
const Song = require('./Song')

Question.hasMany(Choice)
Choice.belongsTo(Question)

User.belongsToMany(Song, { through: 'user_song' })
Song.belongsToMany(User, { through: 'user_song' })

module.exports = {
  User, Question, Choice, Song
}
