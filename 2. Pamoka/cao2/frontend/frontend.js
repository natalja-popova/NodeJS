// ========  2. Užduotis: Front-end (HTML puslapis)
// ======== 🎯 Tikslas:
// ======== Sukurti HTML puslapį, kuris:
// ======== Pasiima ir atvaizduoja automobilių sąrašą iš Express serverio (GET /)
// ======== Leidžia pridėti naują markę per formą (POST /add)
// ======== Reikalavimai:
// ======== 1. Duomenų atvaizdavimas (kaip ir anksčiau):
// ======== Naudoti fetch() funkciją GET užklausai į http://localhost:3000/
// ======== Gauti masyvą su automobilių markėmis (pvz., ["BMW", "VW", "Porsche"])
// ========  Dinamiškai atvaizduoti jas kaip elementų sąrašą (<ul> su <li>)

const ulElement = document.getElementById("carsList");
console.log("ulElement", ulElement);
const getAllCars = async () => {
  const response = await fetch(`http://localhost:3001/`);
  const allCars = await response.json();
  console.log("aaaa", allCars.cars.length);
  if (allCars.cars.length > 0) {
    allCars.cars.forEach((element) => {
      const liElement = document.createElement("li");
      liElement.innerText = element.model;
      ulElement.append(liElement);
    });
  } else {
    console.log("empty array");
  }
  console.log(allCars);

  return allCars;
};
getAllCars();

// ======== 2. Forma naujai markei pridėti:
// ======== Sukurti paprastą formą su:
// ======== Vienu įvedimo lauku (input) automobilių markei įrašyti
// ======== Mygtuku „Pridėti“
// ======== Kai vartotojas pateikia formą:
// ======== Siunčiama POST užklausa į http://localhost:3000/add
// ======== Duomenys siunčiami JSON formatu, pvz.:
// ======== { "marke": "Audi" }
const carInput = document.getElementById("car");
const btnSubmit = document.getElementById("btnSubmit");
btnSubmit.addEventListener("click", async () => {
  console.log(carInput.value);
  car = { model: carInput.value };
  const response = await fetch("http://localhost:3001/add", {
    method: "POST",
    body: JSON.stringify(car),
    headers: { "Content-Type": "application/json" },
  });
  const addCarRes = await response.json();
  console.log("hi", addCarRes);
  if (!response.ok) {
    document.getElementById("errorMsg").innerText = addCarRes.error;
    return;
  }
  document.getElementById("errorMsg").innerText = "";
  console.log("addCarRes", addCarRes);
  location.reload();
});
