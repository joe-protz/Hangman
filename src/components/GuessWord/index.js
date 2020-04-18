import React, { Fragment, useState } from 'react'
import { withRouter } from 'react-router-dom'
import WordForm from '../WordForm'

const ChangeWord = ({ msgAlert, toggleGuessWord, guessWord }) => {
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
    toggleGuessWord()
    guessWord(word)
  }

  const cancelForm = (event) => {
    event.preventDefault()
    toggleGuessWord()
    setWord('')
  }

  return (
    <Fragment>
      <p>Guess the full word!</p>
      <WordForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        word={word}
        type="text"
        cancel={true}
        cancelForm={cancelForm}
      />
    </Fragment>
  )
}

export default withRouter(ChangeWord)
