import "dotenv/config";
import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import session from "express-session";
import cors from "cors";
import morgan from "morgan";


const app = express();
const port = process.env.PORT || 8080;

// connect dB
import connectDB from "./config/db.js";
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(morgan("dev"))
app.use(cookieParser());

// Configure session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: parseInt(process.env.SESSION_MAX_AGE, 10) },
  })
);


// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// Handle 404 errors (not found)
app.use((req, res, next) => {
  res.status(404).render("404", { message: "Page not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("error", { message: "Something went wrong!" });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
