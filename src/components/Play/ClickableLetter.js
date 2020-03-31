import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { PrimaryButton } from '../Shared/Styled'

const ClickableLetter = ({
  letter, secret, pushToCorrect, pushToIncorrect, removeAvailable, gameOver, msgAlert
}) => {
  const pushValue = () => {
    if (!gameOver) {
      if (secret.toLowerCase().includes(letter)) {
        pushToCorrect(letter)
      } else {
        pushToIncorrect(letter)
      }

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
    <Fragment>
      <PrimaryButton onClick={pushValue}>{letter}</PrimaryButton>
    </Fragment>
  )
}

export default withRouter(ClickableLetter)
