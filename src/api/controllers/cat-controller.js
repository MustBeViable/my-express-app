import {
  addCat,
  findCatById,
  listAllCats,
  modifyCat,
  removeCat
} from "../models/cat-model.js";

const getCats = async (req, res) => {
  res.json(await listAllCats());
};

const getCatById = async (req, res) => {
  console.log(req.params.id);
  const cat = await findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = async (req, res) => {
  //console.log("req.body:", req.body);
  //console.log("req.file:", req.file);
  const payload = {
    ...req.body,
    filename: req.file?.filename ?? null,
  };
  const result = await addCat(payload);
  if (result.cat_id) {
    res.status(201);
    res.json({ message: "New cat added.", result });
  } else {
    res.sendStatus(400);
  }
};

const putCat = async (req, res) => {
  const updateCat = await modifyCat(req.body, req.body.cat_id);
  if (!updateCat) {
    res.json({ message: "Cat not found." });
    res.status(404);
  } else {
    res.json({ message: updateCat.message });
    res.status(200);
  }
};

const deleteCat = async (req, res) => {
  const catRemoved = await removeCat(params.id);
  if (!catRemoved) {
    res.json({ message: "Cat not found." });
    res.status(404);
  } else
  res.json({ message: catRemoved.message });
  res.status(200);
};

/*

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

export { getCats as getCat, getCatById, postCat, putCat, deleteCat };
