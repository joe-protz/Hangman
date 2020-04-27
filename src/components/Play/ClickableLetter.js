import React, { useState } from 'react'
import PrimaryButton from '../Shared/Styled'
// these are the green letters used to let a user guess a letter

const ClickableLetter = ({
  letter, onClick, style
}) => {
  const [disabled, setDisabled] = useState(false)
  return (
    <PrimaryButton disabled={disabled} style={style} onClick={() => {
      onClick(letter)
      setDisabled(true)
    }}>{letter}</PrimaryButton>
  )
}

export default ClickableLetter
