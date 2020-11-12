
import React from 'react'
import PrimaryButton from '../Shared/Styled'

const AnimatedShowSecretWordFormBtn = ({
  showSecretWordFormButton,
  toggleChangeWord
}) => (
  <React.Fragment>
    {showSecretWordFormButton &&

          <PrimaryButton onClick={toggleChangeWord}>
            Change Word?
          </PrimaryButton>

    }
  </React.Fragment>

)

export default AnimatedShowSecretWordFormBtn
