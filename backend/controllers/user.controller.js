import { User } from "../models/user.model.js";
import { Job } from "../models/job.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "./../utils/dataURI.js";
import cloudinary from "./../utils/cloudinary.js";

// ============================== REGISTER CONTROLLER ==========================
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    const file = req.file;
    const fileURI = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileURI.content);

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists with this email", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: { profilePhoto: cloudResponse.secure_url },
    });

    return res.status(201).json({ message: "User registered successfully", success: true });
  } catch (error) {
    console.log(error);
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
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "7 days" });

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
        secure: process.env.NODE_ENV === "production", // only true in production
        maxAge: 7 * 24 * 60 * 60 * 1000, 
      })
      .json({ message: `Welcome back ${user.fullname}`, user, success: true });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// ============================== LOGOUT CONTROLLER ==========================
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({ message: "Logged out successfully", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// ============================== UPDATE PROFILE ==========================
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;
    const fileURI = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileURI.content, { resource_type: "raw" });

    let skillsArray = skills ? skills.split(",") : [];
    const userId = req.id;
    let user = await User.findById(userId);

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({ message: "Profile updated successfully", user, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", success: false });
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
    console.log(error);
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
    console.log(error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// ============================== GET SAVED JOBS ==========================
export const getSavedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.id).populate({ path: "savedJobs", populate: { path: "company" } });

    if (!user) return res.status(404).json({ message: "User not found", success: false });

    return res.status(200).json({ success: true, savedJobs: user.savedJobs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};
