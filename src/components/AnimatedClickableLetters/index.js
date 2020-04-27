/* eslint-disable react/display-name */

import React from 'react'
import { Transition } from 'react-spring/renderprops'
import ClickableLetter from '../Play/ClickableLetter'

const AnimatedClickableLetters = ({
  availableLetters, onClick
}) => {
  const letters = (
    <Transition
      items={availableLetters}
      keys={item => item}
      initial={null}
      from={{
        opacity: 0,
        maxWidth: '0px',
        overflow: 'hidden',
        padding: '0em 0em',
        margin: '0em'
      }}
      enter={{
        opacity: 1,
        maxWidth: '100px',
        overflow: 'visible',
        padding: '0.25em 1em',
        margin: '0.3em'
      }}
      leave={{
        opacity: 0,
        maxWidth: '0px',
        padding: '0em 0em',
        margin: '0em'
      }}
    >
      {letter => props => (
        <ClickableLetter
          style={{ ...props, transition: 'ease' }}
          letter={letter}
          onClick={onClick}
        />
      )}
    </Transition>
  )

  return (
    <div className="inner-shadow" id="scroll-top">
      <h3>
        Available letters:
        { letters }
      </h3>
    </div>
  )
}

export default AnimatedClickableLetters
