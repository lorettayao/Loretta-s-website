import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoutes from "./routes/auth.js"
import predictionRoutes from "./routes/predictions.js"
import leaderboardRoutes from "./routes/leaderboard.js"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.log("❌ MongoDB connection error:", err))

app.get("/", (req, res) => {
  res.send("PredictPal backend running 🏎️")
})

const PORT = process.env.PORT || 5000
app.use("/api/auth", authRoutes)
app.use("/api/predictions", predictionRoutes)
app.use("/api/leaderboard", leaderboardRoutes)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
