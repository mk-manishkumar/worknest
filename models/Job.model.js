import mongoose from "mongoose";

const { Schema } = mongoose;

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    requirements: {
      type: String,
      required: true,
    },
    employer: {
      type: Schema.Types.ObjectId,
      ref: "Employer",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
