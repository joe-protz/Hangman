import React from 'react'
import Form from 'react-bootstrap/Form'

const NumberForm = ({ handleChange, handleSubmit, number }) => (
  <span>
    <Form
      style={{ margin: '2rem auto .3rem', width: '60%' }}
      onSubmit={handleSubmit}
    >
      <Form.Control
        name="number"
        placeholder="How many guesses are allowed?"
        value={number}
        onChange={handleChange}
        type='number'
        max='20'
        min='1'
      />
      <button type="submit">Submit</button>
    </Form>
  </span>
)
export default NumberForm
