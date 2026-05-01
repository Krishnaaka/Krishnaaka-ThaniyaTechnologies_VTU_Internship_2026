// ═══════════════════════════════════════════════════════════
//  server.js — ProjectIQ Backend Entry Point
//  Day 3 Update: Auth routes mounted
//  Project: ProjectIQ Management Tool
//  Author:  Krishna | VTU Internship 2026
// ═══════════════════════════════════════════════════════════

"use strict";

const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");
const dotenv   = require("dotenv");

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 5000;

// ─── Import Routes ────────────────────────────────────────────
const authRoutes = require("./routes/authRoutes");
// projectRoutes, taskRoutes, userRoutes → added Day 4 & 5

// ─── Middleware ───────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Request Logger ───────────────────────────────────────────
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}]  ${req.method}  ${req.originalUrl}`);
  next();
});

// ─── Health Routes ────────────────────────────────────────────
app.get("/", (_req, res) => {
  res.json({
    status:  "OK",
    message: "ProjectIQ API is running 🚀",
    version: "3.0.0",
    uptime:  `${Math.floor(process.uptime())}s`,
    endpoints: {
      auth:     "/api/auth",
      projects: "/api/projects  (Day 4)",
      tasks:    "/api/tasks     (Day 5)",
      users:    "/api/users     (Day 4)",
    },
  });
});

app.get("/health", (_req, res) => {
  res.json({
    status:    "healthy",
    timestamp: new Date().toISOString(),
    db: mongoose.connection.readyState === 1 ? "connected ✅" : "disconnected ❌",
  });
});

// ════════════════════════════════════════════════════════════
//  API ROUTES
// ════════════════════════════════════════════════════════════
app.use("/api/auth",     authRoutes);
// app.use("/api/projects", projectRoutes);  // Day 4
// app.use("/api/tasks",    taskRoutes);     // Day 5
// app.use("/api/users",    userRoutes);     // Day 4

// ─── 404 Handler ─────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

// ─── Global Error Handler ─────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({ success: false, message: "Internal server error." });
});

// ─── Connect MongoDB + Start Server ──────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("╔══════════════════════════════════════════════╗");
    console.log("║   ProjectIQ API  —  Day 3 Build              ║");
    console.log(`║   Server  →  http://localhost:${PORT}           ║`);
    console.log("║   MongoDB →  Connected ✅                    ║");
    console.log("║   Auth    →  /api/auth  ✅                   ║");
    console.log("║   Author  →  Krishna | VTU Internship 2026   ║");
    console.log("╚══════════════════════════════════════════════╝");
    app.listen(PORT);
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

module.exports = app;
