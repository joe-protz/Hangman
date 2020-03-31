import React, { Fragment, useState } from 'react'
import { withRouter } from 'react-router-dom'
import WordForm from '../WordForm/WordForm'

const Welcome = ({ resetAllButSecret, setSecret, history, msgAlert }) => {
  const [word, setWord] = useState('')
  const handleChange = event => {
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
    } else {
      setWord(event.target.value.replace(/[^a-z]/gi, ''))
    }
  }
  const handleSubmit = event => {
    event.preventDefault()
    setSecret(word)
    resetAllButSecret()
    history.push('/guesses')
  }

  return (
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
  )
}

export default withRouter(Welcome)
