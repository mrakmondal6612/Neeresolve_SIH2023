import express from "express";
import mongoose from "mongoose";
import compression from "compression";
import cors from "cors";
import { createServer } from "http";

import authRoutes from "./routes/authRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import mapRoutes from "./routes/mapRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

// Load environment variables from .env
import dotenv from "dotenv";
dotenv.config();

//Initialization of server
const app = express();
const server = createServer(app);
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(
  compression({
    level: 7,
    threshold: 0,
  })
);
app.use(
  cors({
    origin: "*",
  })
);

const Connection = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      throw err;
    });
};

//Server connection
server.listen(PORT, () => {
  Connection();
  console.log(`Server linstening on PORT ${PORT}.`);
});

//API Routes
app.use("/api/auth", authRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/map", mapRoutes);
app.use("/api/dashboard", dashboardRoutes);
