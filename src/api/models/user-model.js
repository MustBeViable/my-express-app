import promisePool from "../../utils/database.js";

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

const updateUser = (user) => {};
/*
const deleteUserById = (id) => {
  if (findUserById(id)) {
    for (let i = 0; i < userItems.length; i++) {
      if (findUserById(id) == userItems[i]) {
        userItems.splice(i, 1);
      }
    }
    return true;
  } else {
    return false;
  }
};
*/
export { listAllUsers, findUserById, addUser, getCatsByUser };
