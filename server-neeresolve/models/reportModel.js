import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    location: {
      lat: Number,
      long: Number,
    },
    userId: {
      type: String,
    },
    issueDesc: {
      type: String,
    },
    category: {
      type: String,
    },
    image: {
      type: String,
    },
    status: {
      type: String,
    },
    priority: {
      type: Number,
      default: 0,
    },
    similarity: [
      {
        reportId: {
          type: String,
        },
        similarity: {
          type: Number,
        },
      },
    ],
    username: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("report", reportSchema);
