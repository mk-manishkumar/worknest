import express from "express";
import userAuth from "./../middlewares/authMiddleware.js";
import { getUserController, updateUserController } from "../controllers/user.controller.js";

const userRouter = express.Router();

// GET USER DATA || POST
userRouter.post("/getuser", userAuth, getUserController);

// UPDATE USER || PUT
userRouter.put("/update-user", userAuth, updateUserController);

export default userRouter;
