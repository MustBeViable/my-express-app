import express from "express";
import {
  getUser,
  getUserById,
  postUser,
  putUser,
  deleteUser,
  getUserCats,
} from "../controllers/user-controller.js";
import { authenticateToken } from "../../middlewares/authentication.js";

const userRouter = express.Router();

userRouter.route("/").get(authenticateToken, getUser).post(authenticateToken, postUser);

userRouter.route("/:id").get(authenticateToken, getUserById).put(authenticateToken, putUser).delete(authenticateToken, deleteUser);

userRouter.route("/cats/:id").get(authenticateToken, getUserCats);

export default userRouter;
