import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import PrimaryButton from '../Shared/Styled'
import CustomCheckbox from '../CustomCheckbox'
import './wordform.scss'

const WordForm = ({
  handleChange,
  handleSubmit,
  word,
  cancel,
  cancelForm,
  reference
}) => {
  const [showWord, setShowWord] = useState(true)
  const onChange = () => setShowWord(!showWord)
  const checked = showWord
  return <span>
    <Form
      style={{ margin: '2rem auto .3rem', width: '60%' }}
      onSubmit={handleSubmit}
    >

      <CustomCheckbox
        onChange={onChange}
        checked={checked}
        label={'Show text?'}
        id='showText'
      />
      <Form.Control
        ref={reference}
        className='primary-form'
        name='word'
        placeholder='Type a word or phrase'
        value={word}
        onChange={handleChange}
        type={showWord ? 'text' : 'password'}
        autoComplete='off'
      />
      <PrimaryButton type='submit'>Submit</PrimaryButton>
      {cancel && <PrimaryButton onClick={cancelForm}>Cancel</PrimaryButton>}
    </Form>
  </span>
}
export default WordForm
