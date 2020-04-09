import React, { Fragment, useState } from 'react'
import { withRouter } from 'react-router-dom'
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
  // history is used to push a new page
  history,
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
    history.push('/')
  } else if (guesses === undefined) {
    history.push('/guesses')
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
  availableLetters = availableLetters.map(letter => (
    <ClickableLetter
      key={letter}
      pushToCorrect={pushToCorrect}
      pushToIncorrect={pushToIncorrect}
      secret={secret}
      removeAvailable={removeAvailable}
      letter={letter}
      gameOver={gameOver}
      msgAlert={msgAlert}
    />
  ))
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
          <PrimaryButton onClick={toggleChangeWord}>Change Word?</PrimaryButton>
        )}

        {/* again the double check because I didnt want to allow mutliple forms open. Also disabled if game is over, so that the player cant have access to a useless button */}
        {!showGuessForm && !showForm && !gameOver && (
          <PrimaryButton onClick={toggleGuessWord}>
            Guess Full Word?
          </PrimaryButton>
        )}
        {/* change word form */}
        {showForm && (
          <ChangeWord
            toggleChangeWord={toggleChangeWord}
            resetGameAndAlert={resetGameAndAlert}
            setSecret={setSecret}
            msgAlert={msgAlert}
          />
        )}
        {/* guess word form */}
        {showGuessForm && (
          <GuessWord
            guessWord={guessWord}
            toggleGuessWord={toggleGuessWord}
            msgAlert={msgAlert}
          />
        )}

        <h1>Available letters:</h1>
        {availableLetters}
        <div className="row mb-3">{revealedLetters}</div>
        <h1>Wrong letters:</h1>
        {wrongLetters}
      </Fragment>
    </AbsoluteWrapper>
  )
}

export default withRouter(Play)
