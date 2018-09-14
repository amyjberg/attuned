
import {expect} from 'chai'
import { getUserSpotifyData, createPlaylist, resetPlaylist, savePlaylistToAccount } from '../store/songs'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'
import {User} from '../../server/db/models'
import db from '../../server/db'


const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = []

  beforeEach(() => {
    db.sync({force: true})
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
    db.truncate()
  })

  describe('getUserSpotifyData', () => {
    it('eventually dispatches gotUserRecs', async () => {
      mockAxios.onGet(`/api/users/1/spotify-recommendations`).replyOnce(201, 'success')
      await store.dispatch(getUserSpotifyData(1))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_USER_RECS')
    })
  })

  describe('createPlaylist', () => {
    it('eventually dispatches addSongs', async () => {
      const fakeSongs = ['song one', 'song two']
      mockAxios.onPost('/api/playlist/1').replyOnce(fakeSongs)
      await store.dispatch(createPlaylist(0, 0, 1))

      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('ADDED_SONGS')
      expect(actions[0].songs).to.be.equal(fakeSongs)
    })
  })

  describe('resetPlaylist', () => {
    it('', () => {})
  })

  describe('savePlaylistToAccount', () => {
    it('', () => {})
  })

})
