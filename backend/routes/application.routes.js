import express from "express";
import isAuthenticated from "../middlewares/authentication.js";
import { applyJob, getAppliedJobs, getApplicants, applicationStatus } from "../controllers/application.controller.js";

const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").post(isAuthenticated, applicationStatus);

export default router;
