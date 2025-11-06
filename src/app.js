import express from "express";
import router from "./api/index.js";
const app = express();
const hostname = "127.0.0.1";
const port = 3000;

app.use("/public", express.static("public"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);


export default app;
