import express from "express";
import { getBooks, searchBooks, addBook } from "../controllers/libraryController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", getBooks);
router.get("/search", searchBooks);
router.post("/", protect, isAdmin, addBook);
export default router;
