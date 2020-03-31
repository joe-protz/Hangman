import React, { Fragment, useState } from 'react'
import { withRouter } from 'react-router-dom'
import NumberForm from '../NumberForm/NumberForm'

const Welcome = ({ setDefaultGuesses, resetAllButSecretAndGuesses, setGuesses, history, secret, msgAlert }) => {
  const [number, setNumber] = useState('')
  const handleChange = event => {
    let num = Math.ceil(event.target.value)
    if (num > 20) {
      num = 20
    } else if (num < 0) {
      num = 1
    }
    setNumber(num)
  }

  const handleSubmit = event => {
    event.preventDefault()
    setGuesses(number || 8)
    setDefaultGuesses(number || 8)
    resetAllButSecretAndGuesses()
    history.push('/play')
  }
  if (!secret) {
    history.push('/')
  }
  return (
    <Fragment>
      <h1>Welcome to Hangman!</h1>
      <p>Please enter a number of guesses allowed between 1 and 20 below. If no number is chosen, it will default to 8.</p>
      <NumberForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        number={number}
      />
    </Fragment>
  )
}

export default withRouter(Welcome)
