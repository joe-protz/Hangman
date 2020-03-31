import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const alwaysOptions = (
  <Fragment>
    <Nav.Link href='#/'>Start Over</Nav.Link>
  </Fragment>
)

const Header = ({ defaultGuesses }) => (
  <Navbar bg="dark" variant="dark" expand="md">
    <Navbar.Brand href="#">
      Hangman
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { alwaysOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
