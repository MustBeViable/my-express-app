import bcrypt from "bcrypt";
import {
  listAllUsers,
  findUserById,
  addUser,
  getCatsByUser,
  updateUser,
  removeUser,
} from "../models/user-model.js";

const getUsers = async (req, res) => {
  res.json(await listAllUsers());
};

const getUserById = async (req, res) => {
  console.log(req.params.id);
  const user = await findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, 10);
  const result = await addUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({ message: "New user added.", result });
  } else {
    res.sendStatus(400);
  }
};

const getUserCats = async (req, res) => {
  if (req.params.id === res.locals.user.user_id || res.locals.user.role === "admin") {
    const result = await getCatsByUser(req.params.id);
    if (result) {
      res.json({ message: "cats found", result });
      res.status(200);
    } else {
      res.sendStatus(404);
    }
    return;
  }
  res.sendStatus(403);
};

const putUser = async (req, res) => {
  if (req.params.id === res.locals.user.user_id || res.locals.user.role === "admin") {
    const result = await updateUser(req.body, req.params.id);
    if (result) {
      res.json({ message: "User updated." });
      res.status(200);
      return;
    }
    res.sendStatus(400);
    return;
  }
  res.sendStatus(403);
};

const deleteUser = async (req, res) => {
  if (req.params.id === res.locals.user.user_id || res.locals.user.role === "admin") {
    const result = await removeUser(req.params.id);
    if (result) {
      res.json({ message: "User deleted." });
      res.status(200);
    } else {
      res.sendStatus(404);
    }
  }
  res.sendStatus(403);
};


export { getUsers, getUserById, postUser, putUser, deleteUser, getUserCats };
