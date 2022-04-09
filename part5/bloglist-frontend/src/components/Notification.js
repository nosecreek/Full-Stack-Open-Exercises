import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification[0])
  const errorState = useSelector(({ notification }) => notification[1])

  if (notification) {
    return (
      <Alert variant={errorState ? 'danger' : 'success'}>{notification}</Alert>
    )
  }
  return <div></div>
}

export default Notification
