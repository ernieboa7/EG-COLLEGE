// models/Course.js
/*import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  code: { type: String, required: true, unique: true }, // e.g. MTH101
  title: { type: String, required: true },
  department: { type: String, required: true },
  teacherName: String,
  capacity: { type: Number, default: 60 },
  schedule: [{ day: String, start: String, end: String, room: String }], // timetable slots
}, { timestamps: true });
export default mongoose.model("Course", courseSchema);
*/

// models/Course.js
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    code: { type: String, required: true, unique: true }, // e.g. CSC101
    title: { type: String, required: true },
    department: { type: String, required: true },
    teacherName: String,
    capacity: { type: Number, default: 60 },

    // schedule slots for timetables
    schedule: [
      {
        day: String,
        start: String,
        end: String,
        room: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);

