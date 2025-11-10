import promisePool from "../../utils/database.js";

const listAllCats = async () => {
  const [rows] = await promisePool.query("SELECT * FROM wsk_cats");
  console.log("rows", rows);
  return rows;
};

const findCatById = async (id) => {
  const [rows] = await promisePool.execute(
    "SELECT * FROM wsk_cats WHERE cat_id = ?",
    [id]
  );
  console.log("rows", rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const addCat = async (cat) => {
  const { cat_name, weight, owner, filename, birthdate } = cat;
  const sql = `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate)
               VALUES (?, ?, ?, ?, ?)`;
  const params = [cat_name, weight, owner, filename, birthdate];
  const result = await promisePool.execute(sql, params);
  console.log("rows", result);
  if (result[0].affectedRows === 0) {
    return false;
  }
  return { cat_id: result[0].insertId };
};

const modifyCat = async (cat, id) => {
  console.log("tämä:", cat)
  const sql = promisePool.format(`UPDATE wsk_cats SET cat_name = ?, weight = ? WHERE cat_id = ?`, [
    cat.cat_name,
    cat.weight,
    id,
  ]);
  console.log(sql);
  const rows = await promisePool.execute(sql);
  console.log("rows", rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return { message: "success" };
};

const removeCat = async (id) => {
  const [rows] = await promisePool.execute(
    "DELETE FROM wsk_cats WHERE cat_id = ?",
    [id]
  );
  console.log("rows", rows);
  if (rows.affectedRows === 0) {
    return false;
  }
  return { message: "success" };
};

const getCatByOnwerId = async (userId) => {
  const sql = `
  SELECT *
  FROM wsk_cats
  where owner = ?`;
  const params = [userId];
  const result = await promisePool.execute(sql, params);
  if (result.length === 0) {
    return false;
  }
  return result;
};

const getOwnerNameByCatId = async (id) => {
  const sql = `
  SELECT wsk_users.name
  FROM wsk_cats
  JOIN wsk_users ON wsk_users.user_id = wsk_cats.owner
  WHERE wsk_cats.cat_id = ?`;
  const params = [id];
  const result = await promisePool.execute(sql, params);
  if (result.length === 0) {
    return false;
  }
  return result;
};

export {
  listAllCats,
  findCatById,
  addCat,
  modifyCat,
  removeCat,
  getOwnerNameByCatId,
  getCatByOnwerId
};
