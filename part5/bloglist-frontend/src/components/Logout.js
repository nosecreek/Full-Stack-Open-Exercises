const Logout = ({ setUser, setMessage }) => {
  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    setMessage('user logged out')
  }
  return <button onClick={handleLogout}>Logout</button>
}

export default Logout
