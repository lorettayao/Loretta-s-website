import { useEffect, useState } from "react"
import api from "../services/api"

function Leaderboard() {
  const [leaders, setLeaders] = useState([])

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await api.get("/leaderboard")
        setLeaders(res.data)
      } catch (err) {
        console.error("Failed to fetch leaderboard:", err)
      }
    }

    fetchLeaderboard()
  }, [])

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>🏁 Leaderboard</h2>
      <p>Top predictors of the season!</p>

      {leaders.length === 0 ? (
        <p>No data yet — make some predictions first!</p>
      ) : (
        <table
          style={{
            margin: "20px auto",
            borderCollapse: "collapse",
            background: "#1a1a1a",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid gray", padding: "10px" }}>Rank</th>
              <th style={{ border: "1px solid gray", padding: "10px" }}>Username</th>
              <th style={{ border: "1px solid gray", padding: "10px" }}>Points</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((user, i) => (
              <tr key={i}>
                <td
                  style={{
                    border: "1px solid gray",
                    padding: "10px",
                    color: i === 0 ? "#FFD700" : i === 1 ? "#C0C0C0" : i === 2 ? "#cd7f32" : "#ddd",
                    fontWeight: i < 3 ? "bold" : "normal",
                  }}
                >
                  {i + 1}
                </td>
                <td style={{ border: "1px solid gray", padding: "10px" }}>
                  {user.username}
                </td>
                <td style={{ border: "1px solid gray", padding: "10px" }}>
                  {user.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Leaderboard
