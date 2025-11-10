import {
  addCat,
  findCatById,
  listAllCats,
  modifyCat,
  removeCat,
  getOwnerNameByCatId,
  getCatByOnwerId,
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
  const payload = {
    ...req.body,
    owner: res.locals.user.user_id ?? null,
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
  let isUsersCat;
  const cats = await getCatByOnwerId(res.locals.user.user_id);
  console.log(typeof cats)
  cats[0].forEach(cat => {
    if (cat.owner === res.locals.user.user_id) {
      isUsersCat = true;
    }
  })
  if (isUsersCat || res.locals.user.role === "admin") {
    const updateCat = await modifyCat(req.body, req.params.id);
    if (!updateCat) {
      res.status(404);
      res.json({ message: "Cat not found." });
      return;
    } else {
      res.status(200);
      res.json({ message: updateCat.message });
      return;
    }
  }
  res.sendStatus(403);
};

const deleteCat = async (req, res) => {
  if (getCatByOnwerId(res.locals.user.user_id) || res.locals.user.role === "admin" ) {
    const catRemoved = await removeCat(req.params.id);
    if (!catRemoved) {
      res.json({ message: "Cat not found." });
      res.status(404);
      return;
    } else {
      res.json({ message: catRemoved.message });
      res.status(200);
      return;
    }
  }
  res.sendStatus(403);
};

const getCatsOwner = async (req, res) => {
  const owner = await getOwnerNameByCatId(req.params.id);
  if (!owner) {
    res.json({ message: "owner not found." });
    res.status(404);
  } else {
    res.json({ message: "owner found", name: owner.name });
  }
};

export {
  getCats as getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
  getCatsOwner,
};
