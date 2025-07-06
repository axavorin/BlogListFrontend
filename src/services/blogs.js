import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addBlog = async (title, author, url, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await axios.post(baseUrl, {title, author, url}, config)
  if (response.status == 401) {
    return null
  }
  return response.data
}

export default { getAll, addBlog }