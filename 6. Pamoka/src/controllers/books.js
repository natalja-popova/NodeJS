import booksModel from "../models/books.js";
export const getAllBooks = async (req, res) => {
  const books = await booksModel.find();
  return res.json(books);
};
