import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)
  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  if(notification === '') {
    style = { display: 'none' }
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification