import React, { Fragment, useState } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { useTransition, animated } from 'react-spring'

import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import Welcome from '../Welcome/Welcome'
import Guesses from '../Guesses/Guesses'
import Play from '../Play/Play'

const App = () => {
  // used to create a default to avoid making user always have to write number of guesses on new game
  const [defaultGuesses, setDefaultGuesses] = useState(undefined)

  const [gameOver, setGameOver] = useState(false)
  const [msgAlerts, setMsgAlerts] = useState([])
  const [guesses, setGuesses] = useState(undefined)
  const [availableLetters, setAvailableLetters] = useState([
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
  ])
  const [correctLetters, setCorrectLetters] = useState([])
  const [incorrectLetters, setIncorrectLetters] = useState([])
  const [secret, setSecret] = useState('')

  const location = useLocation()

  const transitions = useTransition(location, location => location.pathname, {
    native: true,
    initial: null,
    from: { opacity: 0, transform: 'translate(100%,0)' },
    enter: { opacity: 1, transform: 'translate(0,0)' },
    leave: { opacity: 0, transform: 'translate(-50%,0)' }
  })

  // removes a letter from the available letters array
  const removeAvailable = letter => {
    const updatedLetters = [...availableLetters]
    updatedLetters.splice(availableLetters.indexOf(letter), 1)
    setAvailableLetters(updatedLetters)
  }
  // used for a full reset
  const resetBoard = () => {
    setIncorrectLetters([])
    setCorrectLetters([])
    setGuesses(undefined)
    setAvailableLetters([
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
    ])
    setSecret('')
    setGameOver(false)
  }
  // used to reset all states except for the secret word, specifically used as a check on unmount of setting a new word
  const resetAllButSecret = () => {
    setCorrectLetters([])
    setIncorrectLetters([])

    setAvailableLetters([
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
    ])
    setGameOver(false)
  }
  // resets game state but leaves the secret and guess number
  const resetAllButSecretAndGuesses = () => {
    setCorrectLetters([])
    setIncorrectLetters([])

    setAvailableLetters([
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
    ])
    setGameOver(false)
  }
  // resets game back to last used guess # and word
  const resetGame = () => {
    setCorrectLetters([])
    setIncorrectLetters([])

    setGuesses(defaultGuesses)
    setAvailableLetters([
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
    ])
    setGameOver(false)
  }
  // pushes a letter to the correctLetter arr
  const pushToCorrect = letter => {
    if (!correctLetters.includes(letter)) {
      setCorrectLetters([
        ...correctLetters,
        letter
      ])
    }
  }
  // pushes a letter to incorrectLetters Arr
  const pushToIncorrect = letter => {
    if (!incorrectLetters.includes(letter)) {
      setGuesses(guesses - 1)
      setIncorrectLetters([...incorrectLetters, letter])
    }
  }

  // used for app-wide messages
  const msgAlert = ({ heading, message, variant }) => {
    setMsgAlerts(
      [...msgAlerts, { heading, message, variant }]
    )
  }

  return (
    <Fragment>
      <Header defaultGuesses={defaultGuesses} />
      {msgAlerts.map((msgAlert, index) => (
        <AutoDismissAlert
          key={index}
          heading={msgAlert.heading}
          variant={msgAlert.variant}
          message={msgAlert.message}
        />
      ))}
      {/* routes */}
      <main className="container">
        {transitions.map(({ item, props, key }) => (
          <animated.div native='true' key={key} style={props}>
            <Switch location={item}>
              {/* home */}
              <Route
                exact
                path="/"
                render={() => (
                  <Welcome
                    msgAlert={msgAlert}
                    resetAllButSecret={resetAllButSecret}
                    setSecret={setSecret}
                  />
                )}
              />

              <Route
                exact
                path="/guesses"
                render={() => (
                  <Guesses
                    msgAlert={msgAlert}
                    secret={secret}
                    setGuesses={setGuesses}
                    resetAllButSecretAndGuesses={resetAllButSecretAndGuesses}
                    setDefaultGuesses={setDefaultGuesses}
                  />
                )}
              />
              <Route
                exact
                path="/play"
                render={() => (
                  <Play
                    guesses={guesses}
                    availableLetters={availableLetters}
                    correctLetters={correctLetters}
                    incorrectLetters={incorrectLetters}
                    secret={secret}
                    setSecret={setSecret}
                    pushToCorrect={pushToCorrect}
                    pushToIncorrect={pushToIncorrect}
                    removeAvailable={removeAvailable}
                    msgAlert={msgAlert}
                    resetBoard={resetBoard}
                    gameOver={gameOver}
                    setGameOver={setGameOver}
                    setGuesses={setGuesses}
                    resetGame={resetGame}
                  />
                )}
              />
            </Switch>
          </animated.div>
        ))}
      </main>
    </Fragment>
  )
}

export default App
