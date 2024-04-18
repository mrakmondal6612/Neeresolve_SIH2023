import Report from "../models/reportModel.js";

export const solveReport = async (req, res, next) => {
  try {
    const { issueId } = req.body;
    const report = await Report.findById(issueId);

    if (!report) {
      throw new Error("Report not found");
    }
    report.status = "solved";
    await report.save();
    res.status(200).json(report);
  } catch (error) {
    next(error);
  }
};

export const rejectReport = async (req, res, next) => {
  try {
    const { issueId } = req.body;
    const report = await Report.findById(issueId);

    if (!report) {
      throw new Error("Report not found");
    }
    report.status = "rejected";
    await report.save();
    res.status(200).json(report);
  } catch (error) {
    next(error);
  }
};
