// backend/controllers/studentController.js
import Student from "../models/Student.js";
import Result from "../models/Result.js";
import Course from "../models/Course.js";
import FeeItem from "../models/FeeItem.js";
import Library from "../models/Library.js";
import Project from "../models/Project.js";
import Committee from "../models/Committee.js";
import { scoreToGrade } from "../utils/gradeUtils.js";
import path from "path";
import fs from "fs";


/* ============================================================
   PROFILE
============================================================ */
/*
export const getProfile = async (req, res) => {
  try {
    const student = await Student.findOne({ email: req.user.email });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
*/

export const getProfile = async (req, res) => {
  try {
    // If user is a student, they’ll have req.user.id or req.user.role === 'student'
    const userId = req.user.id;

    // Try to match the user’s linked student record
    let student = null;

    // First check if user record has an attached student ref (from populate)
    if (req.user.role === "student" && req.user.studentId) {
      student = await Student.findOne({ studentId: req.user.studentId });
    }

    // Fallback: find by user’s linked student objectId (if user model stores it)
    if (!student && req.user.student) {
      student = await Student.findById(req.user.student);
    }

    // Last fallback: try by email (old logic)
    if (!student && req.user.email) {
      student = await Student.findOne({ email: req.user.email });
    }

    if (!student)
      return res.status(404).json({ message: "Student profile not found" });

    res.json(student);
  } catch (err) {
    console.error("getProfile error:", err);
    res.status(500).json({ message: err.message });
  }
};


/* ============================================================
   RESULTS
============================================================ */
export const getResults = async (req, res) => {
  try {
    const results = await Result.find({ studentId: req.params.studentId });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============================================================
   COURSE ENROLLMENT
============================================================ */
export const enrollCourse = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    const student = await Student.findOne({ studentId });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const course = await Course.findOne({ id: courseId });
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Ensure array
    if (!Array.isArray(student.enrolledCourses))
      student.enrolledCourses = [];

    // Prevent duplicate
    if (student.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    // Optional: Check capacity
    const totalEnrolled = await Student.countDocuments({ enrolledCourses: courseId });
    if (course.capacity && totalEnrolled >= course.capacity) {
      return res.status(400).json({ message: "Course is full" });
    }

    // Enroll
    student.enrolledCourses.push(courseId);
    await student.save();

    res.json({
      message: `Successfully enrolled in ${course.title}`,
      enrolledCourses: student.enrolledCourses,
    });
  } catch (err) {
    console.error("Enroll error:", err);
    res.status(500).json({ message: err.message });
  }
};




/* ============================================================
   COURSES BY IDS (for enrolled courses)
============================================================ */
export const getCoursesByIds = async (req, res) => {
  try {
    const { ids } = req.query;

    //  Guard: no IDs provided
    if (!ids || ids.trim() === "") {
      return res.json([]); // return empty array safely
    }

    // Convert CSV string -> array of numbers
    const idArray = ids
      .split(",")
      .map((id) => Number(id.trim()))
      .filter(Boolean);

    if (!idArray.length) {
      return res.json([]); // nothing to find
    }

    const courses = await Course.find({ id: { $in: idArray } }).sort({ id: 1 });
    res.json(courses);
  } catch (err) {
    console.error("getCoursesByIds error:", err);
    res.status(500).json({ message: err.message });
  }
};


// UNENROLL STUDENTS
export const unenrollCourse = async (req, res) => {
  const { studentId, courseId } = req.body;

  try {
    const student = await Student.findOne({ studentId });
    if (!student)
      return res.status(404).json({ message: "Student not found" });

    // Filter out the course being removed
    student.enrolledCourses = student.enrolledCourses.filter(
      (c) => c !== Number(courseId)
    );

    await student.save();
    res.status(200).json({ message: "Unenrolled successfully" });
  } catch (err) {
    console.error("Unenroll error:", err);
    res.status(500).json({ message: err.message || "Failed to unenroll" });
  }
};


/* ============================================================
   TIMETABLE
============================================================ */
export const getStudentTimetable = async (req, res) => {
  try {
    const student = await Student.findOne({ studentId: req.params.studentId });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const courses = await Course.find({ id: { $in: student.enrolledCourses } });
    const timetable = courses.flatMap((course) =>
      (course.schedule || []).map((s) => ({
        courseCode: course.code,
        courseTitle: course.title,
        day: s.day,
        start: s.start,
        end: s.end,
        room: s.room,
      }))
    );

    res.json(timetable);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============================================================
   AVAILABLE COURSES
============================================================ */


export const getAvailableCourses = async (req, res) => {
  try {
    const { department, yearLevel } = req.query;

    const filter = {};
    if (department) filter.department = department;
    if (yearLevel) filter.yearLevel = Number(yearLevel);

    const courses = await Course.find(filter).sort({ id: 1 });

    if (!courses.length) {
      return res.status(404).json({ message: "No matching courses found" });
    }

    res.status(200).json(courses);
  } catch (err) {
    console.error("getAvailableCourses error:", err);
    res.status(500).json({ message: err.message });
  }
};


/* ============================================================
   FEES
============================================================ */
export const getFees = async (req, res) => {
  try {
    const student = await Student.findOne({ studentId: req.params.studentId });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const fees = await FeeItem.find({ applicableLevels: { $in: [student.yearLevel] } });
    res.json(fees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============================================================
   LIBRARY
============================================================ */
export const getLibraryItems = async (req, res) => {
  try {
    const books = await Library.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============================================================
   PROJECTS
============================================================ */
/*export const getStudentProjects = async (req, res) => {
  try {
    const projects = await Project.find({ students: req.params.studentId });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
*/


// Get all projects (available + assigned)
export const getStudentProjects = async (req, res) => {
  try {
    const sid = req.params.studentId;

    // Fetch all projects
    const projects = await Project.find();

    // Mark which ones this student has already chosen
    const formatted = projects.map(p => ({
      ...p._doc,
      selected: p.students?.includes(sid)
    }));

    res.json(formatted);
  } catch (err) {
    console.error("getStudentProjects error:", err);
    res.status(500).json({ message: err.message });
  }
};
export const selectProject = async (req, res) => {
  try {
    const { studentId, projectId } = req.body;

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // Check if student already picked a project
    const existing = await Project.findOne({ students: studentId });
    if (existing)
      return res.status(400).json({ message: "You already selected a project" });

    // Add student to this project
    project.students.push(studentId);
    await project.save();

    res.json({ message: "Project selected successfully" });
  } catch (err) {
    console.error("selectProject error:", err);
    res.status(500).json({ message: err.message });
  }
};


// Handle file uploads (local version)
export const uploadProjectSubmission = async (req, res) => {
  try {
    const { studentId, projectId } = req.body;

    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // Save submission info
    const submission = {
      studentId,
      fileUrl: `/uploads/${req.file.filename}`,
      submittedAt: new Date(),
      status: "submitted",
    };

    project.submissions.push(submission);
    await project.save();

    res.status(200).json({ message: "File uploaded successfully", submission });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: err.message });
  }
};


/* ============================================================
   COMMITTEES
============================================================ */
export const getStudentCommittees = async (req, res) => {
  try {
    const committees = await Committee.find({
      members: { $in: [req.params.studentId] },
    });
    res.json(committees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
