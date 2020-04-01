import React, { Fragment, useState } from 'react'
import { withRouter } from 'react-router-dom'
import WordForm from '../WordForm/WordForm'
// the component used to change the secret from within Play
const ChangeWord = ({
  resetGameAndAlert,
  setSecret,
  msgAlert,
  toggleChangeWord
}) => {
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
    resetGameAndAlert()
    toggleChangeWord()
  }

  const cancelForm = () => {
    toggleChangeWord()
    setWord('')
  }

  return (
    <Fragment>
      <p>
        You may change your word below while keeping the same amount of guesses.
      </p>
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
