import promisePool from "../../utils/database.js";
import bcrypt from "bcrypt";

const listAllUsers = async () => {
  const [rows] = await promisePool.query("SELECT * FROM wsk_users");
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    "SELECT * FROM wsk_users WHERE user_id = ?",
    [id]
  );
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const addUser = async (user) => {
  const { name, username, email, password, role } = user;
  const sql = `INSERT INTO wsk_users (name, username, email, password, role)
               VALUES (?, ?, ?, ?, ?)`;
  const params = [name, username, email, password, role];
  const result = await promisePool.execute(sql, params);
  if (result[0].affectedRows === 0) {
    return false;
  }
  return { user_id: result[0].insertId };
};

const getCatsByUser = async (user_id) => {
  console.log(user_id);
  const sql = `SELECT * FROM wsk_cats WHERE owner = ?`;
  const params = [user_id];
  const result = await promisePool.execute(sql, params);
  if (result.length === 0) {
    return false;
  }
  return result;
};

const findUserByUsername = async (username) => {
  const [rows] = await promisePool.execute(
    "SELECT * FROM wsk_users WHERE username = ?",
    [username]
  );
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const updateUser = async (user, id) => {
  const { name, username, email, password } = user;
  const sql = `
    UPDATE wsk_users
    SET name = ?, username = ?, email = ?, password = ?, role = 'user'
    WHERE user_id = ?`;
  const params = [name, username, email, password, id];
  const result = await promisePool.execute(sql, params);
  if (result[0].affectedRows === 0) {
    return false;
  }
  return { user_id: result[0].insertId };
};

const deleteUser = async (userId) => {
  const sql = `
    DELETE FROM wsk_users
    WHERE user_id = ?;
  `;
  const params = [userId];
  const result = await promisePool.execute(sql, params);
  if (result[0].affectedRows === 0) {
    return false;
  }
  return true;
};

export {
  listAllUsers,
  findUserById,
  addUser,
  getCatsByUser,
  findUserByUsername,
  updateUser,
  deleteUser
};
