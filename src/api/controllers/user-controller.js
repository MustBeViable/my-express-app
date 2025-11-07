import bcrypt from "bcrypt";
import {
  listAllUsers,
  findUserById,
  addUser,
  getCatsByUser,
  updateUser,
  deleteUser
} from "../models/user-model.js";

const getUser = async (req, res) => {
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
  if (req.params.id === res.locals.user.user_id) {
    const result = await getCatsByUser(req.params.id);
    if (result) {
      res.json({ message: "cats found", result });
      res.status(200);
    } else {
      res.sendStatus(404);
    }
    return;
  }
  res.sendStatus(400);
};

const putUser = async (req, res) => {
  if (req.params.id === res.locals.user.user_id) {
    const result = await updateUser(req.body, req.params.id);
    if (result) {
      res.json({ message: "User updated." });
      res.status(200);
      return;
    }
    res.sendStatus(400);
    return;
  }
  res.sendStatus(401);
};

const deleteUser = async (req, res) => {
  if (req.params.id === res.locals.user.user_id) {
    const result = await
    res.json({ message: "User deleted." });
    res.status(200);
  }
};

/*
const postUser = (req, res) => {
  const result = addUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({ message: "New user added.", result });
  } else {
    res.sendStatus(400);
  }
};


const putUser = (req, res) => {
  const user = findUserById(res.params.id);
  if (user) {

    res.sendStatus(200);
   }
};

const deleteUser = (req, res) => {
  const result = deleteUserById(req.params.id);
  if (result) {
    res.json({ message: "User deleted", result });
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
};
*/

export { getUser, getUserById, postUser, putUser, deleteUser, getUserCats };
