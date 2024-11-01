import mongoose from "mongoose";

const { Schema } = mongoose;

const guestSchema = new Schema(
  {
    fullname: {
      type: String,
      default: "Guest User",
    },
    email: String,
    password: String,
    portfolioLink: String,
    appliedJobs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Guest", guestSchema);
