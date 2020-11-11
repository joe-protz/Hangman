import React from 'react'
import PrimaryButton from '../Shared/Styled'

const BadLetter = ({
  letter, style
}) => (

  <PrimaryButton initial={{ 'opacity': 0, x: -500 }} animate={{ 'opacity': 1, x: 0 }} exit={{ 'opacity': 0, 'scale': 0.00 }} style={style} wrong>{letter}</PrimaryButton>

)

export default BadLetter
