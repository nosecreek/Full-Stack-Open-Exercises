import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification[0])
  const errorState = useSelector(({ notification }) => notification[1])

  let styles = {
    borderWidth: 2,
    borderColor: 'black',
    padding: 5,
    borderStyle: 'solid',
    color: 'green'
  }

  if (errorState) {
    styles.color = 'red'
  }

  if (notification) {
    return (
      <div style={styles} className="message">
        {notification}
      </div>
    )
  }
  return <div></div>
}

export default Notification
