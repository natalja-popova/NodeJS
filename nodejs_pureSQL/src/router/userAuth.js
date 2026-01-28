import express from "express";
import { createNewUser, login } from "../controllers/userAuth.js";

const router = express.Router();

router.post("/register", createNewUser);
router.get("/login", login);

export default router;
