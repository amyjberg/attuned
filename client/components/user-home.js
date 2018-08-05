import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { getUserSpotifyData } from '../store/songs';
import MoodQuiz from './mood-quiz';

/**
 * COMPONENT
 */

class UserHome extends React.Component {

  componentDidMount() {
    if (this.props.user) this.props.fetchUserSongData(this.props.user.id)
  }

  render() {
    const { user } = this.props

    return (
      <div>
        <h3>Welcome, { user.spotifyId }</h3>
        <MoodQuiz />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    songs: state.songs
  }
}

const mapDispatch = dispatch => {
  return {
    fetchUserSongData: (id) => dispatch(getUserSpotifyData(id))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
