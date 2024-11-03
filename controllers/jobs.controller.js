import JobsModel from "../models/Jobs.model.js";

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
  const jobs = await JobsModel.find({ createdBy: req.user.userId });
  res.status(200).json({
    totalJobs: jobs.length,
    jobs,
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
