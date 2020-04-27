import React from 'react'
import { Transition } from 'react-spring/renderprops'
import PrimaryButton from '../Shared/Styled'

const AnimatedShowGeuessWordBtn = ({ showGuessWordBtn, toggleGuessWord }) => (
  <Transition
    items={showGuessWordBtn}
    initial={null}
    from={{
      opacity: 0,
      maxHeight: 0,
      overflow: 'hidden',
      transform: 'translate(100%,0)'
    }}
    enter={{
      opacity: 1,
      maxHeight: 'auto',
      transform: 'translate(0,0)'
    }}
    leave={{ opacity: 0, maxHeight: 0 }}
  >
    {showGuessWordBtn => showGuessWordBtn &&
        (props => (
          <PrimaryButton style={props} onClick={toggleGuessWord}>
            Guess Full Word?
          </PrimaryButton>
        ))}
  </Transition>
)

export default AnimatedShowGeuessWordBtn
