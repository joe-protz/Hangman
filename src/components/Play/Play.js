/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

import ClickableLetter from './ClickableLetter'
import BadLetter from './BadLetter'
import { PrimaryButton } from '../Shared/Styled'
import ChangeWord from '../ChangeWord/ChangeWord'
import GuessWord from '../GuessWord/GuessWord'

import './Play.scss'

import AbsoluteWrapper from '../Shared/AbsoluteWrapper'

import { Spring, Transition, animated } from 'react-spring/renderprops'
import FireworksComponent from '../Fireworks/Fireworks'

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
  setSecret,
  won,
  setWon,
  setCorrectLetters
}) => {
  // have we already told the user about a game over?
  const [alerted, setAlerted] = useState(false)
  // should we show the change word form
  // TODO: rename
  const [showForm, setShowForm] = useState(false)
  // should we show the guess word form?
  const [showGuessForm, setShowGuessForm] = useState(false)
  // while(true)fireworks will fill screen
  const [showFireworks, setShowFireworks] = useState(false)
  // celebrate a win with fireworks? mapped to a checkbox below
  const [allowAnimations, setAllowAnimations] = useState(false)

  // return if the user won
  const didWin = () => {
    return secret
      .toLowerCase()
      .split('')
      .every(letter => correctLetters.includes(letter))
  }
  // trigger msgAlrts and/or fireworks based on game state
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
    }
  }, [guesses, correctLetters])

  // used to trigger win animations and game state change
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
  }

  // this is where we create the blank underlines at first, and every time a correct letter is found the state change will re-render , causing that letter to be revealed.
  const revealedLetters = secret.split('').map((letter, index) => {
    if (correctLetters.includes(letter.toLowerCase())) {
      return (
        <div className="col-1 rev p-0 school-font" key={index}>
          {letter}
        </div>
      )
    } else {
      return (
        <div className="col-1 rev p-0 school-font" key={index}>
          &nbsp;
        </div>
      )
    }
  })

  // the html of clickable letters, mapped using a Transition renderProp
  const availHTML = (
    <Transition
      items={availableLetters}
      keys={item => item}
      initial={null}
      from={{
        opacity: 0,
        maxWidth: '0px',
        overflow: 'hidden',
        padding: '0em 0em',
        margin: '0em'
      }}
      enter={{
        opacity: 1,
        maxWidth: '100px',
        overflow: 'visible',
        padding: '0.25em 1em',
        margin: '0.3em'
      }}
      leave={{ opacity: 0, maxWidth: '0px', padding: '0em 0em', margin: '0em' }}
    >
      {letter => props => (
        <ClickableLetter
          style={{ ...props, transition: 'ease' }}
          pushToCorrect={pushToCorrect}
          pushToIncorrect={pushToIncorrect}
          secret={secret}
          removeAvailable={removeAvailable}
          letter={letter}
          gameOver={gameOver}
          msgAlert={msgAlert}
        />
      )}
    </Transition>
  )

  // this is similar except for non-clickable letters in 'wrong letter' pool
  const wrongLetters = (
    <Transition
      items={incorrectLetters}
      keys={item => item}
      from={{ opacity: 0, transform: 'translate(0,-300px)' }}
      enter={{ opacity: 1, transform: 'translate(0,0)' }}
      leave={{ opacity: 0, transform: 'translate(0,-300px)' }}
    >
      {letter => props => (
        <BadLetter letter={letter} wrong={true} style={props} />
      )}
    </Transition>
  )

  // vars used for logic on what to show
  const showGuessWordBtn = !showGuessForm && !showForm && !gameOver
  const showFormButton = !showForm && !showGuessForm
  const activeFireworks = showFireworks && allowAnimations

  return (
    <AbsoluteWrapper>
      <div className="main-shadow">
        {/* guesses will be dynamically updated from state rerenders */}
        <p>
          Please click a letter to guess a letter or enter a word to guess the
          whole word
        </p>
        {/* all of this classname crap is for a custom checkbox */}
        <div className="custom-control custom-checkbox">
          <input
            id="animation-checkbox"
            className="ml-2 custom-control-input"
            type="checkbox"
            onChange={() => setAllowAnimations(!allowAnimations)}
            checked={allowAnimations}
          />
          <label className="custom-control-label" htmlFor="animation-checkbox">
            Would you like to allow animations for correct guesses?
          </label>
        </div>
        {/* reset game button */}
        <div className="inner-shadow">
          <PrimaryButton onClick={resetGameAndAlert}>
            Reset Guesses
          </PrimaryButton>

          {/* THIS IS THE BUTTON TO SHOW THE CHANGE WORD FORM */}
          <Transition
            items={showFormButton}
            initial={null}
            from={{ opacity: 0, maxHeight: 0, overflow: 'hidden' }}
            enter={{ opacity: 1, maxHeight: 'auto' }}
            leave={{ opacity: 0, maxHeight: 0 }}
          >
            {showFormButton =>
              showFormButton &&
              (props => (
                <PrimaryButton style={props} onClick={toggleChangeWord}>
                  Change Word?
                </PrimaryButton>
              ))
            }
          </Transition>

          {/* THIS IS THE BUTTON TO SHOW GUESS WORD FORM */}
          <Transition
            items={showGuessWordBtn}
            initial={null}
            from={{
              opacity: 0,
              maxHeight: 0,
              overflow: 'hidden',
              transform: 'translate(100%,0)'
            }}
            enter={{
              opacity: 1,
              maxHeight: 'auto',
              transform: 'translate(0,0)'
            }}
            leave={{ opacity: 0, maxHeight: 0 }}
          >
            {showGuessWordBtn =>
              showGuessWordBtn &&
              (props => (
                <PrimaryButton style={props} onClick={toggleGuessWord}>
                  Guess Full Word?
                </PrimaryButton>
              ))
            }
          </Transition>

          {/* CHANGE WORD FORM */}
          {showForm && (
            <Spring
              from={{ opacity: 0, maxHeight: 0 }}
              to={{ opacity: 1, maxHeight: 'auto' }}
            >
              {props => (
                <animated.div style={props}>
                  <ChangeWord
                    toggleChangeWord={toggleChangeWord}
                    resetGameAndAlert={resetGameAndAlert}
                    setSecret={setSecret}
                    msgAlert={msgAlert}
                  />
                </animated.div>
              )}
            </Spring>
          )}

          {/* GUESS WORD FORM */}
          {showGuessForm && (
            <Spring
              from={{ opacity: 0, maxHeight: 0 }}
              to={{ opacity: 1, maxHeight: 'auto' }}
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
        </div>

        <div className="inner-shadow" id="scroll-top">
          <h3>Available letters:{availHTML}</h3>
        </div>
        <div className="row mb-3 inner-shadow d">
          {!gameOver && <h3 className="col-12">Guesses Left: {guesses}</h3>}
          {gameOver &&
            (won ? (
              <h3 className="col-12">You Won!</h3>
            ) : (
              <h3 className="col-12">Game Over!</h3>
            ))}
          {revealedLetters}
        </div>
        <div className="inner-shadow">
          <h3>Wrong letters:{wrongLetters}</h3>
        </div>
        {activeFireworks && <FireworksComponent />}
      </div>
    </AbsoluteWrapper>
  )
}

export default withRouter(Play)
