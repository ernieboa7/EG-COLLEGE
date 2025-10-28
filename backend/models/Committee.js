// models/Committee.js (aligned to your mock)
import mongoose from "mongoose";
const committeeSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, trim: true },
  chairperson: { type: String, required: true, trim: true },
  members: { type: [String], default: [] },
  objective: { type: String, required: true }
}, { timestamps: true });
export default mongoose.model("Committee", committeeSchema);

