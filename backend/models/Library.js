// models/Library.js (aligned to your mock)
import mongoose from "mongoose";
const librarySchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  isbn: { type: String, required: true, unique: true, trim: true },
  department: { type: String, required: true, trim: true },
  edition: { type: String, required: true },
  availableCopies: { type: Number, default: 1, min: 0 },
  tags: { type: [String], default: [] }
}, { timestamps: true });
export default mongoose.model("Library", librarySchema);
