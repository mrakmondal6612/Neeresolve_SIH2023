import express from "express";
import { login, signUp } from "../controllers/authController.js";

const router = express.Router();

//Signing up the user
router.post("/signup", signUp);

//User login
router.post("/login", login);

export default router;
