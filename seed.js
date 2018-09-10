const { Question, Choice, Song, User } = require('./server/db/models')
const db = require('./server/db')
// seed file with some dummy data

const songs = [ { spotifyId: '5byerP6yub0Elj1gZS8DAJ',
    album: 'Let The Music Take You Home',
    artists: [ 'Seamus Kennedy' ],
    name: 'The Old Dun Cow',
    uri: 'spotify:track:5byerP6yub0Elj1gZS8DAJ',
    energyLevel: 0.336,
    sentimentScore: -.35,
    url: 'https://open.spotify.com/track/5byerP6yub0Elj1gZS8DAJ' },
  { spotifyId: '6K9cjIloubdwJxwxrDcETI',
    album: 'Live At The Gaiety',
    artists: [ 'The Dubliners' ],
    name: 'The Wild Rover',
    uri: 'spotify:track:6K9cjIloubdwJxwxrDcETI',
    energyLevel: 0.678,
    sentimentScore: -.15,
    url: 'https://open.spotify.com/track/6K9cjIloubdwJxwxrDcETI' },
  { spotifyId: '2OLTFf6VeS2v8WoEl9uKMA',
    album: 'Legacy, Vol. 2',
    artists: [ 'Celtic Thunder' ],
    name: 'Song for Mira',
    uri: 'spotify:track:2OLTFf6VeS2v8WoEl9uKMA',
    energyLevel: 0.27,
    sentimentScore: .18,
    url: 'https://open.spotify.com/track/2OLTFf6VeS2v8WoEl9uKMA' },
  { spotifyId: '59Y2VYsl2fdXKDABg85GwK',
    album: 'Ireland\'s Fight for Freedom - Irish Revolutionary Songs',
    artists: [ 'Declan Hunt' ],
    name: 'Old Fenian Gun',
    uri: 'spotify:track:59Y2VYsl2fdXKDABg85GwK',
    energyLevel: 0.339,
    sentimentScore: 0,
    url: 'https://open.spotify.com/track/59Y2VYsl2fdXKDABg85GwK' },
  { spotifyId: '7kHP9gaEmlKlozYPZ2fqXQ',
    album: 'Noel Mcloughlin: 20 Best of Scotland',
    artists: [ 'Noel McLoughlin' ],
    name: 'Dainty Davy',
    uri: 'spotify:track:7kHP9gaEmlKlozYPZ2fqXQ',
    energyLevel: 0.325,
    sentimentScore: .55,
    url: 'https://open.spotify.com/track/7kHP9gaEmlKlozYPZ2fqXQ' },
  { spotifyId: '21DAVW4hpNujQ3r6Z5wqcZ',
    album: 'Drunken Sailor',
    artists: [ 'The Irish Rovers' ],
    name: 'The Titanic',
    uri: 'spotify:track:21DAVW4hpNujQ3r6Z5wqcZ',
    energyLevel: 0.773,
    sentimentScore: -.10,
    url: 'https://open.spotify.com/track/21DAVW4hpNujQ3r6Z5wqcZ' },
  { spotifyId: '3ssP3yeuMdZ7nIovybPVbb',
    album: 'Going to California',
    artists: [ 'Johnny McEvoy' ],
    name: 'Partners in Rhyme',
    uri: 'spotify:track:3ssP3yeuMdZ7nIovybPVbb',
    energyLevel: 0.359,
    sentimentScore: .88,
    url: 'https://open.spotify.com/track/3ssP3yeuMdZ7nIovybPVbb' },
  { spotifyId: '5Zuew0YXLsVcIkNBsDanm0',
    album: 'At Home',
    artists: [ 'Paddy Reilly' ],
    name: 'Come out You Black and Tans',
    uri: 'spotify:track:5Zuew0YXLsVcIkNBsDanm0',
    energyLevel: 0.232,
    sentimentScore: -.22,
    url: 'https://open.spotify.com/track/5Zuew0YXLsVcIkNBsDanm0' },
  { spotifyId: '7Ia9chy3jVERVyxU4jPEgw',
    album: 'The Collection',
    artists: [ 'Luke Kelly' ],
    name: 'Hand Me Down Me Bible',
    uri: 'spotify:track:7Ia9chy3jVERVyxU4jPEgw',
    energyLevel: 0.437,
    sentimentScore: .42,
    url: 'https://open.spotify.com/track/7Ia9chy3jVERVyxU4jPEgw' },
  { spotifyId: '1b8CLaBsauux81W2FlacSB',
    album: 'Let It Be',
    artists: [ 'Dolores Keane' ],
    name: 'Faraway in Australia',
    uri: 'spotify:track:1b8CLaBsauux81W2FlacSB',
    energyLevel: 0.314,
    sentimentScore: .24,
    url: 'https://open.spotify.com/track/1b8CLaBsauux81W2FlacSB' },
  { spotifyId: '6kTIl8HDI68OVj4ZpGJfUg',
    album: 'Home In Halifax',
    artists: [ 'Stan Rogers' ],
    name: 'Field Behind The Plow',
    uri: 'spotify:track:6kTIl8HDI68OVj4ZpGJfUg',
    energyLevel: 0.211,
    sentimentScore: 0,
    url: 'https://open.spotify.com/track/6kTIl8HDI68OVj4ZpGJfUg' },
  { spotifyId: '3Vu5UB1OmwlrmhK2jjwYfV',
    album: 'Travellin\' People from Ireland',
    artists: [ 'Pecker Dunne' ],
    name: 'The Last of the Travellin\' People',
    uri: 'spotify:track:3Vu5UB1OmwlrmhK2jjwYfV',
    energyLevel: 0.454,
    sentimentScore: .34,
    url: 'https://open.spotify.com/track/3Vu5UB1OmwlrmhK2jjwYfV' },
  { spotifyId: '5fUlXgTxI6lvxasDJYw976',
    album: 'Basement Sessions 2',
    artists: [ 'Johnny McEvoy' ],
    name: 'I Wish I Had Someone to Love Me',
    uri: 'spotify:track:5fUlXgTxI6lvxasDJYw976',
    energyLevel: 0.558,
    sentimentScore: -.25,
    url: 'https://open.spotify.com/track/5fUlXgTxI6lvxasDJYw976' },
  { spotifyId: '5dIJnnUysRsRegYTCtXB5F',
    album: 'The Best Ever Collection Of Irish Pub Songs - Volume 1',
    artists: [ 'Ronnie Drew' ],
    name: 'Johnston\'s Motor Car',
    uri: 'spotify:track:5dIJnnUysRsRegYTCtXB5F',
    energyLevel: 0.493,
    sentimentScore: .32,
    url: 'https://open.spotify.com/track/5dIJnnUysRsRegYTCtXB5F' },
  { spotifyId: '6LJguzrbZMzXMGN7eoXJ1k',
    album: 'Sunny Spells and Scattered Showers',
    artists: [ 'Solas' ],
    name: 'The Wind That Shakes the Barley',
    uri: 'spotify:track:6LJguzrbZMzXMGN7eoXJ1k',
    energyLevel: 0.701,
    sentimentScore: .24,
    url: 'https://open.spotify.com/track/6LJguzrbZMzXMGN7eoXJ1k' },
  { spotifyId: '0J9q5OSiyqFdUcch4483gu',
    album: 'The Holy Grail of Irish Drinking Songs',
    artists: [ 'Brobdingnagian Bards' ],
    name: 'Health to the Company',
    uri: 'spotify:track:0J9q5OSiyqFdUcch4483gu',
    energyLevel: 0.398,
    sentimentScore: .56,
    url: 'https://open.spotify.com/track/0J9q5OSiyqFdUcch4483gu' },
  { spotifyId: '4C9ImaUCXWyxwm1jGFTwsC',
    album: 'The Fureys & Davy Arthur Live',
    artists: [ 'The Fureys', 'Davey Arthur' ],
    name: 'Siege Of A Nation',
    uri: 'spotify:track:4C9ImaUCXWyxwm1jGFTwsC',
    energyLevel: 0.633,
    sentimentScore: .20,
    url: 'https://open.spotify.com/track/4C9ImaUCXWyxwm1jGFTwsC' },
  { spotifyId: '5XUO5vZRvZZjmVqow2RPwg',
    album: 'alterum',
    artists: [ 'Julie Fowlis', 'Gillebrìde Macmillan' ],
    name: 'Camariñas',
    uri: 'spotify:track:5XUO5vZRvZZjmVqow2RPwg',
    sentimentScore: 0,
    energyLevel: 0.206,
    url: 'https://open.spotify.com/track/5XUO5vZRvZZjmVqow2RPwg' },
  { spotifyId: '6hmlm4Cz8Y5IYdYLEQPTej',
    album: '1916 Easter Rising (Commemorative Collection)',
    artists: [ 'Johnny McEvoy' ],
    name: 'The Famine Song',
    uri: 'spotify:track:6hmlm4Cz8Y5IYdYLEQPTej',
    energyLevel: 0.253,
    sentimentScore: -.65,
    url: 'https://open.spotify.com/track/6hmlm4Cz8Y5IYdYLEQPTej' },
  { spotifyId: '0AmVF6PBvNGyTtkckGmBiA',
    album: 'Unrepentant Fenians EP',
    artists: [ 'The Irish Brigade' ],
    name: 'Mairéad Farrell',
    uri: 'spotify:track:0AmVF6PBvNGyTtkckGmBiA',
    energyLevel: 0.305,
    sentimentScore: 0,
    url: 'https://open.spotify.com/track/0AmVF6PBvNGyTtkckGmBiA' },
  { spotifyId: '6xO1Egci5AmEX0nqrz7JGh',
    album: 'Twenty Five Years-Twenty Five Songs',
    artists: [ 'Mary Black', 'Emmylou Harris & Dolores Keane' ],
    name: 'Sonny',
    uri: 'spotify:track:6xO1Egci5AmEX0nqrz7JGh',
    energyLevel: 0.272,
    sentimentScore: .40,
    url: 'https://open.spotify.com/track/6xO1Egci5AmEX0nqrz7JGh' },
  { spotifyId: '7iEm7q2jttXJFgUd4BxmBS',
    album: 'On the Road',
    artists: [ 'Christy Moore' ],
    name: 'Viva la Quinte Brigada',
    uri: 'spotify:track:7iEm7q2jttXJFgUd4BxmBS',
    energyLevel: 0.647,
    sentimentScore: 0,
    url: 'https://open.spotify.com/track/7iEm7q2jttXJFgUd4BxmBS' },
  { spotifyId: '7dnxzifPalcybP0kwyKmb3',
    album: 'Real Men Wear Kilts',
    artists: [ 'Brobdingnagian Bards' ],
    name: 'Donald, Where\'s Your Drunken Scotsman?',
    uri: 'spotify:track:7dnxzifPalcybP0kwyKmb3',
    energyLevel: 0.685,
    sentimentScore: .24,
    url: 'https://open.spotify.com/track/7dnxzifPalcybP0kwyKmb3' },
  { spotifyId: '02hdRZyZKaa4GgpxNHsRVJ',
    album: 'Basement Sessions 2',
    artists: [ 'Johnny McEvoy' ],
    name: 'Youre So Far Away',
    uri: 'spotify:track:02hdRZyZKaa4GgpxNHsRVJ',
    energyLevel: 0.43,
    sentimentScore: -.33,
    url: 'https://open.spotify.com/track/02hdRZyZKaa4GgpxNHsRVJ' },
  { spotifyId: '3p9ZXjsFdQcc46QT7frbk0',
    album: 'The Definitive Collection',
    artists: [ 'Luke Kelly' ],
    name: 'The Net Hauling Song',
    uri: 'spotify:track:3p9ZXjsFdQcc46QT7frbk0',
    energyLevel: 0.664,
    sentimentScore: 0,
    url: 'https://open.spotify.com/track/3p9ZXjsFdQcc46QT7frbk0' },
  { spotifyId: '2wHazI8eC7RehhMTK39PUl',
    album: '101 Irish Party Favourites!',
    artists: [ 'Paddy Reilly' ],
    name: 'The Craic Was 90 in the Isle of Man',
    uri: 'spotify:track:2wHazI8eC7RehhMTK39PUl',
    energyLevel: 0.662,
    sentimentScore: 0,
    url: 'https://open.spotify.com/track/2wHazI8eC7RehhMTK39PUl' },
  { spotifyId: '1FHp07p1T7AzEUv32Ik9eQ',
    album: 'The Irish Rovers 50 Years - Vol. 1',
    artists: [ 'The Irish Rovers' ],
    name: 'Wasn’t That a Party',
    uri: 'spotify:track:1FHp07p1T7AzEUv32Ik9eQ',
    energyLevel: 0.78,
    sentimentScore: .67,
    url: 'https://open.spotify.com/track/1FHp07p1T7AzEUv32Ik9eQ' },
  { spotifyId: '7D0Eof1AkuPwHUFnkCQhEe',
    album: 'Mary Black Sings Jimmy MacCarthy',
    artists: [ 'Mary Black' ],
    name: 'Another Day',
    uri: 'spotify:track:7D0Eof1AkuPwHUFnkCQhEe',
    energyLevel: 0.541,
    sentimentScore: .10,
    url: 'https://open.spotify.com/track/7D0Eof1AkuPwHUFnkCQhEe' }
 ]

