// 1. Sukurti nuo pradžių node.js projektą naudojant express framework;

// 2. Sukurti endpointus:

// /getAllRecipies
// /getRecipesById
// /insertRecipies
// /updateRecipie
// /deleteRecipie
// /getRandomRecepie
// /getAllRecepiesWithIngridient

// 3. Applikacija turi būt pajungta prie mongoDB

// 4.
// // Dadėt user modelius
// // Dadėt user router
// // Dadėt user controller
// // Pridėt ADD_USER ir GET_USER_BY_ID controllerius ir endpointus

import express from "express";
import "dotenv/config";
import myDB from "mongoose";
import booksRouter from "./src/router/books.js";
import cocktailsRouter from "./src/router/cocktails.js";
import usersRouter from "./src/router/users.js";

const my6app = express();

myDB
  .connect(process.env.MONGO_DB)
  .then(() => console.log("Connected to DB"))
  .catch((err) => {
    console.log(err);
  });

my6app.use(express.json());

my6app.use("/cocktails", cocktailsRouter);
my6app.use("/books", booksRouter);
my6app.use("/users", usersRouter);

my6app.use((req, res) => {
  res.status(404).json({ message: "This endpoint does not exist" });
});
my6app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
