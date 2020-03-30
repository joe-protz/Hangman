import React, { Fragment, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import ClickableLetter from './ClickableLetter'

const Play = ({
  guesses,
  availableLetters,
  correctLetters,
  incorrectLetters,
  secret,
  pushToCorrect,
  pushToIncorrect,
  removeAvailable,
  msgAlert,
  history,
  resetBoard
}) => {
  useEffect(() => {
    // returned function will be called on component unmount
    return () => {
      resetBoard()
    }
  }, [])

  // const [revealedLetters, setRevealedLetters] = useState('')
  if (!secret) {
    history.push('/')
  } else if (!guesses) {
    history.push('/guesses')
  }

  const revealedLetters = secret.split('').map((letter, index) => {
    if (correctLetters.includes(letter.toLowerCase())) {
      return <div className='col-1 rev p-0' key={index}>{letter}</div>
    } else {
      return (
        <div className="col-1 rev p-0" key={index}>
          __
        </div>
      )
    }
  })

  availableLetters = availableLetters.map(letter => (
    <ClickableLetter key={letter} pushToCorrect={pushToCorrect} pushToIncorrect={pushToIncorrect} secret={secret} removeAvailable={removeAvailable} letter={letter}/>
  ))

  return (
    <Fragment>
      <h1>Welcome to Hangman!</h1>
      <p>
        Please click a letter to guess a letter or enter a word to guess the
        whole word
      </p>
      {availableLetters}
      <div className="row">{revealedLetters}</div>
    </Fragment>
  )
}

export default withRouter(Play)