const questions = [
  {
    id: 1,
    name: 'Which picture do you relate to today?',
    category: 'mood'
  }, {
    id: 2,
    name: 'Choose a cute crochet cactus:',
    category: 'mood'
  }, {
    id: 3,
    name: 'What dog are you at this moment?',
    category: 'mood'
  }, {
    id: 4,
    name: "It's time to get some exercise! Take your pick:",
    category: 'energy'
  }, {
    id: 5,
    name: "What sounds like your ideal weekend?",
    category: 'energy'
  }, {
    id: 6,
    name: 'What would you rather do:',
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
    label: 'I am channeling this happy sunflower',
    value: 1,
    photoUrl: 'http://www.droitwichadvertiser.co.uk/resources/images/5373199.jpg?display=1&htype=0&type=responsive-gallery'
  }, {
    questionId: 1,
    label: 'I feel cold and dead inside like this lonely tree',
    value: -1,
    photoUrl: 'https://cdn.tookapic.com/photos/2017/351/d/0/d05155184caeb2f1ee94364be9c952eb.jpg?w=770&q=90&sharp=3&s=903478cadcb64cdb3018b08d7b1c9048'
  }, {
    questionId: 2,
    label: 'This optimistic cactus that is ready to embrace life',
    value: 1,
    photoUrl: 'https://images.ecosia.org/wpyxu17CJzhxsv88ggqgsmZdXjY=/0x390/smart/http%3A%2F%2Ffc03.deviantart.net%2Ffs70%2Fi%2F2010%2F214%2F5%2Fd%2FCactus_Amigurumi_by_e1fy.jpg'
  }, {
    questionId: 2,
    label: 'This pleasant cactus that is happy in a restrained way',
    value: 0,
    photoUrl: 'https://images.ecosia.org/k9OvRN7x7igqE49MO6PD1bKrU3o=/0x390/smart/https%3A%2F%2Fs-media-cache-ak0.pinimg.com%2F736x%2Fa0%2F50%2F2a%2Fa0502a197ebda52a15aac81002ef60b7.jpg'
  }, {
    questionId: 2,
    label: 'This sad cactus who is just trying to grin and bear it through the pain',
    value: -1,
    photoUrl: 'https://images.ecosia.org/JgDJd4YqXjqMRlnCcS4lVWFZsQE=/0x390/smart/https%3A%2F%2Fi.pinimg.com%2F736x%2F19%2Fd8%2F97%2F19d897dcb280a4efde0a8b026a8e52c0--crochet-pincushion-crochet-cactus.jpg'
  }, {
    questionId: 3,
    label: 'Right now I am the sad dog',
    value: -1,
    photoUrl: 'https://media.istockphoto.com/photos/cute-pug-with-sad-eyes-picture-id93276598?k=6&m=93276598&s=612x612&w=0&h=o_1ifcnV8iB-Ys-uJ13-YOjLCwEOTwsBvBtPzzwj_lA='
  }, {
    questionId: 3,
    label: 'I am the calm dog',
    value: 0,
    photoUrl: 'https://www.publicdomainpictures.net/pictures/60000/velka/dog-isolated-on-white-1379711918x5I.jpg'
  }, {
    questionId: 3,
    label: 'I am the happy dog',
    value: 1,
    photoUrl: 'https://i.imgflip.com/y80ss.jpg'
  }, {
    questionId: 4,
    label: "I'll drive the golf cart",
    value: -1,
    photoUrl: 'http://www.gorillagolfblog.com/wp-content/uploads/2011/09/Golf-Cart-on-a-golf-course.jpg'
  }, {
    questionId: 4,
    label: "Let's go dancing!",
    value: 0,
    photoUrl: 'https://i.pinimg.com/236x/5f/e2/3e/5fe23e53210a06d65cc4e582d5c20133--swing-dancing-ballrooms.jpg'
  }, {
    questionId: 4,
    label: "There's nothing quite like some competitive rock climbing",
    value: 1,
    photoUrl: 'http://extras.mnginteractive.com/live/media/site25/2011/0109/20110109__10cdsss4w_500.jpg'
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
    label: 'Stroll through the park',
    value: 0,
    photoUrl: 'https://images.ecosia.org/NlbOedOwTtapZDutflmz4_vOYhk=/0x390/smart/http%3A%2F%2Ftraveldigg.com%2Fwp-content%2Fuploads%2F2016%2F05%2FCentral-Park-Summer-Walkway.jpg'
  }, {
    questionId: 6,
    label: 'Play laser tag',
    value: 1,
    photoUrl: 'https://images.ecosia.org/zLQiEHd6AS05Dgj96GGJcbpJcFg=/0x390/smart/https%3A%2F%2F3.bp.blogspot.com%2F-ZcWpSukayTw%2FV0wAe5NWzHI%2FAAAAAAAAYxU%2F8J0fkz1QZwsL8KRPIfx8r9C3Kr8KwlTpACKgB%2Fs1600%2FDSC_0864.JPG'
  }, {
    questionId: 6,
    label: 'Take a nap',
    value: -1,
    photoUrl: 'https://images.ecosia.org/f06b7ePIIozVnMnWb7W7NgTN37I=/0x390/smart/http%3A%2F%2Fadultswithautism.org.uk%2Fwp-content%2Fuploads%2F2016%2F07%2F021285784_web.jpeg'
  }
]

const seed = () => {
  console.log('executing seed function')
  return Promise.all(questions.map(question => Question.create(question)))
  .then(() => Promise.all(choices.map(choice => {
      return Choice.create(choice)
    })))
  .then(() => Promise.all(songs.map(song => Song.create({ ...song, userId: 1 }))))
  .then(async (songInstances) => {
    const user = await User.create({id: 1, spotifyId: 'aberga14'})
    return user.setSongs(songInstances)
    })
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


