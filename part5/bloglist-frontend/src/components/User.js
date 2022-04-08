import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const id = useParams().id
  const user = useSelector(({ users }) => users.find((u) => u.id === id))

  if (user) {
    return (
      <div>
        <h2>{user.name}</h2>
        <h3>Added Blogs</h3>
        <ul>
          {user.blogs.map((b) => (
            <li key={b.id}>{b.title}</li>
          ))}
        </ul>
      </div>
    )
  }
  return <div></div>
}

export default User
