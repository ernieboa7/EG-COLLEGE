
import Library from "../models/Library.js";

export const getBooks = async (_, res) => {
  const books = await Library.find();
  res.json(books);
};

export const searchBooks = async (req, res) => {
  const { q } = req.query;
  const books = await Library.find({
    $or: [
      { title: { $regex: q, $options: "i" } },
      { author: { $regex: q, $options: "i" } },
      { tags: { $regex: q, $options: "i" } }
    ]
  });
  res.json(books);
};

export const addBook = async (req, res) => {
  try {
    const book = await Library.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


