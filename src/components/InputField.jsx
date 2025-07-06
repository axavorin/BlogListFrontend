const InputField = ({ label, value, onChange, type }) => {
  return (
    <div>
      {label}: <input value={value} onChange={onChange} type={type} />
    </div>
  )
}

export default InputField