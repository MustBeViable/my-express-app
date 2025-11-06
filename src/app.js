import express from "express";
import router from "./api/index.js";
import catRouter from "./api/routes/cat-router.js";
const app = express();
const hostname = "127.0.0.1";
const port = 3000;

app.use('/public', express.static('public'));

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use('/api/v1', router);

app.get("/api/v1", (req, res) => {
  res.send("Welcome to my REST API!");
});
/*




app.get("/api/v1/cats", (reg, res) => {
  const cats = getCat();
  res.json(cats);
});

app.get("/api/v1/cats/:id", (reg, res) => {
  const id = reg.params.id;
  const cat = cats.find((cat) => cat.cat_id === parseInt(id));
  if (cat) {
    res.json(cat);
    return;
  }

  res.send(res.status(404).json({message: "cat not found"}))

});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/

export default app;