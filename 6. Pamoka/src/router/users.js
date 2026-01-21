import express from "express";
import { getAllUsers, getUserById, insertUser } from "../controllers/users.js";

const router = express.Router();
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", insertUser);
export default router;
