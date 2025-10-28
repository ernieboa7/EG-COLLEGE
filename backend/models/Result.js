// models/Result.js
import mongoose from "mongoose";
const resultSchema = new mongoose.Schema({
  studentId: { type: String, required: true },       // Student.studentId
  courseCode: { type: String, required: true },      // Course.code
  term: { type: String, required: true },            // "2024/Term1"
  score: { type: Number, min: 0, max: 100, required: true },
  grade: { type: String, required: true }            // compute server-side
}, { timestamps: true, index: { studentId: 1, courseCode: 1, term: 1 } });
export default mongoose.model("Result", resultSchema);

