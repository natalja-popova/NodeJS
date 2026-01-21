import usersModel from "../models/users.js";
import { v4 as uniqueID } from "uuid";
export const getAllUsers = async (req, res) => {
  const users = await usersModel.find();
  return res.json(users);
};
export const insertUser = async (req, res) => {
  const newId = req.body.id;
  let user = await usersModel.findOne({ id: newId });

  if (!user) {
    user = new usersModel({ id: uniqueID(), ...req.body });
    await user.save();
    return res.status(201).json({ user: user });
  } else {
    return res.status(404).json({ message: `User with id: ${newId} exists` });
  }
};

export const getUserById = async (req, res) => {
  const id = req.params.id;
  const user = await usersModel.findOneAndDelete({ id: id });

  if (!user) {
    return res.status(404).json({ message: `No user with id: ${id}` });
  }

  return res.status(200).json({ user: user });
};
