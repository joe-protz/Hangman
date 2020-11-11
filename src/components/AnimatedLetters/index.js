/* eslint-disable react/display-name */

import React from 'react'
import { Transition } from 'react-spring/renderprops'
import ClickableLetter from '../Play/ClickableLetter'
import BadLetter from '../Play/BadLetter'

const AnimatedClickableLetters = ({
  availableLetters, onClick, incorrectLetters
}) => {
  const badLetters = (
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
  const availLetters = (
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
          availableLetters={availableLetters}
        />
      )}
    </Transition>
  )

  return (
    <div className="row inner-shadow" id="scroll-top">
      <div className="col-lg-6">
        <h3 className="text-center">
        Available letters
        </h3>
        { availLetters }
      </div>
      <div className="col-lg-6 d-none d-lg-inline-block incorrect">
        <h3 className="text-center">
        Incorrect letters
        </h3>
        { badLetters }
      </div>
    </div>
  )
}

export default AnimatedClickableLetters
