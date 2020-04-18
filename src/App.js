import React, { Fragment, useState } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { useTransition, animated } from 'react-spring'

import AutoDismissAlert from './components/AutoDismissAlert'
import Header from './components/Header'
import Welcome from './components/Welcome'
import Guesses from './components/Guesses'
import Play from './components/Play'

const App = () => {
  const location = useLocation()
  const [guesses, setGuesses] = useState(undefined)
  const [secret, setSecret] = useState('')
  const [msgAlerts, setMsgAlerts] = useState([])
  const [defaultGuesses, setDefaultGuesses] = useState(undefined)

  const transitions = useTransition(location, location => location.pathname, {
    native: true,
    initial: null,
    from: { opacity: 0, transform: 'translate(100%,0)' },
    enter: { opacity: 1, transform: 'translate(0,0)' },
    leave: { opacity: 0, transform: 'translate(-50%,0)' }
  })

  // used for app-wide messages
  const msgAlert = ({ heading, message, variant }) => {
    setMsgAlerts([...msgAlerts, { heading, message, variant }])
  }

  return (
    <Fragment>
      <Header defaultGuesses={defaultGuesses} />
      {msgAlerts.map((msgAlert, index) => (
        <AutoDismissAlert
          key={index}
          heading={msgAlert.heading}
          variant={msgAlert.variant}
          message={msgAlert.message}
        />
      ))}
      {/* routes */}
      <main className="container">
        {transitions.map(({ item, props, key }) => (
          <animated.div native="true" key={key} style={props}>
            <Switch location={item}>
              {/* home */}
              <Route
                exact
                path="/"
                render={() => (
                  <Welcome
                    msgAlert={msgAlert}
                    setSecret={setSecret}
                  />
                )}
              />

              <Route
                exact
                path="/guesses"
                render={() => (
                  <Guesses
                    msgAlert={msgAlert}
                    secret={secret}
                    setGuesses={setGuesses}
                    setDefaultGuesses={setDefaultGuesses}
                  />
                )}
              />

              <Route
                exact
                path="/play"
                render={() => (
                  <Play
                    guesses={guesses}
                    secret={secret}
                    setSecret={setSecret}
                    msgAlert={msgAlert}
                    setGuesses={setGuesses}
                    defaultGuesses={defaultGuesses}
                  />
                )}
              />
            </Switch>
          </animated.div>
        ))}
      </main>
    </Fragment>
  )
}

export default App
