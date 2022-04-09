import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'

const Blog = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const id = useParams().id
  const blog = useSelector(({ blogs }) => blogs.find((b) => b.id === id))

  if (!blog || !user) return '<div></div>'

  const isOwned =
    (blog.user ? blog.user.username : '') === (user ? user.username : null)

  const deleteButton = isOwned ? (
    <>
      <br />
      <button onClick={() => dispatch(deleteBlog(blog))}>delete</button>
    </>
  ) : (
    ''
  )

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <br />
      <span className="likes">{blog.likes} Likes</span>{' '}
      <button onClick={() => dispatch(likeBlog(blog.id))}>like</button>
      <br />
      <span>added by {blog.user ? blog.user.name : 'unknown'}</span>
      {deleteButton}
      <h3>Comments</h3>
      <ul>
        {blog.comments.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
