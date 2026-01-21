// /getAllRecipies
import cocktailsModel from "../models/cocktails.js";
import { v4 as uniqueID } from "uuid";
export const getAllCocktails = async (req, res) => {
  const cocktails = await cocktailsModel.find();
  if (!cocktails) {
    return res.status(404).json({ message: `No cocktails` });
  }
  return res.json(cocktails);
};

// /getRecipesById
export const getCocktailById = async (req, res) => {
  const id = req.params.id;
  const cocktail = await cocktailsModel.findOne({ id: id });
  if (!cocktail) {
    return res.status(404).json({ message: `No cocktail with id ${id}` });
  }
  return res.json({ message: cocktail });
};

// /insertRecipies
export const insertCocktail = async (req, res) => {
  const newId = req.body.id;
  let cocktail = await cocktailsModel.findOne({ id: newId });

  if (!cocktail) {
    cocktail = new cocktailsModel({ id: uniqueID(), ...req.body });
    await cocktail.save();
    return res.status(201).json({ cocktail: cocktail });
  } else {
    return res
      .status(404)
      .json({ message: `Kokteilis su id ${newId} jau egzistuoja.` });
  }
};

// /updateRecipie
export const updateCocktailById = async (req, res) => {
  const id = req.params.id;
  let cocktail = await cocktailsModel.findOneAndUpdate(
    { id: id },
    { ...req.body },
    { new: true },
  );
  if (!cocktail) {
    return res.status(404).json({ message: `Kokteilis su id ${id} nerastas` });
  }
  return res.status(200).json({ cocktail: cocktail });
};

// /deleteRecipie
export const deleteCocktailById = async (req, res) => {
  const id = req.params.id;
  const cocktail = await cocktailsModel.findOneAndDelete({ id: id });

  if (!cocktail) {
    return res.status(404).json({ message: `No cocktail with id: ${id}` });
  }

  return res.status(200).json({ cocktail: cocktail });
};

// /getRandomRecepie
export const getRandomCocktail = async (req, res) => {
  const cocktails = await cocktailsModel.find();
  const randomCocktail =
    cocktails[Math.floor(Math.random() * cocktails.length)];
  console.log(randomCocktail);
  res.json({ randomCocktail });
};

// /getAllRecepiesWithIngridient
export const getCocktailsWithIngridient = async (req, res) => {
  let searchWord = req.query.q;
  const cocktails = await cocktailsModel.find();
  const filteredCocktails = cocktails.filter((cocktail) =>
    cocktail.ingredients.some((ing) => ing.toLowerCase().includes(searchWord)),
  );
  res.json({ message: filteredCocktails });
};
