import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({});

// ==================== DATABASE CONNECTION ====================
import connectDB from "./utils/db.js";
connectDB();

// ==================== IMPORT ROUTES ====================
import userRoutes from "./routes/user.routes.js";
import companyRoutes from "./routes/company.routes.js";
import jobRoutes from "./routes/job.routes.js";
import applicationRoutes from "./routes/application.routes.js";

const app = express();

const PORT = process.env.PORT || 3000;

// ==================== MIDDLEWARES ====================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};
app.use(cors(corsOptions));

// ==================== APIs ====================
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
