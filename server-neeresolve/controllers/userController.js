import User from "../models/userModel.js";
import { getLocationFromLatLong } from "./locationController.js";

export const editDetails = async (req, res, next) => {
  try {
    const {
      username,
      name,
      profilePicture,
      userId,
      notificationId,
      lat,
      long,
    } = req.body;

    const editedData = await User.findByIdAndUpdate(
      userId,
      {
        username,
        name,
        profilePicture,
        notificationId,
        location: {
          lat,
          long,
        },
        address: await getLocationFromLatLong(lat, long),
      },
      {
        new: true,
      }
    );

    res.status(200).json(editedData);
  } catch (error) {
    next(error);
  }
};

export const getUserDetails = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const userDetails = await User.findById(userId);
    if (
      userDetails.location.lat &&
      userDetails.location.long &&
      !userDetails.address
    ) {
      userDetails.address = await getLocationFromLatLong(
        userDetails.location.lat,
        userDetails.location.long
      );
    }
    await userDetails.save();
    res.status(200).json(userDetails);
  } catch (error) {
    next(error);
  }
};
