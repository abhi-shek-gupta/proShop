import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import cors from "cors";

dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.get("/", (req, res) => {
  res.send("API IS Running");
});
app.use("/api/products", productRoutes);
app.use(notFound);
app.use(errorHandler);
const { PORT, NODE_ENV } = process.env;
app.listen(
  PORT,
  console.log(`Server is running in ${NODE_ENV} on ${PORT}`.yellow.bold)
);
