import axios from 'axios'
const baseUrl = '/login'

const login = async (username, password) => {
  try {
    const response = await axios.post(baseUrl, { username, password })
    return response.data
  }
  catch {
    return null
  }
}

export default { login }