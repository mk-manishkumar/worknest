import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: "Title is required",
    },
    description: {
      type: String,
      required: "Description is required",
    },
    requirements: {
      type: [String],
      required: "Requirements is required",
    },
    location: {
      type: String,
      required: "Location is required",
    },
    salary: {
      type: String,
      required: "Salary is required",
    },
    experienceLevel: {
      type: String,
      required: "Experience is required",
    },
    jobType: {
      type: String,
      enum: ["Full time", "Part time", "Contract", "Internship", "Freelance"],
      required: "Job type is required",
    },
    jobOpenings: {
      type: Number,
      required: "Position is required",
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: "Company is required",
    },

    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: "Created by is required",
    },

    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
