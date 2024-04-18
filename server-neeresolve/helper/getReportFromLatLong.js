import { haversineDistance } from "./getDistanceFromLatLong.js";

export const filterReportsByLocation = (reports, lat, long, threshold) => {
  return reports.filter((report) => {
    const distance = haversineDistance(
      +lat,
      +long,
      report?.location?.lat,
      report?.location?.long
    );
    return distance <= (+threshold || 1); // 1 km
  });
};