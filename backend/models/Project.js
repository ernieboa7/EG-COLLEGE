// models/Project.js (aligned to your mock)
/*
import mongoose from "mongoose";
const projectSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true, trim: true },
  supervisor: { type: String, required: true, trim: true },
  department: { type: String, required: true, trim: true },
  year: { type: Number, required: true },
  students: { type: [String], default: [] },
  description: { type: String, required: true }
}, { timestamps: true });
export default mongoose.model("Project", projectSchema);
*/

import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: String,
    supervisor: String,
    department: String,
    year: String,
    students: [String], // e.g. studentIds assigned
    submissions: [
      {
        studentId: String,
        fileUrl: String,
        submittedAt: Date,
        status: { type: String, enum: ["pending", "submitted"], default: "pending" },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);

