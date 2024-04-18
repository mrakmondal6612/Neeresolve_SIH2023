import { filterReportsByLocation } from "./getReportFromLatLong.js";
import { getSimilarity } from "./getSimilarity.js";
import Report from "../models/reportModel.js";

export const updatePriority = async (id, lat, long, image) => {
  const newReport = await Report.findById(id);
  const existingReports = await Report.find({ _id: { $ne: id } });

  const filteredReports = filterReportsByLocation(
    existingReports,
    +lat,
    +long,
    0.05 // threshold, in km
  );

  if (!filteredReports.length) return;

  await Promise.all(
    filteredReports.map(async (report) => {
      try {
        const similarity = await getSimilarity({
          img1: image,
          img2: report.image,
        });

        // Only proceed if the similarity is greater than 0.7
        if (similarity > 0.7) {
          await Report.findByIdAndUpdate(
            report._id,
            { priority: report.priority + 1 },
            { new: true }
          );
          newReport.priority += 1;
          newReport.similarity.push({
            reportId: report._id,
            similarity,
          });
        }
      } catch (err) {
        console.error(`Error processing report ${report._id}: ${err}`);
      }
    })
  );

  await newReport.save();
};
