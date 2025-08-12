import { User } from "../models/user.model.js";
import { Job } from "../models/job.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "./../utils/dataURI.js";
import cloudinary from "./../utils/cloudinary.js";
import { devLog } from "../utils/consoleLogHelper.js";

// ============================== REGISTER CONTROLLER ==========================
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email", success: false });
    }

    let profilePhotoUrl = null;
    if (req.file) {
      const fileURI = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileURI.content);
      profilePhotoUrl = cloudResponse.secure_url;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: { profilePhoto: profilePhotoUrl },
    });

    return res.status(201).json({ message: "User registered successfully", success: true });
  } catch (error) {
    devLog(error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// ============================== LOGIN CONTROLLER ==========================
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials", success: false });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials", success: false });
    }

    if (user.role !== role) {
      return res.status(403).json({ message: "Invalid role", success: false });
    }

    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "7 days",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ message: `Welcome back ${user.fullname}`, user, success: true });
  } catch (error) {
    devLog(error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// ============================== LOGOUT CONTROLLER ==========================
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({ message: "Logged out successfully", success: true });
  } catch (error) {
    devLog(error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// ============================== UPDATE PROFILE ==========================
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    const updatedData = {};
    if (fullname) updatedData.fullname = fullname;
    if (email) updatedData.email = email;
    if (phoneNumber) updatedData.phoneNumber = phoneNumber;
    if (bio) updatedData['profile.bio'] = bio;
    if (skills) updatedData['profile.skills'] = skills.split(',').map((s) => s.trim()).filter(Boolean);

    // Handle profile photo upload (field name: profilePhoto)
    if (req.files?.profilePhoto?.[0]) {
      const fileUri = getDataUri(req.files.profilePhoto[0]);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      updatedData['profile.profilePhoto'] = cloudResponse.secure_url;
    }

    // Handle resume upload (field name: resume)
    if (req.files?.resume?.[0]) {
      const resumeFile = req.files.resume[0];
      const resumeUri = getDataUri(resumeFile);
      const cloudResponse = await cloudinary.uploader.upload(resumeUri.content, { resource_type: 'raw' });
      updatedData['profile.resume'] = cloudResponse.secure_url;
      updatedData['profile.resumeOriginalName'] = resumeFile.originalname;
    }

    const user = await User.findByIdAndUpdate(req.id, { $set: updatedData }, { new: true }).lean();

    if (!user) {
      return res.status(404).json({ message: 'User not found', success: false });
    }

    return res.status(200).json({ message: 'Profile updated successfully', success: true, user });
  } catch (error) {
    devLog(error);
    return res.status(500).json({ message: 'Internal server error', success: false });
  }
};



// ============================== SAVE JOB ==========================
export const saveJob = async (req, res) => {
  try {
    const userId = req.id;
    const { jobId } = req.body;

    if (!jobId) return res.status(400).json({ message: "Job ID is required", success: false });

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found", success: false });

    const user = await User.findById(userId);
    if (user.savedJobs.includes(jobId)) {
      return res.status(400).json({ message: "Job already saved", success: false });
    }

    user.savedJobs.push(jobId);
    await user.save();

    return res.status(200).json({ message: "Job saved for later", success: true });
  } catch (error) {
    devLog(error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// ============================== UNSAVE JOB ==========================
export const unsaveJob = async (req, res) => {
  try {
    const userId = req.id;
    const { jobId } = req.body;

    const user = await User.findById(userId);
    user.savedJobs = user.savedJobs.filter((id) => id.toString() !== jobId);
    await user.save();

    return res.status(200).json({ message: "Job removed from saved list", success: true });
  } catch (error) {
    devLog(error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// ============================== GET SAVED JOBS ==========================
export const getSavedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.id).populate({
      path: "savedJobs",
      populate: { path: "company" },
    });

    if (!user) return res.status(404).json({ message: "User not found", success: false });

    return res.status(200).json({ success: true, savedJobs: user.savedJobs });
  } catch (error) {
    devLog(error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};
