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
  const response = await axios.post(baseUrl, {
    title, author, url
  }, config)
  if (response.status === 401) {
    return null
  }
  return response.data
}

const deleteBlog = async (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  if (response.status === 401) {
    return null
  }
  return response.data
}

const addLike = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)

  const blogData = {
    ...response.data,
    likes: (response.data.likes || 0) + 1,
    creator: response.data.creator.id
  }

  const putResponse = await axios.put(`${baseUrl}/${id}`, blogData)
  return putResponse.data
}

export default { getAll, addBlog, addLike, deleteBlog }