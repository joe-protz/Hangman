import React from 'react'

const CustomCheckbox = ({ onChange, checked }) => (
  <div className="custom-control custom-checkbox">
    <label className="custom-control-label" htmlFor="animation-checkbox">
      Would you like to allow animations for correct guesses?
    </label>
    <input
      id="animation-checkbox"
      className="ml-2 custom-control-input"
      type="checkbox"
      onChange={onChange}
      checked={checked}
    />

  </div>
)

export default CustomCheckbox
