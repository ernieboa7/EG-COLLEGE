import express from "express";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import {
  borrowBook,
  returnBook,
  getMyBorrows,
  getAllBorrows,
} from "../controllers/borrowController.js";

const router = express.Router();

// Student routes
router.post("/borrow", protect, borrowBook);
router.post("/return", protect, returnBook);
router.get("/my/:studentId", protect, getMyBorrows);

// Admin route
router.get("/all", protect, isAdmin, getAllBorrows);

export default router;
