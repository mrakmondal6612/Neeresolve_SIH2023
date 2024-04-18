import Report from "../models/reportModel.js";

export const handleDashboardHomeRequest = async (_, res, next) => {
  try {
    const reviewReports = await Report.count({
      status: "In Review",
    });
    const solvedReports = await Report.count({
      status: "solved",
    });
    const rejectedReports = await Report.count({
      status: "rejected",
    });

    const reports = {
      reviewReports,
      solvedReports,
      rejectedReports,
    };

    res.status(200).json(reports);
  } catch (error) {
    next(error);
  }
};

export const getLineChartData = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.body;

    // Parse the dates (you might want to add validation here)
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    const createLineChartData = (registeredReport, solvedReport) => {
      const timeSeriesData = [];
      const daysInTimeRange = Math.floor(
        (parsedEndDate - parsedStartDate) / (24 * 60 * 60 * 1000)
      );

      for (let i = 0; i <= daysInTimeRange; i++) {
        const date = new Date(parsedEndDate);
        date.setDate(parsedEndDate.getDate() - i);
        const formattedDate = date.toISOString().split("T")[0];
        const registeredRes = registeredReport.filter((item) => {
          const itemDate = new Date(item.createdAt).toISOString().split("T")[0];
          return itemDate === formattedDate;
        });
        const solvedRes = solvedReport.filter((item) => {
          const itemDate = new Date(item.createdAt).toISOString().split("T")[0];
          return itemDate === formattedDate;
        });
        const registeredCount = registeredRes ? registeredRes.length : 0;
        const solvedCount = solvedRes ? solvedRes.length : 0;
        timeSeriesData.push({
          date: formattedDate,
          "Registered Report Count": registeredCount,
          "Solved Report Count": solvedCount,
        });
      }
      return timeSeriesData.reverse();
    };

    const registeredReport = await Report.find({
      createdAt: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    });

    const solvedReport = registeredReport.filter(
      (report) => report.status === "solved"
    );

    const timeSeriesData = createLineChartData(registeredReport, solvedReport);

    res.status(200).json(timeSeriesData);
  } catch (error) {
    next(error);
  }
};

export const getReports = async (req, res, next) => {
  const { type } = req.body;
  try {
    const results = await Report.find({
      status: type,
    }).sort({
      priority: -1,
      createdAt: -1,
    });

    if (!results || results.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};
