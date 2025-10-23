function Predictions() {
  const sampleEvents = [
    { id: 1, name: "F1 Japan GP", date: "2025-04-10" },
    { id: 2, name: "F1 Monaco GP", date: "2025-05-24" },
  ]

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Upcoming Events</h2>
      {sampleEvents.map((event) => (
        <div key={event.id} style={{ margin: "10px" }}>
          <h3>{event.name}</h3>
          <p>{event.date}</p>
          <button>Predict Winner</button>
        </div>
      ))}
    </div>
  )
}

export default Predictions
