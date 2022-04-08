import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const Logout = ({ setUser }) => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    dispatch(setNotification('user logged out'))
  }
  return <button onClick={handleLogout}>Logout</button>
}

export default Logout
