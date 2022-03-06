import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({blog}) => {
  const [visible, setVisible] = useState(false)
  
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async (blog) => {
    blog.likes++
    await blogService.update(blog.id,blog)
    setVisible(visible+1)
  }

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
        {blog.likes} <button onClick={()=>handleLike(blog)}>like</button><br />
        {blog.author}
      </div>
    </div>  
  )
}

export default Blog