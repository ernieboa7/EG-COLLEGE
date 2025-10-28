import mongoose from "mongoose";

// Each timetable slot = one class session entry
const slotSchema = new mongoose.Schema({
  day: { type: String, required: true },          // e.g. Monday
  start: { type: String, required: true },        // e.g. 09:00
  end: { type: String, required: true },          // e.g. 10:30
  room: { type: String },                         // optional: Room number
  courseCode: { type: String },                   // e.g. CSC101
  courseTitle: { type: String },                  // e.g. Intro to CS
  lecturer: { type: String },                     // optional
});

const timetableSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },        // e.g. Semester 1 Timetable
    department: { type: String, required: true },  // e.g. Computer Science
    slots: [slotSchema],                           // embedded array of slot objects
  },
  { timestamps: true }                             // adds createdAt, updatedAt
);

const Timetable = mongoose.model("Timetable", timetableSchema);
export default Timetable;
