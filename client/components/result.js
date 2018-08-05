import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createPlaylist, savePlaylistToAccount } from '../store/songs';

class Result extends Component {
  // needs to have a button for saving the playlist and/or starting the quiz over
  // is that in another 'playlist' component that handles the audio?
  constructor() {
    super()
    this.state = {
      submitToSpotify: false,
      name: ''
    }
    this.saveToSpotify = this.saveToSpotify.bind(this)
    this.submitPlaylist = this.submitPlaylist.bind(this)
    this.renderButton = this.renderButton.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
  }

  saveToSpotify(evt) {
    evt.preventDefault()
    this.setState({
      submitToSpotify: true
    })
  }

  submitPlaylist(evt) {
    evt.preventDefault()
    const playlistObj = {
      name: this.state.name,
      songs: this.props.songs
    }
    this.props.savePlaylistToSpotify(playlistObj, this.props.user.id)
  }

  handleNameChange(evt) {
    this.setState({
      name: evt.target.value
    })
  }

  componentDidMount() {
    const { moodScore, energyScore, user } = this.props
    console.log('moodscore', moodScore, 'energyscore', energyScore)
    this.props.makePlaylist(moodScore, energyScore, user.id)
  }

  renderButton() {
    if (this.state.submitToSpotify) {
      return (
        <form onSubmit={this.submitPlaylist}>
          <label htmlFor="name">Playlist Name:</label>
          <input
            type="name"
            name="name"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
          <button type="submit" disabled={!this.state.name} >Submit</button>
        </form>
      )
    } else {
      // we have not decided to save it to spotify
      return <button onClick={this.saveToSpotify} >Save as a playlist to Spotify</button>
    }
  }

  render() {
    const { songs } = this.props

    return (
      <div>
        <h1>Try out these songs:</h1>

        {
          songs.length ? songs.map(song => (
            <div key={song.id}>
              <iframe
                src={`https://open.spotify.com/embed?uri=${song.uri}`}
                width="300"
                height="80"
                frameBorder="0"
                allowtransparency="true"
                allow="encrypted-media" >
              </iframe>
            </div>
          )
        ) : null
        }

        {
          this.renderButton()
        }
      </div>
    )
  }
}

const mapState = state => {
  return {
    songs: state.songs,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    makePlaylist: (moodScore, energyScore, userId) => dispatch(createPlaylist(moodScore, energyScore, userId)),
    savePlaylistToSpotify: (playlist, userId) => dispatch(savePlaylistToAccount(playlist, userId))
  }
}

export default connect(mapState, mapDispatch)(Result)
