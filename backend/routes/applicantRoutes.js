 

import express from "express";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import {
  allApplication,
  getApplicant,
  updateApplicant,
  deleteApplicant,
  
} from "../controllers/ApplicantController.js";

const router = express.Router();

// Public - anyone can apply
router.post("/", allApplication);

// Admin - get applicants
router.get("/", protect, isAdmin, getApplicant);

// Admin - update applicant
router.put("/:id", protect, isAdmin, updateApplicant);


//  DELETE - admin
router.delete("/:id", protect, isAdmin, deleteApplicant);



export default router;

