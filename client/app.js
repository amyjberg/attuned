import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

class App extends React.Component {


  componentDidMount() {
    // first call to '/authorize' with client ID, scopes, redirect URI
    // wait until user is logged in

  }

  render () {
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    )

  }
}

export default App

// make axios request to spotify with token info
