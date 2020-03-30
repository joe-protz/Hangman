import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import Welcome from '../Welcome/Welcome'

class App extends Component {
  constructor () {
    super()

    this.state = {
      msgAlerts: [],
      guesses: undefined,
      availableLetters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
      correctLetters: [],
      incorrectLetters: [],
      secret: ''
    }
  }

  setSecret = secret => this.setState({ secret })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route exact path='/' render={() => (
            <Welcome
              setSecret={this.setSecret}
            />
          )}/>
        </main>
      </Fragment>
    )
  }
}

export default App
