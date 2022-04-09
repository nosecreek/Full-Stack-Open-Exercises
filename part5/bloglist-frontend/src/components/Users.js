import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = () => {
  const users = useSelector(({ users }) => users)

  return (
    <Table striped>
      <tbody>
        <tr>
          <th>User</th>
          <th>Blogs Created</th>
        </tr>
        {users.map((u) => (
          <tr key={u.id}>
            <td>
              <Link to={`/users/${u.id}`}>{u.name}</Link>
            </td>
            <td>{u.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default Users
