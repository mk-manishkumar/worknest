import express from "express";
import userAuth from "./../middlewares/authMiddleware.js";
import { updateUserController } from "../controllers/user.controller.js";

const userRouter = express.Router();

// GET USER || GET

// UPDATE USER || PUT
userRouter.put("/update-user", userAuth, updateUserController);

export default userRouter;
