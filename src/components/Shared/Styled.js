import styled from 'styled-components'
import { motion } from 'framer-motion'
import React, { forwardRef } from 'react'
// This primary button is used to create a green button used app-wide, if the
// props 'wrong' are set to true it is instead a unclickable red button
import {
  Primary, Secondary, Incorrect, IncorrectSecondary
} from './Theme'

const StyledButton = styled.button`
  background: transparent;
  width: max-content;
  font-size: 1.3rem;
  color: ${Primary};
  border-radius: 7px;
  margin: 0.3em;
  padding: 0.25em 1em;
  border: 2px solid ${Secondary};
  &:focus {
    outline: thick solid ${Secondary} !important;
  }

  ${props => (props.wrong
    ? `
       color: white;
       border-color: ${Incorrect};
       background-color:${IncorrectSecondary};
       cursor:default !important; 
         &:focus {
          outline:  thick solid ${IncorrectSecondary} !important;;
  }

    `
    : `
        @media(hover: hover) {
         &:hover {
           background: ${Primary};
           color: white;
         }
        }
    `)}
`
const PrimaryButton = forwardRef(({ whileHover, initial, animate, exit, ...rest }, ref) => (
  <motion.span whileHover={whileHover} animate={animate} exit={exit} initial={initial} style={{ display: 'inline-block' }} layout>
    <StyledButton ref={ref} {...rest}/>
  </motion.span>))

export default PrimaryButton
