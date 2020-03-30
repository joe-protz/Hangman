import React from 'react'
import Form from 'react-bootstrap/Form'

const GridForm = ({
  handleChange,
  handleSubmit,
  word

}) => (
  <span>
    <Form
      style={{ margin: '2rem auto .3rem', width: '60%' }}
      onSubmit={handleSubmit}
    >
      <Form.Control
        name="word"
        placeholder="Choose a word"
        value={word}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>

    </Form>
  </span>
)
export default GridForm
