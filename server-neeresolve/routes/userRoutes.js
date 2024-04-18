import express from "express";
import { editDetails, getUserDetails } from "../controllers/userController.js";

const router = express.Router();

//Edit details
router.put("/edit", editDetails);

//Get user details by id
router.get("/details/:userId", getUserDetails);

export default router;
