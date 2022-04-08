import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
// import blogService from '../services/blogs'

const NewBlog = ({ blogs, setBlogs, newBlogRef, createBlog }) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = async (event) => {
    event.preventDefault()
    const newBlog = await createBlog({
      title: title,
      author: author,
      url: url
    })
    setBlogs(blogs.concat(newBlog))
    dispatch(setNotification(`New Blog: ${title} by ${author}`))
    setTitle('')
    setAuthor('')
    setUrl('')
    newBlogRef.current.toggleVisibility()
  }

  return (
    <div>
      <h2>New Blog</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          title
          <input
            type="text"
            value={title}
            className="title"
            name="Title"
            id="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            className="author"
            name="Author"
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            className="url"
            name="URL"
            id="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit" id="createButton">
          Submit
        </button>
      </form>
    </div>
  )
}

export default NewBlog
