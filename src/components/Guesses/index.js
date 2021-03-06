import React, { useState, useRef, useEffect } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import NumberForm from '../NumberForm'
import AbsoluteWrapper from '../Shared/AbsoluteWrapper'

// this is the guesses page, used to allow a user to set max guesses for a game
const Guesses = ({
  setDefaultGuesses, setGuesses, history, secret
}) => {
  const [number, setNumber] = useState(8)

  const inputRef = useRef(null)
  useEffect(() => {
    setTimeout(() => inputRef.current.focus(), 800)
  }, [])

  const handleChange = event => {
    const num = event.target.value
    setNumber(num)
  }

  const handleSubmit = event => {
    event.preventDefault()
    setGuesses(number)
    setDefaultGuesses(number)
    history.push('/play')
  }

  if (!secret) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    )
  }

  return (
    <AbsoluteWrapper>
      <div className="main-shadow">
        <h1>Welcome to Hangman!</h1>
        <p>
          Please enter a number of guesses allowed between 1 and 20 below. If no
          number is chosen, it will default to 8.
        </p>
        <NumberForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          number={number}
          reference={inputRef}
        />
      </div>
    </AbsoluteWrapper>
  )
}

export default withRouter(Guesses)
