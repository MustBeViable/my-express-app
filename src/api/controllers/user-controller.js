import {
listAllUsers, findUserById, addUser, updateUser, deleteUserById
} from "../models/user-model.js";

const getUser = (req, res) => {
  res.json(listAllUsers());
};

const getUserById = (req, res) => {
  console.log(req.params.id);
  const user = findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

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
  res.json({ message: "User updated." });
  res.status(200);
};

const deleteUser = (req, res) => {
  res.json({ message: "User deleted." });
  res.status(200);
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

export { getUser, getUserById, postUser, putUser, deleteUser };
