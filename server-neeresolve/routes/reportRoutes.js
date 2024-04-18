import express from "express";
import {
  changeReportStatus,
  createReport,
  createSuggestion,
  downvoteSuggestion,
  getReportForAUser,
  getReports,
  getSuggestions,
  upvoteSuggestion,
  likeReport,
  dislikeReport,
} from "../controllers/reportController.js";
import { isAdmin } from "../isAdmin.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//Create a report or issue
router.post("/", createReport);

// like  report
router.patch("/like/:reportId", likeReport);

// dislike report
router.patch("/dislike/:reportId", dislikeReport);

// create suggestion
router.post("/suggestion", createSuggestion);

// upvote suggestion
router.patch("/suggestion/upvote/:suggestionId", upvoteSuggestion);

// downvote suggestion
router.patch("/suggestion/downvote/:suggestionId", downvoteSuggestion);

// Get suggestions for a report
router.get("/suggestion/:reportId", getSuggestions);

//Get report of a user
router.get("/userReports/:userId", getReportForAUser);
//Administrations Contol//
//Get all reports and issues
router.get("/", getReports);

//Change Report status
router.put("/edit/status", verifyToken, isAdmin, changeReportStatus);

export default router;
