import express from "express";
import { v4 as uniqueID } from "uuid";
import cors from "cors";
import casual from "casual";

const app = express();
app.use(express.json());
app.use(cors());

const carsArray = [];

app.get("/view-cars", (req, res) => {
  res.json({ cars: carsArray });
});

app.post("/add-car", (req, res) => {
  const car = req.body;
  carsArray.push(car);
  res.status(201).json({ car: car });
});

app.get("/add-car", (req, res) => {
  res.status(401).send("aaaa");
});

app.get("/uniqueID", (req, res) => {
  const uID = uniqueID();
  console.log("backend concole log. Unique id=", uID);
  //res.send(uID);
  res.json({ id: uID });
});
app.get("/weather", (req, res) => {
  res.json({ miestas: "Vilnius", orai: "-18" });
});
//+++++ 1. Isirašyti express framework;
//+++++ 2. Pasileisti savo serverį;
//+++++ 3. Per thunder client kreiptis į endpointą bei gauti atgal duomenis;
//+++++ 4. Pasirašy endpointą kuris gražina miestą bei to miesto orų prognozės objektą;
//+++++ 5. Pasirašyt endpointą kuris gražiną sugeneruota id; // naudot uuid lib.
//+++++ 6. Applikacijoje įrašyt cors biblioteką kuri leis front-end applikacijoms kreiptis į backend serverį;
//+++++ 7. Pasirašyt front-end applikaciją kuri pasiims iš backend'o sugeneruota id, bei jį atvaizduot browserio ekrane. // front end applikacija;
//+++++ 8. Pasitobulint savo endpointą. kad prieš gražinant sugeneruota id jį taip pat atspauzdintu backendo consolė;
//+++++ 9. Sukurti endpointą getFakeUser. Endpointas turi gražint objektą su userio info: country, city, first_name, last_name, phone, timezone. (naudot casual biblioteka)
// // nepamiršt killint bei iš naujo runnint applikacijos
// 10. CAO 2 tema node.js
app.get("/fakeUser", (req, res) => {
  res.json({
    country: casual.country,
    city: casual.city,
    first_name: casual.first_name,
    last_name: casual.last_name,
    phone: casual.phone,
    timezone: casual.timezone,
  });
});
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
