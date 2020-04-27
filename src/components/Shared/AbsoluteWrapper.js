import React from 'react'

const AbsoluteWrapper = ({ children }) => (
  <div className="position-absolute w-100">
    {children}
  </div>
)

export default AbsoluteWrapper
