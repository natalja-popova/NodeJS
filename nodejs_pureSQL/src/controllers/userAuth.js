import bcrypt from "bcryptjs";
import { pool } from "../config/db.js";
import { v4 as uniqueID } from "uuid";
import { capitalizeText, validateEmail, validatePsw } from "../utils/utils.js";
import { createToken } from "../utils/jwt.js";
import { isUserExists, findUserByEmail } from "../services/dbServises.js";
import asyncHandler from "express-async-handler";

export const createNewUser = asyncHandler(async (req, res) => {
  const data = req.body;
  let { name, email, password, money_balance } = data;
  const uniqueId = uniqueID();

  if (!email || !password || !name) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const isValidEmail = validateEmail(email);

  if (!isValidEmail)
    return res.status(401).json({
      message: `Invalid email format`,
    });

  const isValidPsw = validatePsw(password);
  if (!isValidPsw)
    return res.status(400).json({
      message:
        "Password must be at least 6 characters long, contain at least one number, and use only valid characters.",
    });

  const isExists = await isUserExists(email, uniqueId);
  if (isExists)
    return res.status(409).json({
      message: `User with ID ${uniqueId} or with email ${email} already exists`,
    });

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  name = capitalizeText(name);

  const query = `INSERT INTO users (id, name, email, password, money_balance) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;

  const values = [uniqueId, name, email, hash, money_balance];

  const result = await pool.query(query, values);

  const token = createToken(email, uniqueId, "access");
  const tokenRefresh = createToken(email, uniqueId, "refresh");

  return res
    .status(201)
    .json({ user: result.rows[0], token: token, token_refresh: tokenRefresh });
});

export const login = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await findUserByEmail(email);

  if (!user) {
    return res.status(401).json({ message: "Bad email" });
  }
  const isPasswordMatch = bcrypt.compareSync(password, user.password);

  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Bad password" });
  }
  const token = createToken(email, user.id, "access");
  const tokenRefresh = createToken(email, user.id, "refresh");
  return res.status(200).json({ jwt: token, jwt_refresh: tokenRefresh });
});
