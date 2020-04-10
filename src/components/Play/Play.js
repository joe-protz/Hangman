/* eslint-disable react/display-name */
import React, { Fragment, useState } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { Spring, animated, Transition } from 'react-spring/renderprops'

import ClickableLetter from './ClickableLetter'
import BadLetter from './BadLetter'
import { PrimaryButton } from '../Shared/Styled'
import ChangeWord from '../ChangeWord/ChangeWord'
import GuessWord from '../GuessWord/GuessWord'

import AbsoluteWrapper from '../Shared/AbsoluteWrapper'

// this is the main page to play the game. It handles most of the game logic and passes what is needed to app.js
const Play = ({
  // num of guesses and function to set them
  guesses,
  setGuesses,
  // access to avail letters arr
  availableLetters,
  // access to correct letters arr
  correctLetters,
  // access to incorrect letters arr
  incorrectLetters,
  // access to the secret word set in home component
  secret,
  // functions to change game state based on a letter chosen
  pushToCorrect,
  pushToIncorrect,
  removeAvailable,
  // the standard msg alert used
  msgAlert,
  // gameOver is defaulted to false and set to true whenever a game ending event happens, using setGameOver
  gameOver,
  setGameOver,
  // resetGame is called to play with the same exact secret and guesses again
  resetGame,
  // set the secret word
  setSecret
}) => {
  // have we already told the user about a game over?
  const [alerted, setAlerted] = useState(false)
  // should we show the change word form
  // TODO: rename
  const [showForm, setShowForm] = useState(false)
  // should we show the guess word form?
  const [showGuessForm, setShowGuessForm] = useState(false)
  const AnimatedLetter = animated(ClickableLetter)

  // const transitions = useTransition(availableLetters, availableLetters => availableLetters.key, {
  //   from: { opacity: 0, transform: 'translate(100%,0)' },
  //   enter: { opacity: 1, transform: 'translate(0,0)' },
  //   leave: { opacity: 0, transform: 'translate(-50%,0)' }
  // })

  // uses the resetGame function passed from app but also resets the alert state of play component
  const resetGameAndAlert = () => {
    resetGame()
    setAlerted(false)
  }
  // toggles view state of change word form
  const toggleChangeWord = () => {
    setShowForm(!showForm)
  }
  // toggles view state of guess word form
  const toggleGuessWord = () => {
    setShowGuessForm(!showGuessForm)
  }
  // function used by the guess word form to check if the word matches the secret
  const guessWord = (word) => {
    if (word.toLowerCase().trim() === secret.toLowerCase()) {
      setAlerted(true)
      msgAlert({
        heading: 'Congratulations',
        message: 'You successfully guessed the correct word!',
        variant: 'success'
      })
      setGameOver(true)
    } else {
      msgAlert({
        heading: 'Oops!',
        message: 'You guessed the incorrect word!',
        variant: 'danger'
      })
      setGuesses(guesses - 1)
    }
  }
  // TODO: Clean this up
  // If theres no secret or the guesses # is undefined we need to do these or the app wont work
  if (!secret) {
    return (
      <Redirect
        to={{
          pathname: '/',
          state: { from: location }
        }}
      />
    )
  } else if (guesses === undefined) {
    return (
      <Redirect
        to={{
          pathname: '/guesses',
          state: { from: location }
        }}
      />)
    // if the guesses hit 0 and it wasnt already a game over, now game is over.
    // needed because guesses # is not checked within letter click function or word guess function
  } else if (guesses === 0 && !gameOver) {
    setGameOver(true)
    // if every letter in the seret word is in the correct letters arr, we have a winner! Set alerted to true. Note we need to do the !Alerted check or we will cause an infinite loop of setState
  } else if (
    secret
      .toLowerCase()
      .split('')
      .every(letter => correctLetters.includes(letter)) &&
    !alerted
  ) {
    msgAlert({
      heading: 'Congratulations',
      message: 'You successfully guessed the correct word!',
      variant: 'success'
    })
    setAlerted(true)
    setGameOver(true)
    // self explantory.
  } else if (gameOver && !alerted) {
    msgAlert({
      heading: 'Oops!',
      message: 'You ran out of guesses! Try again!',
      variant: 'danger'
    })
    setAlerted(true)
  }
  // this is where we create the blank underlines at first, and every time a correct letter is found the state change will re-render , causing that letter to be revealed.
  const revealedLetters = secret.split('').map((letter, index) => {
    if (correctLetters.includes(letter.toLowerCase())) {
      return (
        <div className="col-1 rev p-0" key={index}>
          {letter}
        </div>
      )
    } else {
      return (
        <div className="col-1 rev p-0" key={index}>
          &nbsp;
        </div>
      )
    }
  })
  // we dont declare here because we're reusing the available letters variable passed in through app to create a pool of clickable green letters

  // const transitions = useTransition(availableLetters, item => item, {
  //   from: { opacity: 0},
  //   enter: { opacity: 1},
  //   leave: { opacity: 0}
  // })

  // const availHTML = transitions.map(({ item, props, key }) =>
  //   <AnimatedLetter key={key} style={props}
  //     pushToCorrect={pushToCorrect}
  //     pushToIncorrect={pushToIncorrect}
  //     secret={secret}
  //     removeAvailable={removeAvailable}
  //     letter={item}
  //     gameOver={gameOver}
  //     msgAlert={msgAlert}/>
  // )

  const availHTML = (
    <Transition
      items={availableLetters}
      keys={item => item}
      from={{ opacity: 0 }}
      enter={{ opacity: 1 }}
      leave={{ opacity: 0 }}
      // config={config.slow}
    >
      {/* {item => props => <div onClick={() => removeAvailable(item)} style={props}>{item}</div>} */}
      {item => props =>
        <AnimatedLetter
          style={props}
          pushToCorrect={pushToCorrect}
          pushToIncorrect={pushToIncorrect}
          secret={secret}
          removeAvailable={removeAvailable}
          letter={item}
          gameOver={gameOver}
          msgAlert={msgAlert}
        />
      }
    </Transition>
  )

  // availableLetters = availableLetters.map(letter => (
  //   <ClickableLetter
  //     key={letter}
  //     pushToCorrect={pushToCorrect}
  //     pushToIncorrect={pushToIncorrect}
  //     secret={secret}
  //     removeAvailable={removeAvailable}
  //     letter={letter}
  //     gameOver={gameOver}
  //     msgAlert={msgAlert}
  //   />
  // ))
  // this is similar except for clarity, it has a declaration
  const wrongLetters = incorrectLetters.map(letter => (
    <BadLetter key={letter} letter={letter} wrong={true} />
  ))

  return (
    <AbsoluteWrapper>
      <Fragment>
        {/* guesses will be dynamically updated from state rerenders */}
        <h1>Guesses Left: {guesses}</h1>
        <p>
          Please click a letter to guess a letter or enter a word to guess the
          whole word
        </p>
        {/* reset game button */}
        <PrimaryButton onClick={resetGameAndAlert}>Reset Guesses</PrimaryButton>
        {/* we want a double check here to stop a user from being able to open two forms at once, same with the next button */}
        {!showForm && !showGuessForm && (
          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
            leave={{ opacity: 0, transition: 'opacity .9s ease' }}
          >
            {props => (
              <div style={props}>
                <PrimaryButton onClick={toggleChangeWord}>
                  Change Word?
                </PrimaryButton>
              </div>
            )}
          </Spring>
        )}

        {/* again the double check because I didnt want to allow mutliple forms open. Also disabled if game is over, so that the player cant have access to a useless button */}
        {!showGuessForm && !showForm && !gameOver && (
          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
            leave={{ opacity: 0, margin: '50px' }}
          >
            {props => (
              <div style={props}>
                <PrimaryButton onClick={toggleGuessWord}>
                  Guess Full Word?
                </PrimaryButton>
              </div>
            )}
          </Spring>
        )}
        {/* change word form */}
        {showForm && (
          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
            leave={{ opacity: 0, margin: '50px' }}
          >
            {props => (
              <div style={props}>
                <ChangeWord
                  toggleChangeWord={toggleChangeWord}
                  resetGameAndAlert={resetGameAndAlert}
                  setSecret={setSecret}
                  msgAlert={msgAlert}
                />
              </div>
            )}
          </Spring>
        )}
        {/* guess word form */}
        {showGuessForm && (
          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
            leave={{ opacity: 0, margin: '50px' }}
          >
            {props => (
              <div style={props}>
                <GuessWord
                  guessWord={guessWord}
                  toggleGuessWord={toggleGuessWord}
                  msgAlert={msgAlert}
                />
              </div>
            )}
          </Spring>
        )}

        <h1>Available letters:</h1>
        {availHTML}
        <div className="row mb-3">{revealedLetters}</div>
        <h1>Wrong letters:</h1>
        {wrongLetters}
      </Fragment>
    </AbsoluteWrapper>
  )
}

export default withRouter(Play)
