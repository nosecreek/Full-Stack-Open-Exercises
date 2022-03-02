import React from 'react'
const Logout = ({setUser}) => {
  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    console.log('user logged out')
  }
  return (
    <button onClick={handleLogout}>Logout</button>
  )  
}

export default Logout