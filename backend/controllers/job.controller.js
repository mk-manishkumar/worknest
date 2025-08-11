import { Job } from "../models/job.model.js";
import { devLog } from "../utils/consoleLogHelper.js";
import { Application } from "./../models/application.model.js";

// ==================== POST JOB ====================
export const postJob = async (req, res) => {
  try {
    const { title, description, requirements, location, salary, jobType, experience, jobOpenings, companyId } = req.body;
    const userId = req.id;

    if (!title || !description || !requirements || !location || !salary || !jobType || !experience || !jobOpenings || !companyId) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      location,
      salary,
      jobType,
      experienceLevel: experience,
      jobOpenings,
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      message: "Job posted successfully",
      success: true,
      job,
    });
  } catch (error) {
    devLog(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// ==================== GET ALL JOBS ====================
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [{ title: { $regex: keyword, $options: "i" } }, { description: { $regex: keyword, $options: "i" } }],
    };

    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    if (!jobs) {
      return res.status(404).json({
        message: "No jobs found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    devLog(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// ==================== GET JOB BY ID ====================
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate({
      path: "applications",
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    devLog(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// ==================== GET JOB BY ADMIN (COUNT) ====================
export const getJobsByAdmin = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
      createdAt: -1,
    });

    if (!jobs) {
      return res.status(404).json({
        message: "No jobs found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    devLog(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// ==================== UPDATE JOB (BY ADMIN) ====================
export const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const { title, description, requirements, location, salary, jobType, experience, jobOpenings, companyId } = req.body;

    // Create object with fields to update
    const updatedData = {
      title,
      description,
      location,
      salary,
      jobType,
      experienceLevel: experience,
      jobOpenings,
      company: companyId,
    };

    // Handle requirements array if provided
    if (requirements) {
      updatedData.requirements = requirements.split(",");
    }

    // Find job by ID and update with new data
    const job = await Job.findByIdAndUpdate(jobId, updatedData, { new: true }).populate("company");

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Job updated successfully",
      job,
      success: true,
    });
  } catch (error) {
    devLog(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// ==================== DELETE JOB (BY ADMIN) ====================
export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findByIdAndDelete(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    // Delete all related applications
    await Application.deleteMany({ job: jobId });

    return res.status(200).json({
      message: "Job deleted successfully and associated applications removed",
      success: true,
    });
  } catch (error) {
    devLog(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
