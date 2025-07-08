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
      <button onClick={() => setShowDetail(!showDetail)} className='blog-show'>{showDetail ? 'hide' : 'show'}</button>
      {showDetail &&
        <div className='blogDetails'>
          <div className='blogUrl'>{blog.url}</div>
          <div>
            <span className='likes-view'>likes {blog.likes || 0}</span>
            <button onClick={handleAddLike} className='like-btn'>like</button>
          </div>
          <div>{blog.creator.name}</div>
          {name === blog.creator.name && <button onClick={handleDelete} className='blogDelete'>delete</button>}
        </div>
      }
    </div>
  )
}

export default Blog