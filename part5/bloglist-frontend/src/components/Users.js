import { useSelector } from 'react-redux'

const Users = () => {
  const users = useSelector(({ users }) => users)

  return (
    <table>
      <tbody>
        <tr>
          <th> </th>
          <th>Blogs Created</th>
        </tr>
        {users.map((u) => (
          <tr key={u.id}>
            <td>{u.name}</td>
            <td>{u.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Users
