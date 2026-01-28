import asyncHandler from "express-async-handler";
import { queryGetAllUsersWithTickets } from "../services/dbServises.js";

export const getAllUsersWithTickets = asyncHandler(async (req, res) => {
  const usersWithTickets = await queryGetAllUsersWithTickets();

  if (usersWithTickets.rows.length === 0) {
    return res.json({ message: "There are no users who have tickets." });
  }
  return res.json({ usersWithTickets: usersWithTickets.rows });
});
