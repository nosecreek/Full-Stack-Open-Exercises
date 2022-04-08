import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Login'
import NewBlog from './components/NewBlog'
import Logout from './components/Logout'
import Notification from './components/Notification'
import Toggle from './components/Toggle'
import blogService from './services/blogs'
import { useSelector } from 'react-redux'
import { setBlogs, initializeBlogs } from './reducers/blogReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  const [user, setUser] = useState(null)

  const newBlogRef = useRef()
  const blogs = useSelector(({ blogs }) =>
    [...blogs].sort((a, b) => b.likes - a.likes)
  )

  useEffect(() => {
    dispatch(initializeBlogs(blogs))
  }, [dispatch])

  const handleLike = async (blog) => {
    blog.likes++
    await blogService.update(blog.id, blog)
    dispatch(
      setBlogs(
        blogs.map((b) => {
          if (b.id === blog.id) {
            b.likes = blog.likes
          }
          return b
        })
      )
    )
  }

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON)
      setUser(loggedInUser)
      blogService.setToken(loggedInUser.token)
    }
  }, [])

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm setUser={setUser} />
      </div>
    )
  }
  return (
    <div>
      <Notification />
      <Toggle label="New Blog" ref={newBlogRef}>
        <NewBlog newBlogRef={newBlogRef} />
      </Toggle>
      <br />
      <br />
      <div>
        <h2>blogs</h2>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} handleLike={handleLike} />
        ))}
      </div>
      <br />
      <br />
      <Logout setUser={setUser} />
    </div>
  )
}

export default App
