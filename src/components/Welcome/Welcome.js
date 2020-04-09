import React, { Fragment, useState } from 'react'
import { withRouter } from 'react-router-dom'
import WordForm from '../WordForm/WordForm'
import AbsoluteWrapper from '../Shared/AbsoluteWrapper'

// this is the home component, used to start a new game from scratch

const Welcome = ({ resetAllButSecret, setSecret, history, msgAlert }) => {
  // a component level state is used to create a word using a form. On submit we send it to app.js
  const [word, setWord] = useState('')

  // used for the form
  const handleChange = event => {
    // the next few lines disallow a user to type a space
    const words = event.target.value.split(/\s+/)
    const maxWords = 1
    const numWords = words.length
    if (numWords > maxWords) {
      event.preventDefault()
      msgAlert({
        heading: 'Whoops!',
        message: 'Maximum number of words is one',
        variant: 'danger'
      })
      // we don't allow anything except letters, case insensitive
    } else {
      setWord(event.target.value.replace(/[^a-z]/gi, ''))
    }
  }

  // push the secret and go to the guesses page to set a #
  const handleSubmit = event => {
    event.preventDefault()
    setSecret(word)
    resetAllButSecret()
    history.push('/guesses')
  }

  return (
    <AbsoluteWrapper>
      <Fragment>
        <h1>Welcome to Hangman!</h1>
        <p>Please enter your secret word below. Only one word is allowed at a time and it may not contain any punctuation or numbers. </p>
        <WordForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          word={word}
          type='text'
        />
      </Fragment>
    </AbsoluteWrapper>
  )
}

export default withRouter(Welcome)
