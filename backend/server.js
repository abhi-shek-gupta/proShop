const express = require("express");
const dotenv = require("dotenv");
const products = require("./data/products");

dotenv.config();
const app = express();
app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find(({ _id }) => id === _id);
  res.json(product);
});

const { PORT, NODE_ENV } = process.env;
app.listen(PORT, console.log(`Server is running in ${NODE_ENV} on ${PORT}`));
