import React from 'react'
import Form from 'react-bootstrap/Form'
import PrimaryButton from '../Shared/Styled'
import './wordform.scss'

const WordForm = ({
  handleChange,
  handleSubmit,
  word,
  cancel,
  cancelForm,
  reference
}) => (
  <span>
    <Form
      style={{ margin: '2rem auto .3rem', width: '60%' }}
      onSubmit={handleSubmit}
    >
      <Form.Control
        ref={reference}
        className="primary-form"
        name="word"
        placeholder="Choose a word"
        value={word}
        onChange={handleChange}
        autoComplete="off"
      />
      <PrimaryButton type="submit">Submit</PrimaryButton>
      {cancel && <PrimaryButton onClick={cancelForm}>Cancel</PrimaryButton>}
    </Form>
  </span>
)
export default WordForm
