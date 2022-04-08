import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const isOwned =
    (blog.user ? blog.user.username : '') === (user ? user.username : null)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const deleteButton = isOwned ? (
    <>
      <br />
      <button onClick={() => dispatch(deleteBlog(blog))}>delete</button>
    </>
  ) : (
    ''
  )

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div className="blog" style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} - {blog.author}{' '}
        <button className="view" onClick={toggleVisibility}>
          view
        </button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} <button onClick={toggleVisibility}>hide</button>
        <br />
        {blog.url}
        <br />
        <span className="likes">{blog.likes}</span>{' '}
        <button onClick={() => dispatch(likeBlog(blog.id))}>like</button>
        <br />
        {blog.author}
        {deleteButton}
      </div>
    </div>
  )
}

export default Blog
