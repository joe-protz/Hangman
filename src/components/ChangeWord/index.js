import React, {
  useState, useRef, useEffect, Fragment
} from 'react'
import { withRouter } from 'react-router-dom'
import WordForm from '../WordForm'
// the component used to change the secret from within Play
const ChangeWord = ({
  resetGameAndAlert,
  setSecret,
  msgAlert,
  toggleChangeWord
}) => {
  const [word, setWord] = useState('')

  const inputRef = useRef(null)
  useEffect(() => {
    setTimeout(() => inputRef.current.focus(), 1)
  }, [])

  const handleChange = event => {
    setWord(event.target.value.replace(/[^a-z ]/gi, ''))
  }

  const handleSubmit = event => {
    if (!word) {
      console.log('cancelled')
      cancelForm()
      return
    }
    event.preventDefault()
    setSecret(word.trim())
    resetGameAndAlert()
    toggleChangeWord()
  }

  const cancelForm = event => {
    if (event) event.preventDefault()
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
        cancel
        cancelForm={cancelForm}
        reference={inputRef}
      />
    </Fragment>
  )
}

export default withRouter(ChangeWord)
