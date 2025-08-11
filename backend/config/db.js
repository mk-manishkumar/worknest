import mongoose from "mongoose";
import { devLog } from "./../utils/consoleLogHelper";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    if (process.env.NODE_ENV === "development") {
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
  } catch (error) {
    devLog(error);
    process.exit(1);
  }
};

export default connectDB;
