import React, {
  Fragment, useState, useRef, useEffect
} from 'react'
import { withRouter } from 'react-router-dom'
import WordForm from '../WordForm'

const ChangeWord = ({ msgAlert, toggleGuessWord, guessWord }) => {
  const [word, setWord] = useState('')

  const inputRef = useRef(null)
  useEffect(() => {
    // Animation causes focus to not work unless done async
    setTimeout(() => inputRef.current.focus(), 1)
  }, [])

  const handleChange = event => {
    setWord(event.target.value.replace(/[^a-z ]/gi, ''))
  }

  const cancelForm = event => {
    if (event) event.preventDefault()
    toggleGuessWord()
    setWord('')
  }
  const handleSubmit = event => {
    if (!word) {
      cancelForm()
      return
    }
    if (event) event.preventDefault()
    toggleGuessWord()
    guessWord(word.trim())
  }

  return (
    <Fragment>
      <p>Guess the full word!</p>
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
