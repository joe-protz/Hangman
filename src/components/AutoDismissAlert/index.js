import React, { useState, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert'

import './AutoDismissAlert.scss'

// a simple alert that uses custom css to bounce in and automatically fade
const AutoDismissAlert = ({
  variant, heading, message, destroy, id
}) => {
  const [show, setShow] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      destroy(id)
    }, 3300)
  }, [])

  const handleClose = () => setShow(false)

  return (

    <Alert
      dismissible
      show={show}
      variant={variant}
      onClose={handleClose}
    >
      <div className="container">
        <Alert.Heading>
          {heading}
        </Alert.Heading>
        <p className="alert-body">{message}</p>
      </div>
    </Alert>

  )
}

export default AutoDismissAlert
