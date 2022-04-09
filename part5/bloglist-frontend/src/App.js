import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Login'
import NewBlog from './components/NewBlog'
import Navigation from './components/Navigation'
import Notification from './components/Notification'
import Toggle from './components/Toggle'
import Users from './components/Users'
import User from './components/User'
import { useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { initializeUser } from './reducers/userReducer'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { initializeUsers } from './reducers/usersReducer'
import { Table } from 'react-bootstrap'

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

  return (
    <div>
      <Navigation />
      <Notification />
      <h2>Blog App</h2>
      <br />
      <Routes>
        <Route
          path="/"
          element={
            <>
              {user ? (
                <Toggle label="New Blog" ref={newBlogRef}>
                  <NewBlog newBlogRef={newBlogRef} />
                </Toggle>
              ) : (
                ''
              )}
              <br />
              <Table striped>
                <tbody>
                  {blogs.map((blog) => (
                    <tr key={blog.id}>
                      <td>
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route
          path="/login"
          element={user ? <Navigate replace to="/" /> : <LoginForm />}
        />
      </Routes>
    </div>
  )
}

export default App
