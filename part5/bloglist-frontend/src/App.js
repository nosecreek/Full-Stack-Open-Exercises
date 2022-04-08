import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Login'
import NewBlog from './components/NewBlog'
import Logout from './components/Logout'
import Notification from './components/Notification'
import Toggle from './components/Toggle'
import Users from './components/Users'
import { useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { initializeUser } from './reducers/userReducer'
import { Routes, Route } from 'react-router-dom'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(({ user }) => user)

  const newBlogRef = useRef()
  const blogs = useSelector(({ blogs }) =>
    [...blogs].sort((a, b) => b.likes - a.likes)
  )

  useEffect(() => {
    dispatch(initializeBlogs(blogs))
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm />
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
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
      </div>
      <br />
      <br />
      <Logout />
      <Routes>
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  )
}

export default App
