import Result from "../models/Result.js";
import { scoreToGrade } from "../utils/gradeUtils.js";

// Add or update a student's result
export const addResult = async (req, res) => {
  try {
    const { studentId, courseCode, term, score } = req.body;
    const grade = scoreToGrade(score);

    const existing = await Result.findOne({ studentId, courseCode, term });
    if (existing) {
      existing.score = score;
      existing.grade = grade;
      await existing.save();
      return res.json({ message: "Result updated", result: existing });
    }

    const result = await Result.create({ studentId, courseCode, term, score, grade });
    res.status(201).json({ message: "Result added", result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get results for a student
export const getResultsByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const results = await Result.find({ studentId });
    res.json(results);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all results (admin view)
export const getAllResults = async (req, res) => {
  try {
    const results = await Result.find({});
    res.json(results);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
