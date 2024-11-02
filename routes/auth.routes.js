import express from "express";
import { loginController, registerController } from "../controllers/auth.controller.js";

const authRouter = express.Router();

// REGISTER
authRouter.post("/register", registerController);

// LOGIN
authRouter.post("/login", loginController)

export default authRouter;
