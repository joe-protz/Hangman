import React from 'react'

const RevealedLetters = ({ secret, correctLetters, guesses, won, gameOver }) => {
  const revealedLetters = secret.split('').map((letter, index) => {
    if (correctLetters.includes(letter.toLowerCase())) {
      return (
        <div className="col-1 rev p-0 school-font" key={index}>
          {letter}
        </div>
      )
    } else {
      return (
        <div className="col-1 rev p-0 school-font" key={index}>
          &nbsp;
        </div>
      )
    }
  })
  return (
    <div className="row mb-3 inner-shadow">
      {!gameOver && <h3 className="col-12">Guesses Left: {guesses}</h3>}
      {gameOver &&
            (won ? (
              <h3 className="col-12">You Won!</h3>
            ) : (
              <h3 className="col-12">Game Over!</h3>
            ))}
      {revealedLetters}
    </div>

  )
}

export default RevealedLetters
