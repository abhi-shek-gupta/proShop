import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
const router = express.Router();

/**
 * @desc Fetch All products
 * @routes GET /api/products
 * @access public
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

/**
 * @desc Fetch a single product
 * @routes GET /api/products/:id
 * @access public
 */
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);

      throw new Error("Product not found");
    }
  })
);

export default router;
