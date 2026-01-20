import express from "express";
import {
  addBook,
  deleteAllBooks,
  deleteBookById,
  getAllBooks,
  updateBookbyId,
} from "../controller/books.js";

const router = express.Router();

router.get("/books", getAllBooks);

router.post("/books", addBook);

router.put("/books/:id", updateBookbyId);

router.delete("/books/:id", deleteBookById);

router.delete("/books", deleteAllBooks);

export default router;
