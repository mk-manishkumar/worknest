import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({});

// ==================== DATABASE CONNECTION ====================
import connectDB from "./config/db.js";
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
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) callback(null, true);
    else callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};
app.use(cors(corsOptions));

// ==================== APIs ====================
app.get("/", (req, res) => res.send("Welcome to the Worknest API"));
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
