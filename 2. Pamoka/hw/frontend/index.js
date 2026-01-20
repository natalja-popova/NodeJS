// 8. Apsirašyt frontenda kuri turi 2 funkcionalumus: įdėti rekomendaciją į backendą. Pasiimti rekomendacijas ir jas atvaizduoti ekrane.

let bookData = "";
const getAllMovies = async () => {
  const response = await fetch(`http://localhost:3001/movies`);
  if (!response.ok) {
    console.error("HTTP klaida:", response.status);
    return;
  }

  const data = await response.json();

  if (data.message) {
    document.getElementById("emptyList").innerText = data.message;
    return;
  }
  if (data.books) {
    data.books.forEach((book) => {
      bookData = document.createElement("div");
      bookData.innerHTML = `<p>${book.title}, ${book.author}</p><p>${book.description}</p><p>${book.rating}</p>`;
      document.getElementById("booksSection").append(bookData);
    });

    console.log("movies", data.books);
    return;
  }

  console.log("moviesArray", data);
};
getAllMovies();
