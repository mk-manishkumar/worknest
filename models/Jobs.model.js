import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company Name is required"],
    },
    position: {
      type: String,
      required: [true, "job Position is required"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["Pending", "Reject", "Interview"],
      default: "Pending",
    },
    workType: {
      type: String,
      enum: ["Full Time", "Part Time", "Contract"],
      default: "Full Time",
    },
    workLocation: {
      type: String,
      required: [true, "Work location is required"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
