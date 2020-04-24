import React from 'react'
import Form from 'react-bootstrap/Form'
import PrimaryButton from '../Shared/Styled'

const NumberForm = ({
  handleChange, handleSubmit, number, reference
}) => {
  const inputs = [...Array(20).keys()].map(i => {
    const incrementedI = i + 1
    return (
      <option key={incrementedI} value={incrementedI}>
        {incrementedI}
      </option>
    )
  })
  return (
    <span>
      <Form
        style={{ margin: '2rem auto .3rem', width: '60%' }}
        onSubmit={handleSubmit}
      >
        <Form.Control
          className="primary-form"
          name="number"
          placeholder="How many guesses are allowed?"
          value={number}
          onChange={handleChange}
          as="select"
          default="8"
          ref={reference}
        >
          {inputs}
        </Form.Control>
        <PrimaryButton type="submit">Submit</PrimaryButton>
      </Form>
    </span>
  )
}
export default NumberForm
