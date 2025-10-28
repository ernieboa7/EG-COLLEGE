// models/User.js
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["student","admin","teacher"], default: "student" },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" }, // link if student
}, { timestamps: true });
export default mongoose.model("User", userSchema);



