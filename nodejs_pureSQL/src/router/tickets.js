import express from "express";
import { getAllUsersWithTickets } from "../controllers/tickets.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getAllUsersWithTickets);

export default router;
