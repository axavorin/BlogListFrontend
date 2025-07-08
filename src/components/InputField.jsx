const InputField = ({ label, value, onChange, type, id }) => {
  return (
    <div id={id}>
      {label}: <input value={value} onChange={onChange} type={type} />
    </div>
  )
}

export default InputField