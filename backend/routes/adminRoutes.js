


// backend/routes/adminRoutes.js
import express from "express";
import { protect, isAdmin, isAdminOrTeacher } from "../middleware/authMiddleware.js";
import {
  // Dashboard
  getSummary,

  // Students
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,

  // Departments
  getDepartments,
  addDepartment,
  updateDepartment,
  deleteDepartment,

  // Courses
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,

  // Timetables
  getTimetables,
  addTimetable,
  updateTimetable,
  deleteTimetable,

  // Results
  getResults,
  addResult,
  updateResult,
  deleteResult,

  // Library
  getLibraryItems,
  addLibraryItem,
  updateLibraryItem,
  deleteLibraryItem,

  // Projects
  getProjects,
  addProject,
  updateProject,
  deleteProject,

  // Committees
  getCommittees,
  addCommittee,
  updateCommittee,
  deleteCommittee,

  // Finance
  getPayments,
} from "../controllers/adminController.js";

const router = express.Router();

// DashBoard Summary
router.route("/dashboard")
      .get(protect, isAdminOrTeacher, getSummary);    // changes made dashboard


/** -------------------------------
 * STUDENTS (Admissions)
 * ------------------------------*/
router.route("/students")
  .get(protect, isAdmin, getStudents)
  .post(protect, isAdmin, addStudent);

router.route("/students/:id")
  .put(protect, isAdmin, updateStudent)
  .delete(protect, isAdmin, deleteStudent);

/** -------------------------------
 * DEPARTMENTS
 * ------------------------------*/
router.route("/departments")
  .get(protect, isAdminOrTeacher, getDepartments)
  .post(protect, isAdminOrTeacher, addDepartment);

router.route("/departments/:id")
  .put(protect, isAdminOrTeacher, updateDepartment)
  .delete(protect, isAdminOrTeacher, deleteDepartment);

/** -------------------------------
 * COURSES
 * ------------------------------*/
router.route("/courses")
  .get(protect, isAdminOrTeacher, getCourses)
  .post(protect, isAdminOrTeacher, addCourse);

router.route("/courses/:id")
  .put(protect, isAdminOrTeacher, updateCourse)
  .delete(protect, isAdminOrTeacher, deleteCourse);

/** -------------------------------
 * TIMETABLES
 * ------------------------------*/
router.route("/timetables")
  .get(protect, isAdminOrTeacher, getTimetables)
  .post(protect, isAdminOrTeacher, addTimetable);

router.route("/timetables/:id")
  .put(protect, isAdminOrTeacher, updateTimetable)
  .delete(protect, isAdminOrTeacher, deleteTimetable);

/** -------------------------------
 * RESULTS
 * ------------------------------*/
router.route("/results")
  .get(protect, isAdminOrTeacher, getResults)
  .post(protect, isAdminOrTeacher, addResult);

router.route("/results/:id")
  .put(protect, isAdminOrTeacher, updateResult)
  .delete(protect, isAdminOrTeacher, deleteResult);

/** -------------------------------
 * LIBRARY
 * ------------------------------*/
router.route("/library")
  .get(protect, isAdminOrTeacher, getLibraryItems)
  .post(protect, isAdminOrTeacher, addLibraryItem);

router.route("/library/:id")
  .put(protect, isAdminOrTeacher, updateLibraryItem)
  .delete(protect, isAdminOrTeacher, deleteLibraryItem);

/** -------------------------------
 * PROJECTS
 * ------------------------------*/
router.route("/projects")
  .get(protect, isAdminOrTeacher, getProjects)
  .post(protect, isAdminOrTeacher, addProject);

router.route("/projects/:id")
  .put(protect, isAdminOrTeacher, updateProject)
  .delete(protect, isAdminOrTeacher, deleteProject);

/** -------------------------------
 * COMMITTEES
 * ------------------------------*/
router.route("/committees")
  .get(protect, isAdminOrTeacher, getCommittees)
  .post(protect, isAdminOrTeacher, addCommittee);

router.route("/committees/:id")
  .put(protect, isAdminOrTeacher, updateCommittee)
  .delete(protect, isAdminOrTeacher, deleteCommittee);

router.get("/", protect, getCommittees);  

/** -------------------------------
 * FINANCE / PAYMENTS
 * ------------------------------*/
router.route("/payments")
  .get(protect, isAdmin, getPayments);




export default router;

