import mongoose from "mongoose"

const predictionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  eventName: { type: String, required: true },
  choice: { type: String, required: true },
  result: { type: String, default: null }, // actual winner later
  pointsAwarded: { type: Number, default: 0 }
}, { timestamps: true })

const Prediction = mongoose.model("Prediction", predictionSchema)
export default Prediction
