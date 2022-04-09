import { useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const Logout = () => {
  const dispatch = useDispatch()
  return (
    <Button
      style={{ margin: '0 0.5rem' }}
      variant="outline-danger"
      as={Link}
      to="/login"
      onClick={() => dispatch(logoutUser())}
    >
      Logout
    </Button>
  )
}

export default Logout
