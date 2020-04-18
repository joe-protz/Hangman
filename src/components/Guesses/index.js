import React, { useState } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import NumberForm from '../NumberForm'
import AbsoluteWrapper from '../Shared/AbsoluteWrapper'

// this is the guesses page, used to allow a user to set max guesses for a game
const Guesses = ({ setDefaultGuesses, setGuesses, history, secret }) => {
  const [number, setNumber] = useState('')
  const handleChange = event => {
    // round up to avoid decimals and dumb users, limit the number from 1-20
    let num = Math.ceil(event.target.value)
    if (num > 20) {
      num = 20
    } else if (num < 0) {
      num = 1
    }
    setNumber(num)
  }

  const handleSubmit = event => {
    const defaultNum = 8
    event.preventDefault()
    setGuesses(number || defaultNum)
    setDefaultGuesses(number || defaultNum)
    history.push('/play')
  }

  if (!secret) {
    return (
      <Redirect
        to={{
          pathname: '/',
          state: { from: location }
        }}
      />
    )
  }

  return (
    <AbsoluteWrapper>
      <div className='main-shadow'>
        <h1>Welcome to Hangman!</h1>
        <p>
          Please enter a number of guesses allowed between 1 and 20 below. If no
          number is chosen, it will default to 8.
        </p>
        <NumberForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          number={number}
        />
      </div>
    </AbsoluteWrapper>
  )
}

export default withRouter(Guesses)
