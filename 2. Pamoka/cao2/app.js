import express from "express";
const app = express();
import cors from "cors";

app.use(express.json());
app.use(cors());

const carsArray = [];

app.get("/", (req, res) => {
  res.json({ cars: carsArray });
});

app.post("/add", (req, res) => {
  const car = req.body;
  if (!car.model || car.model.trim() === "") {
    return res.status(400).json({ error: "Modelis negali būti tuščias" });
  }

  console.log(car);

  carsArray.push(car);
  res.json({ zinute: "Markė pridėta" });
});

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});

//------ Užduotis: Paprastas Node.js projektas
//------ 1. Užduotis: Back-end (Express serveris)
//------ Tikslas:
//------ Sukurti Node.js projektą naudojant Express framework.
//------ Reikalavimai:
//------ Naudoti Express.js
//------ Sukurti vieną GET route:
//------ GET /
//------ Grąžina JSON masyvą su automobilių markėmis, pvz.:
//------ ["BMW", "VW", "Porsche"]

//------ POST /add
//------ Priima JSON duomenis iš kliento
//------ Šis maršrutas prideda naują automobilio markę prie jau esamo masyvo
//------ Grąžina patvirtinimą, kad naujas įrašas pridėtas (pvz., {"zinute": "Markė pridėta"})
//------ JSON struktūra:
//------ {
//------ "marke": "Audi"
//------ }
//------ Duomenys turi būti pateikiami JSON formatu
//------ Serveryje naudoti portą 3000
