import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { Form, Button } from 'react-bootstrap'

const NewBlog = ({ newBlogRef }) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = async (event) => {
    event.preventDefault()
    dispatch(
      createBlog({
        title: title,
        author: author,
        url: url
      })
    )
    setTitle('')
    setAuthor('')
    setUrl('')
    newBlogRef.current.toggleVisibility()
  }

  return (
    <div>
      <h2>New Blog</h2>
      <Form onSubmit={handleNewBlog}>
        <div>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            className="title"
            name="Title"
            id="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <br />
        <div>
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            value={author}
            className="author"
            name="Author"
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <br />
        <div>
          <Form.Label>URL</Form.Label>
          <Form.Control
            type="text"
            value={url}
            className="url"
            name="URL"
            id="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <br />
        <Button type="submit" id="createButton">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default NewBlog
