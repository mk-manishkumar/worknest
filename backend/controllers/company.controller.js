import { Company } from "../models/company.model.js";
import getDataUri from "../utils/dataURI.js";
import cloudinary from "../utils/cloudinary.js";
import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";
import { devLog } from "../utils/consoleLogHelper.js";

// ==================== REGISTER COMPANY ====================
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "Company already exists",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company created successfully",
      success: true,
      company,
    });
  } catch (error) {
    devLog(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// ==================== GET ALL COMPANIES FOR USER ====================
export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find({ userId: req.id });

    if (!companies || companies.length === 0) {
      return res.status(404).json({
        message: "No companies found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      companies,
    });
  } catch (error) {
    devLog(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// ==================== GET COMPANY BY ID ====================
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    devLog(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// ==================== UPDATE COMPANY ====================
export const updateCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    const { name, description, website, location } = req.body;

    const updatedData = { name, description, website, location };

    // Only upload a logo if a file is provided
    if (req.file) {
      const fileURI = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileURI.content);
      updatedData.logo = cloudResponse.secure_url;
    }

    const company = await Company.findByIdAndUpdate(companyId, updatedData, { new: true });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company updated successfully",
      success: true,
      company,
    });
  } catch (error) {
    devLog(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// ==================== DELETE COMPANY ====================
export const deleteCompany = async (req, res) => {
  try {
    const companyId = req.params.id;

    const company = await Company.findByIdAndDelete(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    // Find jobs belonging to this company
    const jobs = await Job.find({ company: companyId });
    const jobIds = jobs.map((job) => job._id);

    // Remove related applications and jobs
    await Application.deleteMany({ job: { $in: jobIds } });
    await Job.deleteMany({ company: companyId });

    return res.status(200).json({
      message: "Company, associated jobs, and applications deleted successfully",
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
