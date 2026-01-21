import express from "express";
import {
  getAllCocktails,
  getRandomCocktail,
  getCocktailById,
  insertCocktail,
  updateCocktailById,
  deleteCocktailById,
  getCocktailsWithIngridient,
} from "../controllers/cocktails.js";

const router = express.Router();
router.get("/", getAllCocktails);
router.get("/random", getRandomCocktail);
router.get("/search", getCocktailsWithIngridient);
router.get("/:id", getCocktailById);
router.post("/", insertCocktail);
router.put("/:id", updateCocktailById);
router.delete("/:id", deleteCocktailById);

export default router;
