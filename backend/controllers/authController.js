/*

import User from "../models/User.js";
import Student from "../models/Student.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { email, password, role, studentId } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const passwordHash = await bcrypt.hash(password, 10);
    let linkedStudent = null;

    if (role === "student" && studentId) {
      linkedStudent = await Student.findOne({ studentId });
      if (!linkedStudent) return res.status(404).json({ message: "Student record not found" });
    }

    const user = await User.create({
      email,
      passwordHash,
      role,
      student: linkedStudent?._id
    });

    res.status(201).json({ message: "Registered successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate("student");
    if (!user) return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.json({ token, role: user.role, student: user.student });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


*/

import User from "../models/User.js";
import Student from "../models/Student.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// JWT helper
const generateToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });

/* ===========================
   STUDENT SELF-REGISTRATION
=========================== */
export const register = async (req, res) => {
  try {
    const { email, password, studentId } = req.body;

    // 1️⃣ Check if student exists and is admitted
    const student = await Student.findOne({ studentId, email });
    if (!student)
      return res.status(404).json({ message: "Student record not found" });

    if (student.status !== "admitted")
      return res.status(403).json({ message: "Student not yet admitted" });

    // 2️⃣ Ensure this student hasn't already registered
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Account already registered" });

    // 3️⃣ Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // 4️⃣ Save password in Student model (for reference if needed)
    student.password = passwordHash;
    await student.save();

    // 5️⃣ Create linked User record
    const user = await User.create({
      email,
      passwordHash,
      role: "student",
      student: student._id,
    });

    res.status(201).json({
      message: "Registration successful. You can now log in.",
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("Student register error:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ===========================
   UNIVERSAL LOGIN
=========================== */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate("student");
    if (!user) return res.status(404).json({ message: "Account not found" });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = generateToken(user._id, user.role);

    res.json({
      token,
      role: user.role,
      student: user.student,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
