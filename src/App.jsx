import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [token, setToken] = useState('')
  const [blogs, setBlogs] = useState([])
  const [name, setName] = useState('')
  const [created, setCreated] = useState(0)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [created])

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
    window.localStorage.setItem('loginData', JSON.stringify({name, token}))
    return response
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loginData')
    setToken('')
    setName('')
  }

  const handleCreate = async (title, author, url) => {
    const response = await blogService.addBlog(title, author, url, token)
    setCreated(created + 1)
    return response
  }

  return (
    <div>
      {token === ''
      ? <Login onLogin={handleLogin} />
      : 
        <div>
          <h2>blogs</h2>
          <div>{name} logged in <button onClick={handleLogout}>logout</button> </div>

          <CreateBlog onCreate={handleCreate}/>

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App