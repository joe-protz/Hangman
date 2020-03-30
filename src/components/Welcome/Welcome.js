import React, { Fragment, useState } from 'react'
import WordForm from '../WordForm/WordForm'

const Welcome = ({ setSecret }) => {
  const [word, setWord] = useState('')
  const handleChange = event =>
    setWord(
      event.target.value
    )

  const handleSubmit = event => {
    event.preventDefault()
    setSecret(word)
  }

  return (
    <Fragment>
      <h1>Welcome to Hangman!</h1>
      <p>Please enter your secret word below</p>
      <WordForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        word={word}
      />
    </Fragment>
  )
}

export default Welcome
