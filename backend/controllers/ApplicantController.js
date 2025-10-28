import express from "express";
import Applicant from "../models/Applicant.js";
//import { protect, isAdmin } from "../middleware/authMiddleware.js"; // You already have these

const router = express.Router();

// POST: Public route - anyone can apply

export const allApplication = async (req, res) => {
  try {
    const { name, email, course } = req.body;
    await Applicant.create({ name, email, course });

    // keep only 10 most recent
    const count = await Applicant.countDocuments();
    if (count > 10) {
      const oldest = await Applicant.find().sort({ createdAt: 1 }).limit(count - 10);
      const oldestIds = oldest.map((a) => a._id);
      await Applicant.deleteMany({ _id: { $in: oldestIds } });
    }

    res.status(201).json({ message: "Application submitted successfully" });
  } catch {
    res.status(500).json({ message: "Failed to submit application" });
  }
};

// GET: Admin-only route


export const getApplicant = async (req, res) => {
  const applicants = await Applicant.find().sort({ createdAt: -1 }).limit(10);
  res.json(applicants);
};


export const updateApplicant = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, course, status } = req.body;

    const applicant = await Applicant.findById(id);
    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    applicant.name = name || applicant.name;
    applicant.email = email || applicant.email;
    applicant.course = course || applicant.course;
    applicant.status = status || applicant.status;

    await applicant.save();
    res.json({ message: "Applicant updated successfully", applicant });
  } catch (err) {
    console.error("Update applicant error:", err);
    res.status(500).json({ message: "Server error while updating applicant" });
  }
};


export const deleteApplicant = async (req, res) => {
  try {
    const applicant = await Applicant.findById(req.params.id);
    if (!applicant)
      return res.status(404).json({ message: "Applicant not found" });

    await applicant.deleteOne();
    res.json({ message: "Applicant deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while deleting applicant" });
  }
};
