import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
    profilePicture: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    notificationId: {
      type: String,
    },
    location: {
      lat: Number,
      long: Number,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("user", userSchema);
