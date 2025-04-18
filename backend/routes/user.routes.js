import express from "express";
import { register, login, updateProfile, logout, saveJob, unsaveJob, getSavedJobs } from "../controllers/user.controller.js";
import isAuthenticated from "./../middlewares/authentication.js";
import { singleUpload } from "./../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);
router.route("/save-job").post(isAuthenticated, saveJob);
router.route("/unsave-job").post(isAuthenticated, unsaveJob);
router.route("/saved-jobs").get(isAuthenticated, getSavedJobs);

export default router;
