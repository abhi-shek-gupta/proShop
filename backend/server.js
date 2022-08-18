const express = require("express");
const products = require("./data/products");

const app = express();
app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/product/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find(({ _id }) => id === _id);
  res.json(product);
});

app.listen(5000, console.log("Server is running on 5000"));
