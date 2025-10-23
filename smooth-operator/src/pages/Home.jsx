import { Link } from "react-router-dom"

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>🏎️ Welcome to PredictPal!</h1>
      <p>Join, predict, and climb the leaderboard!</p>
      <div style={{ marginTop: "20px" }}>
        <Link to="/register" style={{ marginRight: "10px" }}>Register</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  )
}

export default Home
