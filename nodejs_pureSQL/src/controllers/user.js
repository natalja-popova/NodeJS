import { pool } from "../config/db.js";
import { v4 as uniqueID } from "uuid";
import asyncHandler from "express-async-handler";
import {
  queryGetAllUsers,
  queryGetUserById,
  queryGetUserByIdWithTickets,
  queryUpdateUser,
  queryLockUserForUpdate,
  queryUpdateUserBalance,
  queryInsertTicket,
} from "../services/dbServises.js";

//----getAllUsers
export const getAllUsers = asyncHandler(async (req, res) => {
  const allUsers = await queryGetAllUsers();
  return res.json({ allUsers: allUsers.rows });
});

//---getUserById
export const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({ message: "Missing user id in URL" });
  }

  const result = await queryGetUserById(userId);

  if (result.rows.length === 0) {
    return res
      .status(404)
      .json({ message: `User with id  ${userId} not found` });
  }
  return res.json({ user: result.rows });
});

export const getUserByIdWithTickets = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({ message: "Missing user id in URL" });
  }
  const result = await queryGetUserByIdWithTickets(userId);

  if (result.rows.length === 0) {
    return res.json({
      message: `User with id ${userId} doesn’t have any tickets.`,
    });
  }
  return res.json({ usersWithTickets: result.rows });
});

export const buyTicket = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({ message: "Missing user id in URL" });
  }
  /* check body and fields  */
  if (!req.body) {
    return res.status(400).json({ error: "Body is required" });
  }

  const {
    id,
    title,
    ticket_price,
    from_location,
    to_location,
    to_location_photo_url,
  } = req.body;

  if (!id || !title || !ticket_price || !from_location || !to_location) {
    return res.status(400).json({
      error:
        "Please add missing  fields. Required fields: id, title, ticket_price, from_location, to_location",
    });
  }
  /* end check body and fields */

  /*  Start a transaction and get a dedicated client connection  */
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const userData = await queryLockUserForUpdate(client, userId); // FOR UPDATE locks this row so no other transaction can modify it
    if (userData.rows.length === 0) {
      await client.query("ROLLBACK"); // cancel the transaction and release all row locks

      return res
        .status(404)
        .json({ message: `User with id  ${userId} not found` });
    }
    const user = userData.rows[0];
    let userMoneyBalance = user.money_balance;

    if (Number(ticket_price) > Number(userMoneyBalance)) {
      await client.query("ROLLBACK");

      return res.status(400).json({
        message:
          "Not enough money to buy the ticket. Please top up your balance.",
      });
    }
    const updatedUser = await queryUpdateUserBalance(
      client,
      ticket_price,
      userId,
    );
    const insertedTicket = await queryInsertTicket(client, {
      id: uniqueID(),
      title,
      ticket_price,
      from_location,
      to_location,
      to_location_photo_url,
      userId,
    });

    await client.query("COMMIT"); // commit all changes to the database
    return res.json({
      message: "Ticket purchased successfully",
      user: updatedUser.rows[0],
      ticket: insertedTicket.rows[0],
    });
  } catch (err) {
    await client.query("ROLLBACK"); // cancel the transaction
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  } finally {
    client.release(); // release the connection; always runs after commit/rollback
  }
  /*  END Start a transaction and get a dedicated client connection  */
});

export const updateUserBalanceById = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const { add_money } = req.body || {};

  if (add_money === undefined) {
    return res.status(400).json({ error: "add_money is required" });
  }

  const amount = Number(add_money);

  if (isNaN(amount)) {
    return res.status(400).json({ error: "add_money must be a valid number" });
  }

  if (!userId) {
    return res.status(400).json({ message: "Missing user id in URL" });
  }
  const result = await queryGetUserById(userId);
  if (result.rows.length === 0) {
    return res
      .status(404)
      .json({ message: `User with id  ${userId} not found` });
  }
  const user = result.rows[0];
  const existingBalance = Number(user.money_balance);
  const updatedBalance = amount + existingBalance;
  const updateUser = await queryUpdateUser(updatedBalance, userId);
  res.json({
    message: "Balance has been topped up.",
    updatedUser: updateUser.rows,
  });
});
