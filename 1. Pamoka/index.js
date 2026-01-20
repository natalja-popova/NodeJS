// 1. Susikurti node js projektą bei susikurti aplinką;
// 2. Pabandyt iki projekto nunaviguot išmokta cd komanda;
// 3. Apsirašyti kelis vardus masyve. Sort pagalba juos išrikiuoti bei atvaizduoti consolėj;
// 4. Išsibandyti uuid biblioteką;
// 5. Apsirašyt funkciją kuriai reikia paduot vartotojo vardą bei darbovietę. Funkcija turi gražint vartotojo objektą su vartotojo vardu, darboviete bei user'io id;
import { v4 as uniqueID } from "uuid";
import casual from "casual";

const namesArray = [
  "Oliver",
  "Amelia",
  "James",
  "Sophia",
  "Henry",
  "Ava",
  "Lucas",
  "Mia",
  "Benjamin",
  "Harper",
];

const fnSortedNames = (names) => {
  return [...names].sort((a, b) => a.localeCompare(b));
};
const sortedNames = fnSortedNames(namesArray);

console.log(sortedNames);

const employee = (eName, ePlace) => {
  return {
    name: eName,
    place: ePlace,
    id: uniqueID(),
  };
};

//console.log(casual.city);
const newEmployee = employee(casual.name, casual.city);
console.log(newEmployee);

// 1. Unique & Sorted
// Given an array of numbers, return a sorted array with duplicates removed.
//set return unique array elements
const nums = [4, 2, 7, 2, 4, 9];
const uniqueArray = [...new Set(nums)].sort((a, b) => {
  return a - b;
});
console.log(uniqueArray);

// 2. Group by Property
// Group objects by category.
const items = [
  { name: "Apple", category: "fruit" },
  { name: "Carrot", category: "vegetable" },
  { name: "Banana", category: "fruit" },
];
const result = Object.groupBy(items, ({ category }) => category);
console.log(result);
//by Robertas

const fruits = items.filter((f) => {
  return f.category === "fruit";
});

const vegetables = items.filter((v) => {
  return v.category === "vegetable";
});

const cart = { fruits: fruits, vegetables: vegetables };

console.log(cart);

// Result shape
// {
//   fruit: [...],
//   vegetable: [...]
// }
