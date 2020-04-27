
import React from 'react'
import { Transition } from 'react-spring/renderprops'
import PrimaryButton from '../Shared/Styled'

const AnimatedShowSecretWordFormBtn = ({
  showSecretWordFormButton,
  toggleChangeWord
}) => (
  <Transition
    items={showSecretWordFormButton}
    initial={null}
    from={{ opacity: 0, maxHeight: 0, overflow: 'hidden' }}
    enter={{ opacity: 1, maxHeight: 'auto' }}
    leave={{ opacity: 0, maxHeight: 0 }}
  >
    {showSecretWordFormButton => showSecretWordFormButton &&
        (props => (
          <PrimaryButton style={props} onClick={toggleChangeWord}>
            Change Word?
          </PrimaryButton>
        ))}
  </Transition>
)

export default AnimatedShowSecretWordFormBtn
