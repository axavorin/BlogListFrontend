import { useState } from 'react'
import blogService from '../services/blogs'
import { Button } from 'react-bootstrap'

const Blog = ({ blog, onChange, onLike, name, token }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
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
    <tr style={blogStyle}>
      <td>
        {blog.title} {blog.author}
        <Button
          onClick={() => setShowDetail(!showDetail)}
          className='blog-show'
        >
          {showDetail ? 'hide' : 'show'}
        </Button>
        {showDetail && (
          <div className='blogDetails'>
            <div className='blogUrl'>{blog.url}</div>
            <div>
              <span className='likes-view'>likes {blog.likes || 0}</span>
              <Button onClick={handleAddLike} className='like-btn'>
                like
              </Button>
            </div>
            <div>{blog.creator.name}</div>
            {name === blog.creator.name && (
              <Button onClick={handleDelete} className='blogDelete'>
                delete
              </Button>
            )}
          </div>
        )}
      </td>
    </tr>
  )
}

export default Blog
