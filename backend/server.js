import express from "express";
import dotenv from "dotenv";
import colors from 'colors';
import products from "./data/products.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();
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
app.listen(PORT, console.log(`Server is running in ${NODE_ENV} on ${PORT}`.yellow.bold));
