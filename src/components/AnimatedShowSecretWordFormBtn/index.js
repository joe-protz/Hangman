/* eslint-disable react/display-name */

import React from 'react'
import { PrimaryButton } from '../Shared/Styled'
import { Transition } from 'react-spring/renderprops'

const AnimatedShowSecretWordFormBtn = ({
  showSecretWordFormButton,
  toggleChangeWord
}) => {
  return (
    <Transition
      items={showSecretWordFormButton}
      initial={null}
      from={{ opacity: 0, maxHeight: 0, overflow: 'hidden' }}
      enter={{ opacity: 1, maxHeight: 'auto' }}
      leave={{ opacity: 0, maxHeight: 0 }}
    >
      {showSecretWordFormButton =>
        showSecretWordFormButton &&
        (props => (
          <PrimaryButton style={props} onClick={toggleChangeWord}>
            Change Word?
          </PrimaryButton>
        ))
      }
    </Transition>
  )
}

export default AnimatedShowSecretWordFormBtn
