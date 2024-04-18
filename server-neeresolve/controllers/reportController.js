import { filterReportsByLocation } from "../helper/getReportFromLatLong.js";
import { updatePriority } from "../helper/updatePriority.js";
import Report from "../models/reportModel.js";
import Suggestion from "../models/suggestionModel.js";
import { getLocationFromLatLong } from "./locationController.js";

const MINIMUM_REPORTS_THRESHOLD = 10;
const MAX_DISTANCE_LIMIT = 20000;

export const createReport = async (req, res, next) => {
  try {
    const { lat, long, issueDesc, category, image, userId, username } =
      req.body;
    const newReport = new Report({
      userId,
      image,
      location: {
        lat,
        long,
      },
      issueDesc,
      category,
      status: "In Review",
      username,
      address: await getLocationFromLatLong(lat, long),
    });

    const savedReport = await newReport.save();
    updatePriority(savedReport._id, lat, long, image);
    res.status(200).json(savedReport);
  } catch (error) {
    next(error);
  }
};

export const likeReport = async (req, res, next) => {
  try {
    const { reportId } = req.params;
    const { userId } = req.body;
    // check if report exists
    const report = await Report.findById(reportId);
    console.log(report, reportId, userId);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    // check if user has already liked the report
    if (report.likes.includes(userId)) {
      return res.status(400).json({ message: "Already liked" });
    }
    // check if user has already disliked the report
    if (report.dislikes.includes(userId)) {
      report.dislikes = report.dislikes.filter((dislike) => dislike !== userId);
    }
    report.likes.push(userId);
    await report.save();
    res.status(200).json(report);
  } catch (error) {
    next(error);
  }
};

export const dislikeReport = async (req, res, next) => {
  try {
    const { reportId } = req.params;
    const { userId } = req.body;
    // check if report exists
    const report = await Report.findById(reportId);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    // check if user has already disliked the report
    if (report.dislikes.includes(userId)) {
      return res.status(400).json({ message: "Already disliked" });
    }
    // check if user has already liked the report
    if (report.likes.includes(userId)) {
      report.likes = report.likes.filter((like) => like !== userId);
    }
    report.dislikes.push(userId);
    await report.save();
    res.status(200).json(report);
  } catch (error) {
    next(error);
  }
};

export const createSuggestion = async (req, res, next) => {
  try {
    const { userId = "", reportId = "", suggestion = "" } = req.body;

    const newSuggestion = new Suggestion({
      userId,
      reportId,
      suggestion,
    });

    const savedSuggestion = await newSuggestion.save();
    res.status(200).json(savedSuggestion);
  } catch (error) {
    next(error);
  }
};

export const upvoteSuggestion = async (req, res, next) => {
  const { suggestionId } = req.params;
  const { userId } = req.body;
  try {
    const suggestion = await Suggestion.findById(suggestionId);
    if (!suggestion) {
      res.status(404).json({ message: "Suggestion not found" });
    }
    if (suggestion.votes.includes(userId)) {
      res.status(400).json({ message: "Already upvoted" });
    }
    suggestion.votes.push(userId);
    await suggestion.save();
    res.status(200).json(suggestion);
  } catch (error) {
    next(error);
  }
};

export const downvoteSuggestion = async (req, res, next) => {
  const { suggestionId } = req.params;
  const { userId } = req.body;
  try {
    const suggestion = await Suggestion.findById(suggestionId);
    if (!suggestion) {
      res.status(404).json({ message: "Suggestion not found" });
    }
    if (!suggestion.votes.includes(userId)) {
      res.status(400).json({ message: "Already downvoted" });
    }
    suggestion.votes = suggestion.votes.filter((vote) => vote !== userId);
    await suggestion.save();
    res.status(200).json(suggestion);
  } catch (error) {
    next(error);
  }
};

export const getReports = async (req, res, next) => {
  try {
    const { lat, long, threshold } = req.query;

    const results = await Report.find({ status: "In Review" }).sort({
      priority: -1,
      createdAt: -1,
    });

    if (!results || results.length === 0) {
      return res.status(200).json([]);
    }

    if (lat && long) {
      let filteredReports = filterReportsByLocation(
        results,
        +lat,
        +long,
        threshold
      );

      const shouldRetry =
        filteredReports.length < MINIMUM_REPORTS_THRESHOLD &&
        results.length > MINIMUM_REPORTS_THRESHOLD &&
        2 * threshold < MAX_DISTANCE_LIMIT;

      if (shouldRetry) {
        const doubledThresholdReports = filterReportsByLocation(
          results,
          +lat,
          +long,
          2 * threshold
        );
        filteredReports = doubledThresholdReports;
      }

      return res.status(200).json(filteredReports);
    }

    return res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

export const getSuggestions = async (req, res, next) => {
  try {
    const { reportId } = req.params;

    const result = await Suggestion.find({ reportId });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getReportForAUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const reports = await Report.find({ userId });

    res.status(200).json(reports);
  } catch (error) {
    next(error);
  }
};

export const changeReportStatus = async (req, res, next) => {
  try {
    const { reportId, status } = req.body;

    const editedReportStatus = await Report.findByIdAndUpdate(
      reportId,
      {
        status,
      },
      {
        new: true,
      }
    );

    res.status(200).json(editedReportStatus);
  } catch (error) {
    next(error);
  }
};
