import mongoose from "mongoose";

const { Schema } = mongoose;

const jobSeekerSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    password: {
      type: String,
      required: true,
    },
    portfolioLink: {
      type: String,
    },
    appliedJobs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("JobSeeker", jobSeekerSchema);
