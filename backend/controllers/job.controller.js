import { Job } from "../models/job.model.js";

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
      salary: Number(salary),
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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
