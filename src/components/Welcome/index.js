import React, { useState, useRef, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import WordForm from '../WordForm'
import AbsoluteWrapper from '../Shared/AbsoluteWrapper'

// this is the home component, used to start a new game from scratch
const Welcome = ({ setSecret, history, msgAlert }) => {
  const [word, setWord] = useState('')
  const inputRef = useRef(null)
  useEffect(() => {
    setTimeout(() => inputRef.current.focus(), 800)
  }, [])

  const handleChange = event => {
    // we don't allow anything except letters, case insensitive
    setWord(event.target.value.replace(/[^a-z ]/gi, ''))
  }

  const handleSubmit = event => {
    const letters = word.split('')
    const minLetters = 1
    const numLetters = letters.length

    if (minLetters > numLetters) {
      event.preventDefault()
      msgAlert({
        heading: 'Whoops!',
        message: 'Must enter at least one letter',
        variant: 'danger'
      })
    } else {
      event.preventDefault()
      setSecret(word.trim())
      history.push('/guesses')
    }
  }

  return (
    <AbsoluteWrapper>
      <div className="main-shadow mt-2 p-3">
        <h1>Welcome to Hangman!</h1>
        <p>
          Please enter your secret word or phrase below.
          {' '}
        </p>
        <WordForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          word={word}
          type="text"
          reference={inputRef}
        />
      </div>
    </AbsoluteWrapper>
  )
}

export default withRouter(Welcome)
