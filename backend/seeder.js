import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Order from "./models/orderModel.js";
import Product from "./models/productModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const destroyData = async () => {
  try {
    // clear (wipe out) collection if any data exists
    await User.deleteMany();
    await Order.deleteMany();
    await Product.deleteMany();
    console.log("Data Destroyed!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    destroyData();

    // insert data
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((product) => ({
      ...product,
      user: adminUser,
    }));

    await Product.insertMany(sampleProducts);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

/**
 * NOTE:- arguments passed during execution of script can we get thorugh `process.argv[2]`.
 * i.e node backend/seeder -d
 */
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
