import express from "express";

const app = express();
const hostname = "127.0.0.1";
const port = 3000;

//mock-data
const cats = [
  {
    cat_id: 123,
    name: "kissa1",
    birthdate: "01.01.2001",
    weight: 69,
    owner: "Hessu",
    image: "https://loremflickr.com/320/240/cat)",
  },
  {
    cat_id: 124,
    name: "kissa2",
    birthdate: "02.02.2021",
    weight: 67,
    owner: "Ressu",
    image: "https://loremflickr.com/320/240/cat3)",
  },
];

app.use('/public', express.static('public'));

app.get("/api/v1", (req, res) => {
  res.send("Welcome to my REST API!");
});

//cats enpoints

app.get("/api/v1/cats", (reg, res) => {
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
