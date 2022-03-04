import React from 'react'
const Logout = ({setUser, setMessage}) => {
  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    setMessage('user logged out')
  }
  return (
    <button onClick={handleLogout}>Logout</button>
  )  
}

export default Logout