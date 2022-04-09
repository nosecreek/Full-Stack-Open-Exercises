import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { likeBlog, deleteBlog, addComment } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

const CommentForm = ({ id }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const handleNewComment = (event) => {
    event.preventDefault()
    dispatch(addComment(id, comment))
  }

  return (
    <Form onSubmit={handleNewComment} className="d-flex">
      <Form.Control
        type="text"
        value={comment}
        className="title"
        name="Title"
        id="title"
        onChange={({ target }) => setComment(target.value)}
        style={{ maxWidth: 400 }}
        placeholder="Enter Your Comment"
      />
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

const Blog = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const id = useParams().id
  const blog = useSelector(({ blogs }) => blogs.find((b) => b.id === id))

  if (!blog || !user) return <div>Please Login to See this Post</div>

  const isOwned =
    (blog.user ? blog.user.username : '') === (user ? user.username : null)

  const deleteButton = isOwned ? (
    <>
      <Button
        variant="outline-danger"
        onClick={() => dispatch(deleteBlog(blog))}
      >
        delete
      </Button>
      <br />
    </>
  ) : (
    ''
  )

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <p className="likes">
        <span style={{ verticalAlign: 'middle' }}>{blog.likes} Likes </span>
        <Button
          variant="outline-primary"
          onClick={() => dispatch(likeBlog(blog.id))}
          className="btn-sm"
        >
          like
        </Button>
      </p>
      <p>added by {blog.user ? blog.user.name : 'unknown'}</p>
      {deleteButton}
      <br />
      <h3>Comments</h3>
      <CommentForm id={blog.id} />
      <ul>
        {blog.comments.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
