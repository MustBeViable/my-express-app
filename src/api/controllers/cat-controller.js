import {
  addCat,
  findCatById,
  listAllCats,
  deleteCatById,
} from "../models/cat-model.js";

const getCat = (req, res) => {
  res.json(listAllCats());
};

const getCatById = (req, res) => {
  console.log(req.params.id);
  const cat = findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = (req, res) => {
  console.log("req.body:", req.body);
  console.log("req.file:", req.file);
  const payload = {
    ...req.body,
    filename: req.file?.filename ?? null
  };
  const result = addCat(payload);
  if (result.cat_id) {
    res.status(201);
    res.json({ message: "New cat added.", result });
  } else {
    res.sendStatus(400);
  }
};

const putCat = (req, res) => {
  res.json({ message: "Cat updated." });
  res.status(200);
};

const deleteCat = (req, res) => {
  res.json({ message: "Cat deleted." });
  res.status(200);
};

/*
const postCat = (req, res) => {
  const result = addCat(req.body);
  if (result.cat_id) {
    res.status(201);
    res.json({ message: "New cat added.", result });
  } else {
    res.sendStatus(400);
  }
};


const putCat = (req, res) => {
  const cat = findCatById(res.params.id);
  if (cat) {

    res.sendStatus(200);
   }
};

const deleteCat = (req, res) => {
  const result = deleteCatById(req.params.id);
  if (result) {
    res.json({ message: "Cat deleted", result });
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
};
*/

export { getCat, getCatById, postCat, putCat, deleteCat };
