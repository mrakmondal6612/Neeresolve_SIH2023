import mongoose from "mongoose";

const suggestionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    reportId: {
      type: String,
    },
    suggestion: {
      type: String,
    },
    votes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("suggestion", suggestionSchema);