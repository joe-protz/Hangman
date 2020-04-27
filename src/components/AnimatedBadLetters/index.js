import React from 'react'
import { Transition } from 'react-spring/renderprops'
import BadLetter from '../Play/BadLetter'

const AnimatedBadLetters = ({ incorrectLetters }) => {
  const letters = (
    <Transition
      items={incorrectLetters}
      keys={item => item}
      from={{ opacity: 0, transform: 'translate(0,-300px)' }}
      enter={{ opacity: 1, transform: 'translate(0,0)' }}
      leave={{ opacity: 0, transform: 'translate(0,-300px)' }}
    >
      {letter => props => <BadLetter letter={letter} wrong style={props} />}
    </Transition>
  )

  return (
    <div className="inner-shadow">
      <h3>
        Incorrect letters:
        {letters}
      </h3>
    </div>
  )
}

export default AnimatedBadLetters
