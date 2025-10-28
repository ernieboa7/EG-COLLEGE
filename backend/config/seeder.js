import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./db.js";

import User from "../models/User.js";
import Student from "../models/Student.js";
import Course from "../models/Course.js";
import Department from "../models/Department.js";
import Library from "../models/Library.js";
import FeeItem from "../models/FeeItem.js";

import { users, students, courses, departments, libraryBooks, feeItems } from "./data.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Student.deleteMany();
    await Course.deleteMany();
    await Department.deleteMany();
    await Library.deleteMany();
    await FeeItem.deleteMany();

    await Student.syncIndexes();
    await Course.syncIndexes();
    await Department.syncIndexes();
    await Library.syncIndexes();
    


    await User.insertMany(users);
    await Student.insertMany(students);
    await Course.insertMany(courses);
    await Department.insertMany(departments);
    await Library.insertMany(libraryBooks);
    await FeeItem.insertMany(feeItems);

    console.log("Sample data imported successfully!");
    process.exit();
  } catch (err) {
    console.error("Error importing data:", err);
    process.exit(1);
  }
};

const clearData = async () => {
  try {
    await User.deleteMany();
    await Student.deleteMany();
    await Course.deleteMany();
    await Department.deleteMany();
    await Library.deleteMany();
    await FeeItem.deleteMany();

    console.log("🗑️ All data cleared!");
    process.exit();
  } catch (err) {
    console.error("❌ Error clearing data:", err);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  clearData();
} else {
  importData();
}
