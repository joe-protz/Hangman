import React from 'react'
import { PrimaryButton } from '../Shared/Styled'
// these are the green letters used to let a user guess a letter

const ClickableLetter = ({
  letter, secret, pushToCorrect, pushToIncorrect, removeAvailable, gameOver, msgAlert, style
}) => {
  // this function is used to either push the value to a correct or incorrect array causing an app wide state change and re render
  const pushValue = () => {
    if (!gameOver) {
      if (secret.toLowerCase().includes(letter)) {
        pushToCorrect(letter)
      } else {
        pushToIncorrect(letter)
      }
      // take it from the availLetter arr to re-render this component with one less letter
      removeAvailable(letter)
    } else {
      msgAlert({
        heading: 'Oops!',
        message: 'Game is over, please click reset to play again',
        variant: 'danger'
      })
    }
  }
  return (

    <PrimaryButton style={style} onClick={pushValue}>{letter}</PrimaryButton>

  )
}

export default ClickableLetter
