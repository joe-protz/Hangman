import React from 'react'

const RevealedLetters = ({
  secret,
  correctLetters,
  guesses,
  won,
  gameOver
}) => {
  const words = secret.split(' ')
  const displayedWords = []
  for (let i = 0; i < words.length; i++) {
    const word = words[i]
    const revealedWord = word.split('').map((letter, index) => {
      if (correctLetters.includes(letter.toLowerCase())) {
        return (
          <span
            className={
              letter === ' '
                ? 'rev p-0 school-font space'
                : 'rev p-0 school-font'
            }
            key={`${index}${i}`}
            style={{ display: 'inline-block', maxWidth: '60px' }}

          >
            {letter}
          </span>
        )
      }
      return (
        <span
          className={
            letter === ' '
              ? 'rev p-0 school-font space'
              : 'rev p-0 school-font'
          }
          key={`${index}${i}`}
          style={{ display: 'inline-block', maxWidth: '60px' }}
        >
          &nbsp;
        </span>
      )
    })

    const wrappedWord = <div key={word} style={{ minWidth: 'fit-content' }}>{revealedWord}</div>
    displayedWords.push(wrappedWord)
    displayedWords.push(<div key={`${word}-space`} className='rev p-0 school-font space' style={{ display: 'inline-block', maxWidth: '60px' }}
    ></div>)
  }

  return (
    <div className='row mb-3 inner-shadow'>
      {!gameOver && <h3 className='col-12'>Guesses Left: {guesses}</h3>}
      {gameOver &&
      (won ? (
        <h3 className='col-12'>You Won!</h3>
      ) : (
        <h3 className='col-12'>Game Over!</h3>
      ))}
      <div className="d-flex flex-wrap">
        {displayedWords}
      </div>
    </div>
  )
}

export default RevealedLetters
