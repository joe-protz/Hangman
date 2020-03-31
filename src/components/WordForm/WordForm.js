import React from 'react'
import Form from 'react-bootstrap/Form'
import { PrimaryButton } from '../Shared/Styled'

const WordForm = ({ handleChange, handleSubmit, word, cancel, cancelForm }) => (
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
      <PrimaryButton type="submit">Submit</PrimaryButton>
      {cancel && <PrimaryButton onClick={cancelForm}>Cancel</PrimaryButton>}
    </Form>
  </span>
)
export default WordForm
