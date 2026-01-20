import express from "express";
import booksRoutes from "./src/router/books.js";

const myApp = express();
myApp.use(express.json());

myApp.use(booksRoutes);

myApp.use((req, res) => {
  res.status(404).json({ message: "This endpoint does not exist" });
});

myApp.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
