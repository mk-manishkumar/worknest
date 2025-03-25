import express from "express";
import { getAllCompanies, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import isAuthenticated from "../middlewares/authentication.js";

const router = express.Router();

router.route("/register").post(isAuthenticated, registerCompany);
router.route("/getcompanies").get(isAuthenticated, getAllCompanies);
router.route("/getcompany/:id").get(isAuthenticated, getCompanyById);
router.route("/update/:id").put(isAuthenticated, updateCompany);

export default router;
