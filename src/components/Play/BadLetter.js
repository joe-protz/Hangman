import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import PrimaryButton from '../Shared/Styled'

const BadLetter = ({
  letter, style
}) => (
  <Fragment>
    <PrimaryButton style={style} wrong>{letter}</PrimaryButton>
  </Fragment>
)

export default withRouter(BadLetter)
