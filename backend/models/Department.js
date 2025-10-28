// models/Department.js (aligned to your mock)
import mongoose from "mongoose";
const departmentSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: { type: String, required: true, unique: true, trim: true },
  head: String, building: String, email: String
}, { timestamps: true });
export default mongoose.model("Department", departmentSchema);

