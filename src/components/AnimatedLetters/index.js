/* eslint-disable react/display-name */

import React from 'react'
import ClickableLetter from '../Play/ClickableLetter'
import BadLetter from '../Play/BadLetter'
import { AnimatePresence } from 'framer-motion'

const AnimatedClickableLetters = ({
  availableLetters, onClick, incorrectLetters
}) => {
  const badLetters = incorrectLetters.sort().map(letter => <BadLetter letter={letter} key={letter} />)

  const availLetters = availableLetters.map(letter => <ClickableLetter
    letter={letter}
    onClick={onClick}
    availableLetters={availableLetters}
    key={letter}

  />
  )

  return (
    <div className="row inner-shadow" id="scroll-top">
      <div className="col-lg-6">
        <h3 className="text-center">
        Available letters
        </h3>
        <AnimatePresence>{ availLetters }</AnimatePresence>

      </div>
      <div className="col-lg-6 d-none d-lg-inline-block incorrect">
        <h3 className="text-center">
        Incorrect letters
        </h3>
        <AnimatePresence>{ badLetters }</AnimatePresence>

      </div>
    </div>
  )
}

export default AnimatedClickableLetters
