import { useState } from 'react'
import InputField from "./InputField"
import Notification from './Notification'
import PropTypes from 'prop-types'

const CreateBlog = ({ onCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notify, setNotify] = useState(false)
  const [created, setCreated] = useState({})

  const handleTitle = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthor = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrl = (event) => {
    setUrl(event.target.value)
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    await onCreate(title, author, url)
    setCreated({ title, author })
    setTitle('')
    setAuthor('')
    setUrl('')
    setNotify(true)
    setTimeout(() => setNotify(false), 5000)
  }

  return (
    <form>
      {notify && <Notification message={`a new blog ${created.title} by ${created.author}`} />}
      <InputField label='title' value={title} onChange={handleTitle} id='blog-title' />
      <InputField label='author' value={author} onChange={handleAuthor} id='blog-author' />
      <InputField label='url' value={url} onChange={handleUrl} id='blog-url' />
      <button type='submit' onClick={handleCreate} id='blog-submit'>create</button>
    </form>
  )
}

CreateBlog.propTypes = {
  onCreate: PropTypes.func
}

export default CreateBlog