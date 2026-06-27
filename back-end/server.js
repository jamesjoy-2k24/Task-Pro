import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { startDeadlineNotifier } from "./services/deadlineNotifier.js";

const app = express();

// CORS configuration
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json({ limit: "10kb" }));

// API routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tasks", taskRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Task Management API is running",
  });
});

// MongoDB connection with enhanced options
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME || "taskmanager",
  })
  .then(() => {
    console.log("✅ Successfully connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(
        `🚀 Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`,
      );
      startDeadlineNotifier();
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); // Exit process with failure code if DB connection fails
  });
