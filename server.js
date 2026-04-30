// ═══════════════════════════════════════════════════════════
//  server.js — StudentIQ Backend API
//  Day 5 Update: Routes moved to routes/studentRoutes.js
//  Project: StudentIQ Management System
//  Author:  Krishna | VTU Internship 2026
// ═══════════════════════════════════════════════════════════

"use strict";

const express = require("express");
const cors    = require("cors");

const app  = express();
const PORT = process.env.PORT || 3000;

// ─── Import Routes ────────────────────────────────────────────
const studentRoutes = require("./routes/studentRoutes");

// ─── Middleware ──────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Request Logger ──────────────────────────────────────────
app.use((req, _res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}]  ${req.method}  ${req.originalUrl}`);
  next();
});

// ════════════════════════════════════════════════════════════
//  SYSTEM ROUTES
// ════════════════════════════════════════════════════════════

// Root health-check
app.get("/", (_req, res) => {
  res.json({
    status:  "OK",
    message: "StudentIQ API is running 🚀",
    version: "5.0.0",
    uptime:  `${Math.floor(process.uptime())}s`,
    routes: {
      students: "/api/students",
      stats:    "/api/students/stats/summary",
      health:   "/health"
    }
  });
});

// Ping / health
app.get("/health", (_req, res) => {
  res.json({
    status:    "healthy",
    timestamp: new Date().toISOString()
  });
});

// ════════════════════════════════════════════════════════════
//  API ROUTES  →  Delegated to routes/studentRoutes.js
// ════════════════════════════════════════════════════════════
app.use("/api/students", studentRoutes);

// ─── 404 Handler ─────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

// ─── Global Error Handler ─────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({ success: false, message: "Internal server error." });
});

// ─── Start Server ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log("╔══════════════════════════════════════════════╗");
  console.log("║   StudentIQ API  —  Day 5 Build              ║");
  console.log(`║   Server  →  http://localhost:${PORT}           ║`);
  console.log("║   Routes  →  /api/students                   ║");
  console.log("║   Stats   →  /api/students/stats/summary     ║");
  console.log("║   Author  →  Krishna | VTU Internship 2026   ║");
  console.log("╚══════════════════════════════════════════════╝");
});

module.exports = app;
