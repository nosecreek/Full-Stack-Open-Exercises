import {useState} from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({setUser, setError, setMessage}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({username, password})
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setMessage(`Welcome ${user.name}`)
      setUser(user)
    } catch (exception) {
      setError("Wrong username or password")
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input type="text" value={username} name="Username" onChange={({target}) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input type="password" value={password} name="Password" onChange={({target}) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm