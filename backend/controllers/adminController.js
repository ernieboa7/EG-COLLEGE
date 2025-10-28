// backend/controllers/adminController.js
import Student from "../models/Student.js";
import Course from "../models/Course.js";
import Department from "../models/Department.js";
import Committee from "../models/Committee.js";
import Project from "../models/Project.js";
import Result from "../models/Result.js";
import Library from "../models/Library.js";
import Payment from "../models/Payment.js";
import Timetable from "../models/Timetable.js";


import Applicant from "../models/Applicant.js";
import User from "../models/User.js";




// Optional if you have a Timetable model
// import Timetable from "../models/Timetable.js";

/* ============================================================
   STUDENTS (Admissions)
============================================================ */
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*export const addStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

*/


export const addStudent = async (req, res) => {
  try {
    // Create a new student record
    const student = await Student.create(req.body);

    // Respond with a success JSON (RTK Query expects this)
    res.status(201).json({
      success: true,
      message: "Student added successfully",
      student, // include the created record
    });
  } catch (err) {
    console.error("Add student error:", err);

    // Return a consistent error object
    res.status(500).json({
      success: false,
      message: err.message || "Failed to add student",
    });
  }
};







export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============================================================
   DEPARTMENTS
============================================================ */
export const getDepartments = async (req, res) => {
  try {
    const depts = await Department.find();
    res.json(depts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addDepartment = async (req, res) => {
  try {
    const dept = await Department.create(req.body);
    res.status(201).json(dept);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const dept = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!dept) return res.status(404).json({ message: "Department not found" });
    res.json(dept);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const dept = await Department.findByIdAndDelete(req.params.id);
    if (!dept) return res.status(404).json({ message: "Department not found" });
    res.json({ message: "Department deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============================================================
   COURSES
============================================================ */
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============================================================
   RESULTS
============================================================ */
export const getResults = async (req, res) => {
  try {
    const results = await Result.find();
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addResult = async (req, res) => {
  try {
    const { score } = req.body;
    let grade = "F";
    if (score >= 70) grade = "A";
    else if (score >= 60) grade = "B";
    else if (score >= 50) grade = "C";
    else if (score >= 45) grade = "D";
    else if (score >= 40) grade = "E";

    const result = await Result.create({ ...req.body, grade });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateResult = async (req, res) => {
  try {
    const result = await Result.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!result) return res.status(404).json({ message: "Result not found" });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteResult = async (req, res) => {
  try {
    const result = await Result.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Result not found" });
    res.json({ message: "Result deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============================================================
   LIBRARY
============================================================ */
export const getLibraryItems = async (req, res) => {
  try {
    const items = await Library.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addLibraryItem = async (req, res) => {
  try {
    const item = await Library.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateLibraryItem = async (req, res) => {
  try {
    const item = await Library.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: "Book not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteLibraryItem = async (req, res) => {
  try {
    const item = await Library.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============================================================
   PROJECTS
============================================================ */
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============================================================
   COMMITTEES
============================================================ */
export const getCommittees = async (req, res) => {
  try {
    const committees = await Committee.find();
    res.json(committees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addCommittee = async (req, res) => {
  try {
    const committee = await Committee.create(req.body);
    res.status(201).json(committee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCommittee = async (req, res) => {
  try {
    const committee = await Committee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!committee) return res.status(404).json({ message: "Committee not found" });
    res.json(committee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteCommittee = async (req, res) => {
  try {
    const committee = await Committee.findByIdAndDelete(req.params.id);
    if (!committee) return res.status(404).json({ message: "Committee not found" });
    res.json({ message: "Committee deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============================================================
   PAYMENTS / FINANCE
============================================================ */
export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============================================================
   OPTIONAL: TIMETABLES
============================================================ */
// Uncomment if you add a Timetable model later

export const getTimetables = async (req, res) => {
  const data = await Timetable.find();
  res.json(data);
};
export const addTimetable = async (req, res) => {
  const data = await Timetable.create(req.body);
  res.status(201).json(data);
};
export const updateTimetable = async (req, res) => {
  const data = await Timetable.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!data) return res.status(404).json({ message: "Timetable not found" });
  res.json(data);
};
export const deleteTimetable = async (req, res) => {
  const data = await Timetable.findByIdAndDelete(req.params.id);
  if (!data) return res.status(404).json({ message: "Timetable not found" });
  res.json({ message: "Timetable deleted" });
};




// Admin Dashboard Summary

export const getSummary = async (req, res) => {
  try {
    const applicantsCount = await Applicant.countDocuments();
    const studentsCount = await Student.countDocuments();
    const teachersCount = await User.countDocuments({ role: "teacher" });
    const coursesCount = await Course.countDocuments();
    const departmentsCount = await Department.countDocuments();
    const timetablesCount = await Timetable.countDocuments();
    const resultsCount = await Result.countDocuments();
    const libraryCount = await Library.countDocuments();
    const projectsCount = await Project.countDocuments();
    const committeesCount = await Committee.countDocuments();
    const financesCount = await Payment.countDocuments();


    res.json({
      applicantsCount,
      studentsCount,
      teachersCount,
      coursesCount,
      resultsCount,
      departmentsCount,
      timetablesCount,
      libraryCount,
      projectsCount,
      committeesCount,
      financesCount,
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ message: err.message });
  }
};

