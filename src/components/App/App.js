import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import Welcome from '../Welcome/Welcome'
import Guesses from '../Guesses/Guesses'
import Play from '../Play/Play'

class App extends Component {
  constructor () {
    super()

    this.state = {
      msgAlerts: [],
      guesses: undefined,
      availableLetters: [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z'
      ],
      correctLetters: [],
      incorrectLetters: [],
      secret: ''
    }
  }

  setSecret = secret => this.setState({ secret })
  setGuesses = guesses => this.setState({ guesses })
  removeAvailable = letter => {
    const updatedLetters = [...this.state.availableLetters]
    updatedLetters.splice(this.state.availableLetters.indexOf(letter), 1)
    this.setState({
      availableLetters: updatedLetters
    })
  }
  // used for a full reset
  resetBoard = () => {
    this.setState({
      availableLetters: [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z'
      ],
      correctLetters: [],
      incorrectLetters: [],
      guesses: undefined,
      secret: ''
    }
    )
  }
  pushToCorrect = letter =>
    this.setState({ correctLetters: [...this.state.correctLetters, letter] })

  pushToIncorrect = letter =>
    this.setState({
      incorrectLetters: [...this.state.incorrectLetters, letter],
      guesses: this.state.guesses - 1
    })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({
      msgAlerts: [...this.state.msgAlerts, { heading, message, variant }]
    })
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
          <Route
            exact
            path="/"
            render={() => (
              <Welcome msgAlert={this.msgAlert} setSecret={this.setSecret} />
            )}
          />

          <Route
            exact
            path="/guesses"
            render={() => (
              <Guesses
                msgAlert={this.msgAlert}
                secret={this.state.secret}
                setGuesses={this.setGuesses}
                resetBoard={this.resetBoard}
              />
            )}
          />
          <Route
            exact
            path="/play"
            render={() => (
              <Play
                guesses={this.state.guesses}
                availableLetters={this.state.availableLetters}
                correctLetters={this.state.correctLetters}
                incorrectLetters={this.state.incorrectLetters}
                secret={this.state.secret}
                pushToCorrect={this.pushToCorrect}
                pushToIncorrect={this.pushToIncorrect}
                removeAvailable={this.removeAvailable}
                msgAlert={this.msgAlert}
                incrementGuesses={this.incrementGuesses}
                resetBoard={this.resetBoard}
              />
            )}
          />
        </main>
      </Fragment>
    )
  }
}

export default App
