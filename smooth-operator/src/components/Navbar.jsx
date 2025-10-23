import { Link, useNavigate } from "react-router-dom"

function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const username = localStorage.getItem("username")

  const handleLogout = () => {
    localStorage.clear()
    navigate("/login")
  }

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="brand">🏎️ PredictPal</Link>
      </div>
      <div className="nav-right">
        {!token && <Link to="/login" className="nav-link">Login</Link>}
        {!token && <Link to="/register" className="nav-link">Register</Link>}
        {token && <Link to="/predictions" className="nav-link">Predictions</Link>}
        {token && (
          <button onClick={handleLogout} className="logout-btn">
            Logout ({username})
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
