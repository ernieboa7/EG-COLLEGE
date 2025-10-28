import Library from "../models/Library.js";
import Borrow from "../models/Borrow.js";

/* ============================================================
   1️⃣ STUDENT BORROWS A BOOK
============================================================ */
export const borrowBook = async (req, res) => {
  try {
    const { studentId, bookId } = req.body;

    const book = await Library.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.availableCopies <= 0)
      return res.status(400).json({ message: "Book not available" });

    // Prevent duplicate borrow (same book not yet returned)
    const existing = await Borrow.findOne({
      studentId,
      bookId,
      status: "borrowed",
    });
    if (existing)
      return res.status(400).json({ message: "You already borrowed this book" });

    // Decrease available copies
    book.availableCopies -= 1;
    await book.save();

    // Create borrow record
    const borrow = await Borrow.create({
      studentId,
      bookId,
      title: book.title,
      author: book.author,
      department: book.department,
    });

    res.status(201).json(borrow);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============================================================
   2️⃣ STUDENT RETURNS A BOOK
============================================================ */
export const returnBook = async (req, res) => {
  try {
    const { borrowId } = req.body;

    const borrow = await Borrow.findById(borrowId);
    if (!borrow) return res.status(404).json({ message: "Borrow record not found" });

    if (borrow.status === "returned")
      return res.status(400).json({ message: "Book already returned" });

    // Mark as returned
    borrow.status = "returned";
    borrow.returnDate = new Date();
    await borrow.save();

    // Increase available copies
    const book = await Library.findById(borrow.bookId);
    if (book) {
      book.availableCopies += 1;
      await book.save();
    }

    res.json({ message: "Book returned successfully", borrow });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============================================================
   3️⃣ STUDENT: VIEW BORROW HISTORY
============================================================ */
export const getMyBorrows = async (req, res) => {
  try {
    const { studentId } = req.params;
    const records = await Borrow.find({ studentId }).sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============================================================
   4️⃣ ADMIN: VIEW ALL BORROWS
============================================================ */
export const getAllBorrows = async (_, res) => {
  try {
    const records = await Borrow.find().populate("bookId").sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
