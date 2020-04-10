import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { PrimaryButton } from '../Shared/Styled'

const BadLetter = ({
  letter, style
}) => {
  return (
    <Fragment>
      <PrimaryButton style={style}wrong={true}>{letter}</PrimaryButton>
    </Fragment>
  )
}

export default withRouter(BadLetter)
