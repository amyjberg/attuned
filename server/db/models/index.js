const User = require('./user')
const Lyrics = require('./Lyrics')
const Spotify = require('./Spotify')
const Question = require('./Questions')
const Choice = require('./Choice')
const Song = require('./Song')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Question.hasMany(Choice)
Choice.belongsTo(Question)

User.belongsToMany(Song, { through: 'user_song' })
Song.belongsToMany(User, { through: 'user_song' })

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User, Lyrics, Spotify, Question, Choice, Song
}
