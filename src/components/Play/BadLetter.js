import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { PrimaryButton } from '../Shared/Styled'

const BadLetter = ({
  letter
}) => {
  return (
    <Fragment>
      <PrimaryButton wrong={true}>{letter}</PrimaryButton>
    </Fragment>
  )
}

export default withRouter(BadLetter)
