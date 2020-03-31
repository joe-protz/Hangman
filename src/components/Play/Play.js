import React, { Fragment, useState } from 'react'
import { withRouter } from 'react-router-dom'
import ClickableLetter from './ClickableLetter'
import BadLetter from './BadLetter'
import { PrimaryButton } from '../Shared/Styled'
import ChangeWord from '../ChangeWord/ChangeWord'
import GuessWord from '../GuessWord/GuessWord'

const Play = ({
  guesses,
  setGuesses,
  availableLetters,
  correctLetters,
  incorrectLetters,
  secret,
  pushToCorrect,
  pushToIncorrect,
  removeAvailable,
  msgAlert,
  history,
  gameOver,
  setGameOver,
  resetGame,
  setSecret
}) => {
  const [alerted, setAlerted] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showGuessForm, setShowGuessForm] = useState(false)

  const resetGameAndAlert = () => {
    resetGame()
    setAlerted(false)
  }

  const toggleChangeWord = () => {
    setShowForm(!showForm)
  }

  const toggleGuessWord = () => {
    setShowGuessForm(!showGuessForm)
  }

  const guessWord = (word) => {
    if (word.toLowerCase() === secret.toLowerCase()) {
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

  if (!secret) {
    history.push('/')
  } else if (guesses === undefined) {
    history.push('/guesses')
  } else if (guesses === 0 && !gameOver) {
    setGameOver(true)
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
  } else if (gameOver && !alerted) {
    msgAlert({
      heading: 'Oops!',
      message: 'You ran out of guesses! Try again!',
      variant: 'danger'
    })
    setAlerted(true)
  }

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

  const wrongLetters = incorrectLetters.map(letter => (
    <BadLetter key={letter} letter={letter} wrong={true} />
  ))

  return (
    <Fragment>
      <h1>Guesses Left: {guesses}</h1>
      <p>
        Please click a letter to guess a letter or enter a word to guess the
        whole word
      </p>
      <PrimaryButton onClick={resetGameAndAlert}>Reset Guesses</PrimaryButton>
      {!showForm && !showGuessForm && (
        <PrimaryButton onClick={toggleChangeWord}>Change Word?</PrimaryButton>
      )}
      {!showGuessForm && !showForm && !gameOver && (
        <PrimaryButton onClick={toggleGuessWord}>
          Guess Full Word?
        </PrimaryButton>
      )}
      {showForm && (
        <ChangeWord
          toggleChangeWord={toggleChangeWord}
          resetGameAndAlert={resetGameAndAlert}
          setSecret={setSecret}
          msgAlert={msgAlert}
        />
      )}
      {showGuessForm && (
        <GuessWord guessWord={guessWord} toggleGuessWord={toggleGuessWord} msgAlert={msgAlert} />
      )}

      <h1>Available letters:</h1>
      {availableLetters}
      <div className="row mb-3">{revealedLetters}</div>
      <h1>Wrong letters:</h1>
      {wrongLetters}
    </Fragment>
  )
}

export default withRouter(Play)
