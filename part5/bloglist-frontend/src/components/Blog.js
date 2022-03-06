import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, setMessage, blogs, setBlogs }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const isOwned = (blog.user ? blog.user.username : '') === user.username

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async (blog) => {
    blog.likes++
    await blogService.update(blog.id,blog)
    setVisible(visible+1)
  }

  const handleDelete = async (blog) => {
    if(window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      await blogService.deleteBlog(blog.id)
      setMessage('Blog Deleted')
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
  }

  const deleteButton = isOwned ? <><br /><button onClick={() => handleDelete(blog)}>delete</button></> : ''

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} - {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} <button onClick={toggleVisibility}>hide</button><br />
        {blog.url}<br />
        {blog.likes} <button onClick={() => handleLike(blog)}>like</button><br />
        {blog.author}
        {deleteButton}
      </div>
    </div>
  )
}

export default Blog