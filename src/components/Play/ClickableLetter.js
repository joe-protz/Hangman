import React, { useState, useEffect, useRef } from 'react'
import PrimaryButton from '../Shared/Styled'
// these are the green letters used to let a user guess a letter

const ClickableLetter = ({
  letter, onClick, style, availableLetters, layoutID
}) => {
  const [disabled, setDisabled] = useState(false)
  const letterRef = useRef(null)

  useEffect(() => {
    const handleKeydown = event => {
      if (letter === event.key.toLowerCase() && event.target.name !== 'word') letterRef.current.click()
    }
    document.addEventListener('keydown', handleKeydown)

    return () => {
      document.removeEventListener('keydown', handleKeydown)
    }
  }, [])

  useEffect(() => {
    if (availableLetters.length === 26) setDisabled(false)
  }, [availableLetters])

  return (
    <PrimaryButton initial={{ y: -350 }} animate={{ y: 0 }} ref={letterRef} disabled={disabled} style={style} onClick={() => {
      onClick(letter)
      setDisabled(true)
    }}>{letter}</PrimaryButton>
  )
}

export default ClickableLetter
