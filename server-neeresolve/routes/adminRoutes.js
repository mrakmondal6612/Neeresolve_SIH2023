import express from "express";
import { rejectReport, solveReport } from "../controllers/adminController.js";

const router = express.Router();

// solve report
router.post("/solve-report", solveReport);

// reject report
router.post("/reject-report", rejectReport);

export default router;
