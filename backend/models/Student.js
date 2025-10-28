/*

import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    studentId: { type: String, required: true, unique: true },
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    password: String, // optional hashed password
    department: String,
    yearLevel: { type: Number, default: 1 },
    status: {
      type: String,
      enum: ["admitted", "pending", "suspended"],
      default: "admitted",
    },
  },
  { timestamps: true }
);

studentSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

export default mongoose.model("Student", studentSchema);
*/


// models/Student.js
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    studentId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
    },
    department: { type: String, required: true },
    yearLevel: { type: Number, default: 1 },
    status: {
      type: String,
      enum: ["admitted", "pending", "suspended"],
      default: "admitted",
    },
    enrolledCourses: { type: [Number], default: [] }, // this is where enrollments go
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
