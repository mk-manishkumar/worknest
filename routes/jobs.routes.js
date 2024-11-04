import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { createJobController, deleteJobController, getAllJobsController, jobStatsController, updateJobController } from "../controllers/jobs.controller.js";

const jobsRouter = express.Router();

// CREATE JOB || POST
jobsRouter.post("/create-job", userAuth, createJobController);

// GET JOBS || GET
jobsRouter.get("/get-job", userAuth, getAllJobsController);

// UPDATE JOB || PUT || PATCH
jobsRouter.patch("/update-job/:id", userAuth, updateJobController);

// DELETE JOB || DELETE
jobsRouter.delete("/delete-job/:id", userAuth, deleteJobController);

// JOB STATS FILTER || GET
jobsRouter.get("/job-stats", userAuth, jobStatsController);

export default jobsRouter;
