const {expect} = require('chai')
const db = require('../index')
const Song = db.model('song')

describe('Song model', () => {
  let song;
  before(async () => {
    song = await Song.create({
      spotifyId: '8432jksdi'
    })
  })

  it('creates a song instance with a spotify id', () => {
    expect(song.spotifyId).to.be.equal('8432jksdi')
  })

})
