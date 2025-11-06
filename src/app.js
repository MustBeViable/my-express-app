import express from "express";
import router from "./api/index.js";
import catRouter from "./api/routes/cat-router.js";
const app = express();
const hostname = "127.0.0.1";
const port = 3000;

app.use("/public", express.static("public"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.get("/example/middleware", (req, res, next) => {
  console.log("stuff häppens");
  next();
},  (req, res, next) => {
  console.log("stuff häppens2");
  next();
}, (req, res, next) => {
  console.log("stuff häppens3");
  next();
}, (req, res, next) => {
  console.log("stuff häppens4");
});

export default app;
