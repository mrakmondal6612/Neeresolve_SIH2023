import express from "express";
import {
  handleDashboardHomeRequest,
  getLineChartData,
  getReports,
} from "../controllers/dashboardHomeController.js";

const router = express.Router();

// home page
router.get("/get-home", handleDashboardHomeRequest);

// get report count with time
router.post("/get-report-count", getLineChartData);

// get pending reports
router.get("/get-reports", getReports);

export default router;
