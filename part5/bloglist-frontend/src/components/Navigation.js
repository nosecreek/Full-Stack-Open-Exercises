import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logout from './Logout'

const Menu = () => {
  const user = useSelector(({ user }) => user)

  return (
    <div>
      <Link to="/">blogs</Link> <Link to="/users">users</Link>{' '}
      <span>Logged in as {user && user.name}</span> <Logout />
    </div>
  )
}

export default Menu
