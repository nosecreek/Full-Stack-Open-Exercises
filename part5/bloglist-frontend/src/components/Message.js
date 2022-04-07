const Message = ({ message, errorState }) => {
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

  if (message) {
    return (
      <div style={styles} className="message">
        {message}
      </div>
    )
  }
  return <div></div>
}

export default Message
