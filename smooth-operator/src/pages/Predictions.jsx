import { useState, useEffect } from "react"
import api from "../services/api"
import { grandsPrix } from "../data/grandsPrix"
import { drivers } from "../data/drivers"

function Predictions() {
  const [eventName, setEventName] = useState("")
  const [picks, setPicks] = useState(["", "", ""])
  const [predictions, setPredictions] = useState([])
  const [message, setMessage] = useState("")

  const token = localStorage.getItem("token")

  // fetch predictions
  const fetchPredictions = async () => {
    try {
      const res = await api.get("/predictions", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setPredictions(res.data)
    } catch (err) {
      console.error(err)
      setMessage("Failed to load predictions.")
    }
  }

  useEffect(() => {
    fetchPredictions()
  }, [])

  const handlePickChange = (index, value) => {
    const newPicks = [...picks]
    newPicks[index] = value
    setPicks(newPicks)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!eventName || picks.some((p) => !p)) {
      setMessage("Please select a race and all 3 drivers.")
      return
    }

    try {
      const res = await api.post(
        "/predictions",
        { eventName, choice: picks.join(", ") },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessage(res.data.message)
      setEventName("")
      setPicks(["", "", ""])
      fetchPredictions()
    } catch (err) {
      console.error(err)
      setMessage(err.response?.data?.message || "Failed to save prediction.")
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>🏎️ Make Your 2025 F1 Predictions</h2>
      <p>Select your top 3 drivers for each GP!</p>

      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <select
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          style={{ padding: "8px", marginBottom: "15px" }}
        >
          <option value="">Select a Grand Prix</option>
          {grandsPrix.map((gp) => (
            <option key={gp} value={gp}>
              {gp}
            </option>
          ))}
        </select>
        <br />

        <div>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ margin: "10px" }}>
              <label>Position {i + 1}: </label>
              <select
                value={picks[i]}
                onChange={(e) => handlePickChange(i, e.target.value)}
                style={{ padding: "5px" }}
              >
                <option value="">Select Driver</option>
                {drivers.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <button
          type="submit"
          style={{
            padding: "8px 15px",
            marginTop: "10px",
            cursor: "pointer",
          }}
        >
          Save Prediction
        </button>
      </form>

      <p style={{ color: "green", marginTop: "10px" }}>{message}</p>

      <h3 style={{ marginTop: "40px" }}>Your Saved Predictions</h3>
      {predictions.length === 0 ? (
        <p>No predictions yet.</p>
      ) : (
        <table
          style={{
            margin: "0 auto",
            borderCollapse: "collapse",
            marginTop: "10px",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid gray", padding: "5px" }}>Event</th>
              <th style={{ border: "1px solid gray", padding: "5px" }}>Top 3 Picks</th>
              <th style={{ border: "1px solid gray", padding: "5px" }}>Points</th>
            </tr>
          </thead>
          <tbody>
            {predictions.map((p) => (
              <tr key={p._id}>
                <td style={{ border: "1px solid gray", padding: "5px" }}>
                  {p.eventName}
                </td>
                <td style={{ border: "1px solid gray", padding: "5px" }}>
                  {p.choice}
                </td>
                <td style={{ border: "1px solid gray", padding: "5px" }}>
                  {p.pointsAwarded}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Predictions
