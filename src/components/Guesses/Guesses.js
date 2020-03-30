import React, { Fragment, useState } from 'react'
import { withRouter } from 'react-router-dom'
import NumberForm from '../NumberForm/NumberForm'

const Welcome = ({ setGuesses, history, secret, msgAlert }) => {
  const [number, setNumber] = useState('')
  const handleChange = event => {
    const num = Math.ceil(event.target.value)
    if (num > 20 || num < 0) {
      event.preventDefault()
      msgAlert({
        heading: 'Oops!',
        message: 'Only 1-20 guesses are allowed',
        variant: 'danger'
      })
    } else {
      setNumber(num)
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    setGuesses(number)
    history.push('/play')
  }
  if (!secret) {
    history.push('/')
  }
  return (
    <Fragment>
      <h1>Welcome to Hangman!</h1>
      <p>Please enter a number of guesses allowed between 1 and 20 below</p>
      <NumberForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        number={number}
      />
    </Fragment>
  )
}

export default withRouter(Welcome)
