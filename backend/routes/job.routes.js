import express from "express";
import isAuthenticated from "./../middlewares/authentication.js";
import { getAllJobs, getJobById, getJobsByAdmin, postJob } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getJobsByAdmin);
router.route("/get/:id").get(isAuthenticated, getJobById);

export default router;
