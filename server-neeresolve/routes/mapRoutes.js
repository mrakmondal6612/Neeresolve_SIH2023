import express from "express";
import { handleLocationRequest } from "../controllers/locationController.js";

const router = express.Router();

// Get location
router.post("/get-location", handleLocationRequest);

export default router;
