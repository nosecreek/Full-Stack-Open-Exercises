import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Login'
import NewBlog from './components/NewBlog'
import Logout from './components/Logout'
import Message from './components/Message'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setTheMessage] = useState('')
  const [errorState, setErrorState] = useState(false)
  
  const setMessage = (message) => {
    setTheMessage(message)
    setErrorState(false)
    setTimeout(() => {
      setTheMessage(null)
    }, 5000)
  }
  
  const setError = (message) => {
    setTheMessage(message)
    setErrorState(true)
    setTimeout(() => {
      setTheMessage(null)
    }, 5000)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON)
      setUser(loggedInUser)
      blogService.setToken(loggedInUser.token)
    }
  }, [])

  if(user === null) {
    return (
      <div>
        <Message message={message} errorState={errorState} />
        <LoginForm username={username} setUsername={setUsername} password={password} setPassword={setPassword} setUser={setUser} setError={setError} setMessage={setMessage} />
      </div>
    )
  }
  return (
    <div>
      <Message message={message} errorState={errorState} />
      <NewBlog blogs={blogs} setBlogs={setBlogs} setMessage={setMessage} />
      <br /><br />
      <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
      <br /><br />
      <Logout setUser={setUser} setMessage={setMessage} />
    </div>
  )
}

export default App