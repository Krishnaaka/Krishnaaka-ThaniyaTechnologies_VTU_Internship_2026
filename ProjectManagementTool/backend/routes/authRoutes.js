// ═══════════════════════════════════════════════════════════
//  routes/authRoutes.js — Auth API Routes
//  Day 3: Register, Login, Get Me
//  Project: ProjectIQ Management Tool
//  Author:  Krishna | VTU Internship 2026
// ═══════════════════════════════════════════════════════════

const express = require("express");
const router  = express.Router();

const { register, login, getMe } = require("../controllers/authController");
const { protect }                = require("../middleware/auth");

// POST /api/auth/register  →  Create new account
router.post("/register", register);

// POST /api/auth/login     →  Login and get JWT token
router.post("/login", login);

// GET  /api/auth/me        →  Get current logged-in user (protected)
router.get("/me", protect, getMe);

module.exports = router;
