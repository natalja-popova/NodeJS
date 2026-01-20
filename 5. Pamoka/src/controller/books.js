let books = [
  {
    id: "a3f2c1b8-4e9d-4c0f-9f1a-92b7e3d1c201",
    title: "Vėjo užuomina",
    author: "Austėja Rimkutė",
    year: 2019,
    description:
      "Jautri istorija apie moterį, grįžtančią į gimtąjį miestą ir bandančią susitaikyti su praeities šešėliais.",
  },
  {
    id: "f91b8d44-2c6e-4f3a-8c9a-1e2f7b9d4a55",
    title: "Miško šešėliai",
    author: "Dovydas Markevičius",
    year: 2021,
    description:
      "Psichologinis trileris, kuriame paslaptingi įvykiai atokioje sodyboje atskleidžia seniai pamirštas paslaptis.",
  },
  {
    id: "c7e4a2d1-9b8f-4f0d-8f3c-7a1e2b9c4d11",
    title: "Tarp dviejų krantų",
    author: "Gabija Jankauskaitė",
    year: 2017,
    description:
      "Romantiška istorija apie kelionę palei Baltijos jūrą ir pasirinkimus, kurie keičia gyvenimo kryptį.",
  },
  {
    id: "e1d9c3b2-4f7a-4c8e-9d22-8b3f1a7c9e01",
    title: "Laiko architektai",
    author: "Rokas Žilinskas",
    year: 2023,
    description:
      "Futuristinis romanas apie visuomenę, kurioje laikas tampa pagrindine valiuta ir galios įrankiu.",
  },
  {
    id: "b4f7e2c1-8d3a-4f0e-9c11-7a2b3c9d4e22",
    title: "Nematomos gijos",
    author: "Ieva Petrauskienė",
    year: 2020,
    description:
      "Švelni istorija apie ryšius, kurie išlieka net tada, kai žmonių keliai išsiskiria.",
  },
  {
    id: "d2c1f8a7-3b9e-4e0d-8f44-9a1c2b7e3d33",
    title: "Užmaršties upė",
    author: "Mindaugas Šimkus",
    year: 2018,
    description:
      "Detektyvinis romanas apie dingusį žurnalistą ir miestelį, kuriame visi slepia dalį tiesos.",
  },
  {
    id: "f8a1c2d3-7e4b-4c9f-8d22-1b3e7a9c5f44",
    title: "Šiaurės žvaigždės kelias",
    author: "Eglė Vaitkutė",
    year: 2022,
    description:
      "Įkvepianti kelionių knyga apie moterį, išdrįsusią viena leistis į ekspediciją po Skandinavijos kalnus.",
  },
  {
    id: "a9d3c1f7-2b8e-4e0c-9f55-7c1a2e3b4d55",
    title: "Paskutinė stotis",
    author: "Jonas Kavaliauskas",
    year: 2016,
    description:
      "Drama apie žmogų, kuris, gavęs netikėtą žinią, leidžiasi į kelionę susitikti su praeitimi.",
  },
  {
    id: "c1e7a9b3-4d2f-4f0c-8e11-9b3a7c1d5e66",
    title: "Akmenų tyla",
    author: "Rūta Bielskytė",
    year: 2020,
    description:
      "Istorinis romanas apie kaimą, kuriame akmenys saugo daugiau paslapčių, nei atrodo iš pirmo žvilgsnio.",
  },
  {
    id: "e7b1c3d9-8f2a-4c0e-9d77-1a2c3b4e5f77",
    title: "Nakties balsai",
    author: "Karolis Dambrauskas",
    year: 2021,
    description:
      "Mistinis pasakojimas apie žmogų, kuris pradeda girdėti balsus, vedančius jį į tamsias miesto vietas.",
  },
  {
    id: "f3c2a1e9-7d4b-4f0c-8e33-2b1a9c7d4e88",
    title: "Sielų žemėlapiai",
    author: "Agnė Petraitytė",
    year: 2019,
    description:
      "Filosofinė knyga apie vidinį pasaulį, savęs pažinimą ir emocijų labirintus.",
  },
  {
    id: "b7e4c1a2-9d3f-4f0e-8c44-3a1b2c9e5f99",
    title: "Už septynių langų",
    author: "Tomas Jurgaitis",
    year: 2018,
    description:
      "Lengvai siurrealistinis romanas apie namą, kuriame kiekvienas langas veda į kitą realybę.",
  },
  {
    id: "d9a1c3f7-2e4b-4c0f-9d66-4b1e2a7c3f10",
    title: "Pavogtas rytas",
    author: "Lina Kvedaraitė",
    year: 2023,
    description:
      "Šiuolaikinė drama apie moterį, kuri vieną dieną pabunda suvokdama, kad jos gyvenimas slysta iš rankų.",
  },
  {
    id: "e2f7a1c9-3b4e-4f0d-8e22-5c1a7b9d4f11",
    title: "Atsispindėjimai",
    author: "Edgaras Valantinas",
    year: 2017,
    description:
      "Psichologinis romanas apie žmogų, kuris pradeda matyti savo alternatyvias versijas veidrodyje.",
  },
  {
    id: "c4b1e7d3-8f2a-4c0f-9d11-6a3b2c9e5f12",
    title: "Pilkų debesų miestas",
    author: "Monika Žukauskaitė",
    year: 2020,
    description:
      "Distopinė istorija apie miestą, kuriame žmonės prarado spalvas ir emocijas.",
  },
  {
    id: "a1f9c3e7-4b2d-4f0c-8e55-7c2a1b9d4e13",
    title: "Užrašai nuo jūros",
    author: "Saulius Rimkevičius",
    year: 2015,
    description:
      "Poetiškas pasakojimas apie žmogų, kuris kasdien rašo laiškus jūrai, tikėdamasis atsakymo.",
  },
  {
    id: "f7c1a2e9-3d4b-4f0e-9c22-8b1a7c9d5e14",
    title: "Kritimo taškas",
    author: "Viktorija Šalkauskė",
    year: 2022,
    description:
      "Intensyvus trileris apie finansų analitikę, įsivėlusią į pavojingą korporacijų žaidimą.",
  },
  {
    id: "d1e7c3a9-8b2f-4f0c-9e33-9a1b2c7d4f15",
    title: "Sniego kvapas",
    author: "Arnas Petrauskas",
    year: 2016,
    description:
      "Švelni žiemos istorija apie vaikystės prisiminimus ir pirmąją meilę.",
  },
  {
    id: "b3f1e7c9-4d2a-4c0f-8d44-1c2a3b9e5f16",
    title: "Tylos sodai",
    author: "Julija Morkūnaitė",
    year: 2021,
    description:
      "Meditatyvus romanas apie žmogų, kuris pabėga į kaimą ir atranda ramybę tarp gamtos garsų.",
  },
  {
    id: "e9a1c3f7-2b4e-4f0d-9c11-2a3b7c9d4e17",
    title: "Paskutinė žinutė",
    author: "Mantas Grigaliūnas",
    year: 2023,
    description:
      "Technologinis trileris apie dingusį programuotoją ir paslaptingą žinutę, kuri gali pakeisti viską.",
  },
];

export const getAllBooks = (req, res) => {
  if (books.length <= 0) return res.send({ message: "Knygų nerasta" });

  let limit = Number(req.query.limit);
  if (!limit) {
    limit = 10;
  }
  const num = Number(limit);
  return res.json({ books: books.slice(0, num) });
};

export const addBook = (req, res) => {
  const book = req.body;
  books.push(book);
  return res.status(201).json({ addedBook: book });
};

export const updateBookbyId = (req, res) => {
  const updates = req.body;
  const id = req.params.id;
  const bookId = books.findIndex((book) => {
    return book.id === id;
  });
  books[bookId] = { ...books[bookId], ...updates };
  console.log("book", books[bookId]);
  return res.status(201).json({ message: "Knyga atnaujinta" });
};

export const deleteBookById = (req, res) => {
  const id = req.params.id;
  const deletedBook = books.find((b) => {
    return b.id === id;
  });

  const remainingBooks = books.filter((b) => {
    return b.id !== id;
  });

  books = remainingBooks;

  return res
    .status(200)
    .json({ message: `Knyga '${deletedBook.title}' pašalinta` });
};

export const deleteAllBooks = (req, res) => {
  books = [];
  return res.status(200).json({ message: "Visos knygos pašalintos" });
};
