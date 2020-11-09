import React from 'react'

const CustomCheckbox = ({ onChange, checked, label = 'Would you like to allow animations for correct guesses?', id = 'animation-checkbox' }) => (
  <div className="custom-control custom-checkbox mb-2">
    <input
      id={id}
      className="ml-2 custom-control-input"
      type="checkbox"
      onChange={onChange}
      checked={checked}
    />
    <label className="custom-control-label" htmlFor={id}>
      {label}
    </label>
  </div>
)

export default CustomCheckbox
