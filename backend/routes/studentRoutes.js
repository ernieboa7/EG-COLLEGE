// backend/routes/studentRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import multer from "multer";

// configure upload
const upload = multer({ dest: "uploads/" });


import {
  getProfile,
  getResults,
  enrollCourse,
  getStudentTimetable,
  getAvailableCourses,
  getFees,
  getLibraryItems,
  getStudentProjects,
  uploadProjectSubmission,
  getStudentCommittees,
  unenrollCourse,
  getCoursesByIds,
  selectProject,
} from "../controllers/studentController.js";

const router = express.Router();

// Profile
router.get("/profile", protect, getProfile);

// Results
router.get("/results/:studentId", protect, getResults);

// Enroll in a course
router.post("/enroll", protect, enrollCourse);

// Timetable (build from enrolled courses)
router.get("/timetable/:studentId", protect, getStudentTimetable);

// All available courses (for enrollment)
router.get("/courses", protect, getAvailableCourses);
router.post("/unenroll", protect, unenrollCourse);
router.get("/courses/byIds", protect, getCoursesByIds);
//router.get("/courses", protect, getAvailableCourses);

// Fees and outstanding payments
router.get("/fees/:studentId", protect, getFees);

// Library access
router.get("/library", protect, getLibraryItems);

// Projects assigned to student
router.get("/projects/:studentId", protect, getStudentProjects);
router.post("/upload", protect, upload.single("file"), uploadProjectSubmission);
router.post("/select-project", protect, selectProject);







// Committees the student belongs to
router.get("/committees/:studentId", protect, getStudentCommittees);

export default router;
