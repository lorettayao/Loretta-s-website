import { useState } from "react"
import api from "../services/api"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [token, setToken] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post("/auth/login", { username, password })
      setMessage(res.data.message)
      setToken(res.data.token)
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("username", res.data.username)
    } catch (err) {
      console.error(err)
      setMessage(err.response?.data?.message || "Login failed.")
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br/><br/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br/><br/>
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
      {token && <p>Token saved in localStorage ✅</p>}
    </div>
  )
}

export default Login
