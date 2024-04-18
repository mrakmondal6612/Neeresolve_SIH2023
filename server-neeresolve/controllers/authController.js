import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signUp = async (req, res, next) => {
  try {
    const { username, email, password, profilePicture, name } = req.body; // Destructure data directly in function parameters
    // Check if email already exists
    const emailAlreadyExists = await User.findOne({ email });

    if (emailAlreadyExists) {
      return res.status(409).json({ error: "Email already registered" }); // Use a consistent error response format
    }

    let hashedPassword;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = bcrypt.hashSync(password, salt);
    }

    // Create a new user document
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profilePicture,
      name,
    });

    await newUser.save(); // Save the new user document

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_KEY); //Assigning a new jwt token

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ user: newUser, token: token }); // Return the created user to the client as a success status
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body; // Getting necessary data from the body

    //Searching for the user
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json("User not found");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password); //if the user is present then checking for password correction

    if (!isPasswordCorrect) {
      return res.status(403).json("Wrong password entered");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY); //Assigning a new jwt token

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ user, token: token }); //Sending the credentials to the client
  } catch (error) {
    next(error);
  }
};
