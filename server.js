import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import "express-async-errors";

// db config import
import connectDB from "./config/db.js";

// routes import
import authRoutes from "./routes/auth.routes.js";

import errorMiddleware from "./middlewares/errorMiddleware.js";

const app = express();
const port = process.env.PORT || 8080;

// connect dB
connectDB();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", authRoutes);

// validation middleware
app.use(errorMiddleware);

app.listen(port, () => console.log(`Server running on port ${port}`));
