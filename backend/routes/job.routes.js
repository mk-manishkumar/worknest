import express from "express";
import isAuthenticated from "./../middlewares/authentication.js";
import { getAllJobs, getJobById, getJobsByAdmin, postJob } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getAdminJobs").get(isAuthenticated, getJobsByAdmin);
router.route("/get/:id").post(isAuthenticated, getJobById);

export default router;
