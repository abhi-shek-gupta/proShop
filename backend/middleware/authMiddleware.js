import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  const {
    headers: { authorization },
  } = req;

  if (authorization && authorization.startsWith("Bearer")) {
    try {
      const token = authorization.split(" ")[1];
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Autorization Error: Invalid Token");
    }
  } else {
    res.status(401);
    throw new Error("Autorization Error: No token Found");
  }
});

export { protect };
