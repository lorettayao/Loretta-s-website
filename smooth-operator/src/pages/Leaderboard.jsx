function Leaderboard() {
  const leaderboard = [
    { rank: 1, username: "Loret", points: 120 },
    { rank: 2, username: "MaxVerstappen", points: 115 },
    { rank: 3, username: "Charles", points: 100 },
  ]

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>🏆 Leaderboard</h2>
      <table style={{ margin: "0 auto", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid gray", padding: "5px" }}>Rank</th>
            <th style={{ border: "1px solid gray", padding: "5px" }}>User</th>
            <th style={{ border: "1px solid gray", padding: "5px" }}>Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((u) => (
            <tr key={u.rank}>
              <td style={{ border: "1px solid gray", padding: "5px" }}>{u.rank}</td>
              <td style={{ border: "1px solid gray", padding: "5px" }}>{u.username}</td>
              <td style={{ border: "1px solid gray", padding: "5px" }}>{u.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Leaderboard
