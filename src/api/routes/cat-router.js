import express from "express";
import multer from "multer";
import { createThumbnail } from "../../middlewares/middlewares.js";
import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
  getCatsOwner
} from "../controllers/cat-controller.js";
import { authenticateToken } from "../../middlewares/authentication.js";

const catRouter = express.Router();

const upload = multer({ dest: "uploads/" });

catRouter.route("/").get(authenticateToken, getCat).post(authenticateToken, upload.single("file"), createThumbnail, postCat);

catRouter.route("/:id").get(authenticateToken, getCatById).put(authenticateToken, putCat).delete(authenticateToken, deleteCat);

catRouter.route("/owner/:id").get(authenticateToken, getCatsOwner);

export default catRouter;
