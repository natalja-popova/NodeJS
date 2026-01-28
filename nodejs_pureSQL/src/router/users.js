import express from "express";
import {
  getAllUsers,
  getUserById,
  getUserByIdWithTickets,
  buyTicket,
  updateUserBalanceById,
} from "../controllers/user.js";
import { getNewJwtToken } from "../utils/jwt.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getAllUsers);
router.get("/newJwtToken", getNewJwtToken);
router.get("/:id", auth, getUserById);

router.patch("/:id/balance", auth, updateUserBalanceById);

router.get("/:id/tickets", auth, getUserByIdWithTickets);
router.post("/:id/purchase", auth, buyTicket);

export default router;
