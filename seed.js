const { Question, Choice } = require('./server/db/models')
const db = require('./server/db')
// const pipeline = require('./pipeline')

const questions = [
  {
    id: 1,
    name: 'Which picture do you relate to today?',
    category: 'mood'
  }, {
    id: 2,
    name: 'Which emoji best matches your current emotional state?',
    category: 'mood'
  }, {
    id: 3,
    name: 'What dog are you at this moment?',
    category: 'mood'
  }, {
    id: 4,
    name: "It's time to go dancing! Take your pick:",
    category: 'energy'
  }, {
    id: 5,
    name: "What sounds like your ideal weekend?",
    category: 'energy'
  }, {
    id: 6,
    name: 'Would you rather:',
    category: 'energy'
  }
]

const choices = [
  {
    questionId: 1,
    label: 'I am doing just okay',
    value: 0,
    photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQeH8u6dW1BhPy91FFZzc2X_O1K3NdIWYZrF06WcZp_b8I_jFxYg'
  }, {
    questionId: 1,
    label: 'I am channeling this happy sunflower today',
    value: 1,
    photoUrl: 'http://www.droitwichadvertiser.co.uk/resources/images/5373199.jpg?display=1&htype=0&type=responsive-gallery'
  }, {
    questionId: 1,
    label: 'I feel cold and dead inside like this lonely tree',
    value: -1,
    photoUrl: 'http://onthedanforth.ca/wp-content/uploads/2012/01/1H_b_photo.jpg'
  }, {
    questionId: 2,
    label: ':D',
    value: 1,
    photoUrl: 'http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-11/256/cowboy-hat-face.png'
  }, {
    questionId: 2,
    label: ':/',
    value: 0,
    photoUrl: 'https://www.emojirequest.com/images/MehEmoji.jpg'
  }, {
    questionId: 2,
    label: ':(',
    value: -1,
    photoUrl: 'https://cdn.shopify.com/s/files/1/1061/1924/files/Angry_Emoji.png?9898922749706957214'
  }, {
    questionId: 3,
    label: 'I am a sad dog',
    value: -1,
    photoUrl: 'https://media.istockphoto.com/photos/cute-pug-with-sad-eyes-picture-id93276598?k=6&m=93276598&s=612x612&w=0&h=o_1ifcnV8iB-Ys-uJ13-YOjLCwEOTwsBvBtPzzwj_lA='
  }, {
    questionId: 3,
    label: 'I am a calm dog',
    value: 0,
    photoUrl: 'https://www.publicdomainpictures.net/pictures/60000/velka/dog-isolated-on-white-1379711918x5I.jpg'
  }, {
    questionId: 3,
    label: 'I am a happy dog',
    value: 1,
    photoUrl: 'https://i.imgflip.com/y80ss.jpg'
  }, {
    questionId: 4,
    label: 'Absolutely not',
    value: -1,
    photoUrl: 'http://www.clker.com/cliparts/3/t/E/u/v/x/red-not-sign-transparent-md.png'
  }, {
    questionId: 4,
    label: "Let's swing!",
    value: 1,
    photoUrl: 'https://i.pinimg.com/236x/5f/e2/3e/5fe23e53210a06d65cc4e582d5c20133--swing-dancing-ballrooms.jpg'
  }, {
    questionId: 4,
    label: "I'll take a graceful waltz",
    value: 0,
    photoUrl: 'https://img-aws.ehowcdn.com/560x560/photos.demandstudios.com/getty/article/246/47/72131206.jpg'
  }, {
    questionId: 5,
    label: 'Going to a concert by my favorite band or singer',
    value: 1,
    photoUrl: 'http://i.ebayimg.com/images/g/5OcAAOSwTuJYo4Jm/s-l1600.jpg'
  }, {
    questionId: 5,
    label: 'Sleeping in and then binging my favorite show on Netflix',
    value: -1,
    photoUrl: 'https://yorktownsentry.com/wp-content/uploads/2017/01/rsz_img_5415-900x600.jpg'
  }, {
    questionId: 5,
    label: 'Attending a game night with my friends',
    value: 0,
    photoUrl: 'https://ravereviews.org/wp-content/uploads/2017/05/10.-Clue.jpg'
  }, {
    questionId: 6,
    label: 'Talk on the phone?',
    value: 0,
    photoUrl: 'https://cdn4.vectorstock.com/i/1000x1000/20/08/retro-phone-conversation-vector-102008.jpg'
  }, {
    questionId: 6,
    label: 'Meet up in person?',
    value: 1,
    photoUrl: 'https://kugelmass.files.wordpress.com/2017/05/difficult-conversations.jpg?w=1400'
  }, {
    questionId: 6,
    label: 'Send a text?',
    value: -1,
    photoUrl: 'http://i.imgur.com/InVtN.png'
  }
]

const seed = () => {
  console.log('executing seed function')
  return Promise.all(questions.map(question => Question.create(question)))
  .then(() => Promise.all(choices.map(choice => {
      return Choice.create(choice)
    }))
  )
}

const main = () => {
  console.log('Syncing db...')
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding the database...')
      return seed()
    })
    .catch(err => {
      console.log('Error while seeding')
      console.log(err.message)
    })
    .then(() => {
      db.close()
      return null
    })
}

main()

