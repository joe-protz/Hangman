import React, { useState, useEffect, useCallback } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import AnimatedLetters from '../AnimatedLetters'
import RevealedLetters from '../RevealedLetters'
import CustomCheckbox from '../CustomCheckbox'

import PrimaryButton from '../Shared/Styled'
import ChangeWord from '../ChangeWord'
import GuessWord from '../GuessWord'

import { Modal } from 'react-bootstrap'

import './Play.scss'

import AbsoluteWrapper from '../Shared/AbsoluteWrapper'

import FireworksComponent from '../Fireworks'
import AnimatedShowGeuessWordBtn from '../AnimatedShowGuessWordBtn'
import AnimatedShowSecretWordFormBtn from '../AnimatedShowSecretWordFormBtn'

const LETTERS = [
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
]
// this is the main page to play the game. It handles most of the game
// logic and passes what is needed to app.js
const Play = ({
  guesses,
  setGuesses,
  defaultGuesses,
  secret,
  setSecret,
  msgAlert
}) => {
  // game states -------
  const [won, setWon] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [availableLetters, setAvailableLetters] = useState(LETTERS)
  const [correctLetters, setCorrectLetters] = useState([])
  const [incorrectLetters, setIncorrectLetters] = useState([])

  // view states --------
  const [alerted, setAlerted] = useState(false)
  const [showSecretWordForm, setShowSecretWordForm] = useState(false)
  const [showGuessForm, setShowGuessForm] = useState(false)
  const [showFireworks, setShowFireworks] = useState(false)
  const [allowAnimations, setAllowAnimations] = useState(false)

  if (!secret) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    )
  } if (guesses === undefined) {
    return (
      <Redirect
        to={{
          pathname: '/guesses'
        }}
      />
    )
  }

  useEffect(() => {
    resetAllButSecretAndGuesses()
    return () => {
      cleanUp()
    }
  }, [])

  useEffect(() => {
    if (didWin() && !alerted) {
      triggerWin()
    } else if (guesses === 0 && !gameOver && !alerted) {
      msgAlert({
        heading: 'Oops!',
        message: 'You ran out of guesses! Try again!',
        variant: 'danger'
      })
      setAlerted(true)
      setGameOver(true)
      setWon(false)
    }
  }, [guesses, correctLetters])

  const removeAvailable = letter => {
    const updatedLetters = [...availableLetters]
    updatedLetters.splice(availableLetters.indexOf(letter), 1)
    setAvailableLetters(updatedLetters)
  }

  const pushToCorrect = letter => {
    if (!correctLetters.includes(letter)) {
      setCorrectLetters([...correctLetters, letter])
    }
  }

  const pushValue = useCallback(letter => {
    if (gameOver) {
      msgAlert({
        heading: 'Oops!',
        message: 'Game is over, please click reset to play again',
        variant: 'danger'
      })
      return
    }
    if (secret.toLowerCase().includes(letter)) {
      pushToCorrect(letter)
    } else {
      pushToIncorrect(letter)
    }
    removeAvailable(letter)
  }
  )

  const pushToIncorrect = letter => {
    if (!incorrectLetters.includes(letter)) {
      setGuesses(guesses - 1)
      setIncorrectLetters([...incorrectLetters, letter])
    }
  }

  const resetAllButSecretAndGuesses = () => {
    setCorrectLetters([])
    setIncorrectLetters([])
    setAvailableLetters(LETTERS)
    setGameOver(false)
    setWon(false)
  }

  const resetGame = () => {
    setCorrectLetters([])
    setIncorrectLetters([])
    setGuesses(defaultGuesses)
    setAvailableLetters(LETTERS)
    setGameOver(false)
    setWon(false)
  }

  const cleanUp = () => {
    setSecret('')
    setGuesses(undefined)
  }

  const didWin = () => secret
    .toLowerCase()
    .split('')
    .filter(letter => letter !== ' ')
    .every(letter => correctLetters.includes(letter))

  const triggerWin = () => {
    msgAlert({
      heading: 'Congratulations',
      message: 'You successfully guessed the correct word!',
      variant: 'success'
    })
    const secretArr = secret.toLowerCase().split('')
    setCorrectLetters(secretArr)
    setShowFireworks(true)
    setWon(true)
    setGameOver(true)
    setAlerted(true)
    setTimeout(() => {
      setShowFireworks(false)
    }, 5000)
  }

  const resetGameAndAlert = () => {
    resetGame()
    setAlerted(false)
  }

  const toggleChangeWord = () => {
    setShowSecretWordForm(!showSecretWordForm)
  }

  const toggleGuessWord = () => {
    setShowGuessForm(!showGuessForm)
  }

  const guessWord = word => {
    if (word.toLowerCase().trim() === secret.toLowerCase()) {
      triggerWin()
    } else {
      msgAlert({
        heading: 'Oops!',
        message: 'You guessed the incorrect word!',
        variant: 'danger'
      })
      setGuesses(guesses - 1)
    }
  }

  // vars used for logic on what to show
  const showGuessWordBtn = !showGuessForm && !showSecretWordForm && !gameOver
  const showSecretWordFormButton = !showSecretWordForm && !showGuessForm
  const activeFireworks = showFireworks && allowAnimations

  return (
    <AbsoluteWrapper>

      <div className="main-shadow">
        <div>
          <p>
          Please click a letter to guess a letter or enter a word to guess the
          whole word.
          </p>
          <CustomCheckbox
            onChange={() => setAllowAnimations(!allowAnimations)}
            checked={allowAnimations}
          />
          {/* reset game button */}

          <div className="inner-shadow">
            <PrimaryButton onClick={resetGameAndAlert}>
            Reset Guesses
            </PrimaryButton>

            {/* THIS IS THE BUTTON TO SHOW THE CHANGE WORD FORM */}
            <AnimatedShowSecretWordFormBtn
              showSecretWordFormButton={showSecretWordFormButton}
              toggleChangeWord={toggleChangeWord}
            />
            {/* THIS IS THE BUTTON TO SHOW GUESS WORD FORM */}
            <AnimatedShowGeuessWordBtn
              showGuessWordBtn={showGuessWordBtn}
              toggleGuessWord={toggleGuessWord}
            />
            {/* CHANGE WORD FORM */}
            <Modal show={showSecretWordForm} onHide={toggleChangeWord}>
              <div style={{ padding: '35px' }} >
                <Modal.Header closeButton style={{ marginBottom: '15px' }}>
                  <Modal.Title>Change Secret Word</Modal.Title>
                </Modal.Header>
                <ChangeWord
                  toggleChangeWord={toggleChangeWord}
                  resetGameAndAlert={resetGameAndAlert}
                  setSecret={setSecret}
                  msgAlert={msgAlert}
                />
              </div>
            </Modal>
            {/* GUESS WORD FORM */}
            <Modal show={showGuessForm} onHide={toggleGuessWord}>
              <div style={{ padding: '35px' }}>
                <Modal.Header closeButton style={{ marginBottom: '15px' }}>
                  <Modal.Title>Guess Secret Word</Modal.Title>
                </Modal.Header>

                <GuessWord
                  guessWord={guessWord}
                  toggleGuessWord={toggleGuessWord}
                  msgAlert={msgAlert}
                />

              </div>
            </Modal>

          </div>
        </div>
        <AnimatedLetters
          availableLetters={availableLetters}
          onClick={pushValue}
          incorrectLetters={incorrectLetters}
        />

        <RevealedLetters
          secret={secret}
          correctLetters={correctLetters}
          gameOver={gameOver}
          guesses={guesses}
          won={won}
        />

        {/* <AnimatedBadLetters
          incorrectLetters={incorrectLetters}
        /> */}
        {activeFireworks && <FireworksComponent />}
      </div>

    </AbsoluteWrapper>
  )
}

export default withRouter(Play)
