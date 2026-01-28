import jwt from "jsonwebtoken";
import { findUserByEmail } from "../services/dbServises.js";

export const createToken = (email, id, tokenType) => {
  let tokenRandomiser = process.env.JWT_RANDOMISER;
  let tokenExpiration = "1h";
  if (tokenType === "refresh") {
    tokenRandomiser = process.env.JWT_REFRESH_RANDOMISER;
    tokenExpiration = "12h";
  }
  const token = jwt.sign({ email, id }, tokenRandomiser, {
    expiresIn: tokenExpiration,
  });
  return token;
};

export const getNewJwtToken = async (req, res) => {
  const { refresh_jwt } = req.body || {};
  if (!refresh_jwt) {
    return res.status(401).json({ message: "Bad auth (no token)" });
  }
  try {
    const decoded = jwt.verify(refresh_jwt, process.env.JWT_REFRESH_RANDOMISER);
    const { email, id } = decoded;
    const user = await findUserByEmail(email);
    if (!user) {
      return res
        .status(401)
        .json({ message: "Token data mismatch (wrong email)" });
    }
    if (id !== user.id) {
      return res
        .status(401)
        .json({ message: "Token data mismatch (wrong id)" });
    }
    return res
      .status(200)
      .json({ new_token: createToken(email, id, "access") });
  } catch (err) {
    console.log("err", err.name);
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired. Please log in again.",
      });
    }

    return res.status(401).json({ message: "Invalid token" });
  }
};
