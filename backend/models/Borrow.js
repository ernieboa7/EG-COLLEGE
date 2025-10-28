// backend/models/Borrow.js
/*
import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema(
  {
    studentId: { type: String, required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Library", required: true },
    title: String, // for convenience
    author: String,
    borrowDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },
    returnDate: { type: Date },
    status: {
      type: String,
      enum: ["borrowed", "returned", "overdue"],
      default: "borrowed",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Borrow", borrowSchema);
*/

import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema(
  {
    studentId: { type: String, required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Library", required: true },
    title: String,
    author: String,
    department: String,
    borrowDate: { type: Date, default: Date.now },

    //  Auto-generate due date (default: 14 days after borrowDate)
    dueDate: {
      type: Date,
      required: true,
      default: function () {
        const twoWeeks = 14 * 24 * 60 * 60 * 1000; // 14 days in ms
        return new Date(Date.now() + twoWeeks);
      },
    },

    returnDate: { type: Date },
    status: {
      type: String,
      enum: ["borrowed", "returned"],
      default: "borrowed",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Borrow", borrowSchema);
