import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createPlaylist, savePlaylistToAccount } from '../store/songs';

class Result extends Component {
  constructor() {
    super()
    this.state = {
      submitToSpotify: false,
      name: '',
      submitted: false
    }
    this.saveToSpotify = this.saveToSpotify.bind(this)
    this.submitPlaylist = this.submitPlaylist.bind(this)
    this.renderButton = this.renderButton.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.renderScores = this.renderScores.bind(this)
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
    this.setState({
      submitted: true
    })
  }

  handleNameChange(evt) {
    this.setState({
      name: evt.target.value
    })
  }

  componentDidMount() {
    const { moodScore, energyScore, user } = this.props
    this.props.makePlaylist(moodScore, energyScore, user.id)
  }

  renderButton() {
    if (this.state.submitToSpotify) {
      return (
        <form onSubmit={this.submitPlaylist}>
          {/* <label htmlFor="name">Playlist Name:</label> */}
          <input
            type="name"
            name="name"
            value={this.state.name}
            onChange={this.handleNameChange}
            className="form-control form-control-lg"
            placeholder="Playlist name"
          />
          <button
            type="submit"
            disabled={!this.state.name}
            className="btn btn-lg btn-block"
          >
            Submit
          </button>
        </form>
      )
    } else {
      // we have not decided to save it to spotify
      return (
        <button
          onClick={this.saveToSpotify}
          className="btn btn-lg btn-block"
        >
        save as a spotify playlist
        </button>)
    }
  }

  renderScores() {
    const { moodScore, energyScore } = this.props
    let moodResult;
    if (moodScore >= .33) moodResult = 'positive'
    else if (moodScore >= -.33) moodResult = 'neutral'
    else moodResult = 'negative'

    let energyLevel;
    if (energyScore >= .33) energyLevel = 'high'
    else if (energyScore >= -.33) energyLevel = 'moderate'
    else energyLevel = 'low'

    return (
      <span>{`Your mood is ${moodResult} and your energy level is ${energyLevel}`}</span>
    )
  }

  render() {
    const { songs } = this.props
    if (this.state.submitted) {
      return <div className="submitted" >Your new playlist has been submitted!</div>
    }
    return (
      <div className="container">
      {
        this.renderScores()
      }
        <div className="playlist col shadow-lg p-3 mb-5 bg-white rounded">
          <h1 className="darkpurple" >try these songs:</h1>
          {
            songs.length ? songs.map(song => (
              <div
                key={song.id}
              >
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
          { this.renderButton() }
        </div>

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
