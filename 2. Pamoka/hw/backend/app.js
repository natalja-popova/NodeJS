//++++++ 1. Parašyt endpointą kuris leistu atspausdint concolėje filmo rekomendacijos objektą, filmo rekomendacija susideda iš: id, title, raiting, description, imdbLink. Filmo rekomendacija turi būt atsiųsta per body;
//++++++ 2. Pamodifikuot endpointą, sugebėtu išsaugoti filmo rekomendaciją į masyvo kintamąjį; // Reiks rekomandaciją supushint;
//++++++   v3. Parašyt endpointą kuris parsiųstu visas išsaugotas rekomendacijas;
//++++++ 4. Parašyt endpointą kuris gražintu visas rekomendacijas išrikiuotas mažėjimo tvarka pagal reitingą;
//++++++ 5. Parašyt endpointą kuris ištrintų visas rekomendacijas;
//++++++ 6. Patobulint add movie endpointą, kad jus neleistu pridėti filmo su jau egzistuojančiu id;
//++++++ 7. Patobulint savo endpointą bei bei jei masyvas yra tuščias - gražinti 200 statusa su žinute "Data not exist"
// 8. Apsirašyt frontenda kuri turi 2 funkcionalumus: įdėti rekomendaciją į backendą. Pasiimti rekomendacijas ir jas atvaizduoti ekrane.
//++++++  9. CAO 3 tema;

import express from "express";
import {
  randBook,
  randProductDescription,
  randUrl,
  randFloat,
  randAwsRequestId,
} from "@ngneat/falso";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

let books = [];

const randombook = () => {
  const book = randBook();
  const rating = randFloat({ min: 1, max: 10, precision: 0.1 });
  book.id = randAwsRequestId();
  book.description = randProductDescription();
  book.imdbLink = randUrl();
  book.rating = rating;
  // books.push(book);
  return book;
};
console.log(randombook());

app.get("/return-random-movie", (req, res) => {
  const book = randombook();
  res.json({ book: book });
});

//2. Pamodifikuot endpointą, sugebėtu išsaugoti filmo rekomendaciją į masyvo kintamąjį; // Reiks rekomandaciją supushint;
app.post("/add-movie", (req, res) => {
  const book = req.body;
  books.push(book);
  res.status(201).json({ book: book });
});

//3. Parašyt endpointą kuris parsiųstu visas išsaugotas rekomendacijas;
app.get("/movies", (req, res) => {
  if (books.length === 0) {
    return res.status(200).json({ message: "Data not exist" });
  }
  res.json({ books: books });
});

// 4. Parašyt endpointą kuris gražintu visas rekomendacijas išrikiuotas mažėjimo tvarka pagal reitingą;
app.get("/sorter-movies", (req, res) => {
  if (books.length === 0) {
    return res.status(200).json({ message: "Data not exist" });
  }
  const sortedMovies = [...books].sort((a, b) => b.rating - a.rating);
  res.json({ sorted: sortedMovies });
});

// 5. Parašyt endpointą kuris ištrintų visas rekomendacijas;
app.delete("/delete-all", (req, res) => {
  books = []; // clear array
  res.json({ status: "All movies deleted" });
});

// 6. Patobulint add movie endpointą, kad jus neleistu pridėti filmo su jau egzistuojančiu id;
app.post("/add-movie-updated", (req, res) => {
  const book = req.body;
  const bookID = book.id;
  const doesIdExist = books.some((book) => book.id === bookID);
  console.log(doesIdExist);
  if (doesIdExist) return res.send("Filmas su tokiu  ID jau egzistoja");
  books.push(book);
  return res.status(201).json({ message: "Filmas pridėtas", book });
  // res.status(201).json({ book: book });
});

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
