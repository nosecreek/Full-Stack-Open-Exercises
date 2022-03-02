import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Login'
import Logout from './components/Logout'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      setUser(JSON.parse(loggedInUserJSON))
    }
  }, [])

  if(user === null) {
    return (
      <LoginForm username={username} setUsername={setUsername} password={password} setPassword={setPassword} setUser={setUser} />
    )
  }
  return (
    <div>
      <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
      <Logout setUser={setUser} />
    </div>
  )
}

export default App