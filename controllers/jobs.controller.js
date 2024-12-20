import JobsModel from "../models/Jobs.model.js";
import mongoose from "mongoose";
import moment from "moment";

// ========= CREATE JOBS ==========
export const createJobController = async (req, res, next) => {
  const { company, position, workLocation } = req.body;
  if (!company || !position || !workLocation) next("Please provide All Fields");

  req.body.createdBy = req.user.userId;
  const job = await JobsModel.create(req.body);

  res.status(201).json({ job });
};

// ========= GET JOBS ==========
export const getAllJobsController = async (req, res, next) => {
  const { status, workType, search, sort } = req.query;

  // condition for searching filter
  const queryObject = {
    createdBy: req.user.userId,
  };

  // logic filters
  if (status && status !== "all") {
    queryObject.status = status;
  }

  if (workType && workType !== "all") {
    queryObject.workType = workType;
  }

  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  let queryResult = JobsModel.find(queryObject);

  // sorting
  if (sort === "latest") {
    queryResult = queryResult.sort("-createdAt");
  }

  if (sort === "oldest") {
    queryResult = queryResult.sort("createdAt");
  }

  if (sort === "a-z") {
    queryResult = queryResult.sort("position");
  }

  if (sort === "z-a") {
    queryResult = queryResult.sort("-position");
  }

  // PAGINATION

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  queryResult = queryResult.skip(skip).limit(limit);
  // Jobs Count
  const totalJobs = await JobsModel.countDocuments(queryResult);
  const numberOfPage = Math.ceil(totalJobs / limit);

  const jobs = await queryResult;

  const showAllJobs = await JobsModel.find({ createdBy: req.user.userId });

  res.status(200).json({
    totalJobs,
    jobs,
    showAllJobs,
    numberOfPage,
  });
};

// ========= UPDATE JOBS ==========
export const updateJobController = async (req, res, next) => {
  const { id } = req.params;
  const { company, position, workLocation } = req.body;

  if (!company || !position || !workLocation) next("Please provide All Fields");

  // find job
  const job = await JobsModel.findOne({ _id: id });

  // validation
  if (!job) next("No jobs found!");
  if (!req.user.userId === job.createdBy.toString()) return next("You're not authroized to update this job");

  const updateJob = await JobsModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ updateJob });
};

// ========= DELETE JOBS ==========
export const deleteJobController = async (req, res, next) => {
  const { id } = req.params;

  // find job
  const job = await JobsModel.findOne({ _id: id });

  // validation
  if (!job) next("No jobs found!");
  if (!req.user.userId === job.createdBy.toString()) return next("You're not authroized to delete this job");

  await job.deleteOne();

  res.status(200).json({ message: "Success, Job Deleted!" });
};

// ========= JOBS STATS & FILTER ==========
export const jobStatsController = async (req, res, next) => {
  const stats = await JobsModel.aggregate([
    // search by user job
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  // default stats
  const defaultStats = {
    pending: stats.pending || 0,
    reject: stats.reject || 0,
    interview: stats.interview || 0,
  };

  // monthly/yearly stats
  let monthlyApplication = await JobsModel.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  // Format monthly application data into a human-readable date string and reverse the order to show the latest months first.
  monthlyApplication = monthlyApplication
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  res.status(200).json({ totalJobs: stats.length, defaultStats, monthlyApplication });
};
