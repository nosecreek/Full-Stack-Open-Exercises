import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Login'
import NewBlog from './components/NewBlog'
import Logout from './components/Logout'
import Message from './components/Message'
import Toggle from './components/Toggle'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setTheMessage] = useState('')
  const [errorState, setErrorState] = useState(false)
  
  const newBlogRef = useRef()

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
      setBlogs( blogs.sort((a,b) => b.likes - a.likes ) )
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
        <LoginForm setUser={setUser} setError={setError} setMessage={setMessage} />
      </div>
    )
  }
  return (
    <div>
      <Message message={message} errorState={errorState} />
      <Toggle label='New Blog' ref={newBlogRef}>
        <NewBlog blogs={blogs} setBlogs={setBlogs} setMessage={setMessage} newBlogRef={newBlogRef} />
      </Toggle>
      <br /><br />
      <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user} setMessage={setMessage} blogs={blogs} setBlogs={setBlogs} />
        )}
      </div>
      <br /><br />
      <Logout setUser={setUser} setMessage={setMessage} />
    </div>
  )
}

export default App