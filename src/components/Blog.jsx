import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, onChange, onLike, name, token }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showDetail, setShowDetail] = useState(false)

  const handleAddLike = () => {
    onLike(blog.id)
  }
  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} ${blog.author}?`)) {
      await blogService.deleteBlog(blog.id, token)
      onChange()
    }
  }
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setShowDetail(!showDetail)}>{showDetail ? 'hide' : 'show'}</button>
      {showDetail &&
        <div className='blogDetails'>
          <div className='blogUrl'>{blog.url}</div>
          <div>
            likes {blog.likes || 0}
            <button onClick={handleAddLike}>like</button>
          </div>
          <div>{blog.creator.name}</div>
          {name === blog.creator.name && <button onClick={handleDelete}>delete</button>}
        </div>
      }
    </div>
  )
}

export default Blog