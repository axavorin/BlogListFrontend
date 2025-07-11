import { Form, FormControl } from 'react-bootstrap'

const InputField = ({ label, value, onChange, type, id }) => {
  return (
    <Form.Group id={id}>
      <Form.Label>
        {label}
      </Form.Label>
      <FormControl value={value} onChange={onChange} type={type} />
    </Form.Group>
  )
}

export default InputField
