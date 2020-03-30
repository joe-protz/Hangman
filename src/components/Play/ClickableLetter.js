import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'

const ClickableLetter = ({
  letter, secret, pushToCorrect, pushToIncorrect, removeAvailable
}) => {
  const pushValue = () => {
    if (secret.toLowerCase().includes(letter)) {
      pushToCorrect(letter)
    } else {
      pushToIncorrect(letter)
    }

    removeAvailable(letter)
  }
  return (
    <Fragment>
      <button onClick={pushValue}>{letter}</button>
    </Fragment>
  )
}

export default withRouter(ClickableLetter)
