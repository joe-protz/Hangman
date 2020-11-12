import React from 'react'
import PrimaryButton from '../Shared/Styled'
const AnimatedShowGeuessWordBtn = ({ showGuessWordBtn, toggleGuessWord }) => (
  <React.Fragment>
    {showGuessWordBtn &&
          <PrimaryButton onClick={toggleGuessWord}>
            Guess Word?
          </PrimaryButton>
    }
  </React.Fragment>

)

export default AnimatedShowGeuessWordBtn
