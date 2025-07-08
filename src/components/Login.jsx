import { useState } from 'react'
import InputField from './InputField'
import Notification from './Notification'

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notify, setNotify] = useState(false)

  const handleUsername = (event) => {
    setUsername(event.target.value)
  }
  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    const result = await onLogin(username, password)
    if (!result) {
      setNotify(true)
      setTimeout(() => setNotify(false), 5000)
    }
  }

  return (
    <form>
      <h1>log in to application</h1>
      {notify && <Notification message={'wrong username or password'} />}
      <InputField label="username" value={username} onChange={handleUsername} id='login-username' />
      <InputField label="password" value={password} onChange={handlePassword} type="password" id='login-password' />
      <button id='login-submit' type='submit' onClick={handleLogin}>login</button>
    </form>
  )
}

export default Login