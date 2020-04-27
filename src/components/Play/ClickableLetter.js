import React from 'react'
import PrimaryButton from '../Shared/Styled'
// these are the green letters used to let a user guess a letter

const ClickableLetter = ({
  letter, onClick, style
}) => (
  <PrimaryButton style={style} onClick={() => onClick(letter)}>{letter}</PrimaryButton>
)

export default ClickableLetter
