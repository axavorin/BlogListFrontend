import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [token, setToken] = useState('')
  const [blogs, setBlogs] = useState([])
  const [name, setName] = useState('')
  const [changed, setChanged] = useState(0)

  const blogCreateRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => (a.likes || 0) > (b.likes || 0) ? -1 : 1)
      setBlogs(blogs)
    }
    )
  }, [changed])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loginData')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setToken(user.token)
      setName(user.name)
    }
  }, [])

  const handleLogin = async (username, password) => {
    const response = await loginService.login(username, password)
    if (!response) {
      return null
    }
    setToken(response.token)
    setName(response.name)
    window.localStorage.setItem('loginData', JSON.stringify({ name: response.name, token: response.token }))
    return response
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loginData')
    setToken('')
    setName('')
  }

  const handleCreate = async (title, author, url) => {
    blogCreateRef.current.toggleVisibility()
    const response = await blogService.addBlog(title, author, url, token)
    setChanged(changed + 1)
    return response
  }

  const handleLike = async (id) => {
    await blogService.addLike(id)
    setChanged(changed + 1)
  }

  return (
    <div>
      {token === ''
        ? <Login onLogin={handleLogin} />
        :
        <div>
          <h2>blogs</h2>
          <div>{name} logged in <button onClick={handleLogout}>logout</button> </div>

          <Togglable buttonLabel='create' ref={blogCreateRef}>
            <CreateBlog onCreate={handleCreate} />
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} name={name} token={token} onLike={(id) => handleLike(id)} onChange={() => setChanged(changed+1)} />
          )}
        </div>
      }
    </div>
  )
}

export default App