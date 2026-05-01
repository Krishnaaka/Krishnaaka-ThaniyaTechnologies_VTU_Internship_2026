// ═══════════════════════════════════════════════════════════
//  routes/userRoutes.js — User/Team API Routes
//  Day 4: Team listing and profile endpoints
//  Project: ProjectIQ Management Tool
//  Author:  Krishna | VTU Internship 2026
// ═══════════════════════════════════════════════════════════

const express = require("express");
const router  = express.Router();

const { getAllUsers, getUserById, updateUser } = require("../controllers/userController");
const { protect }                              = require("../middleware/auth");

// All user routes require authentication
router.use(protect);

// GET  /api/users      → List all users (team page)
router.get("/", getAllUsers);

// GET  /api/users/:id  → Get user profile
// PUT  /api/users/:id  → Update own profile
router.route("/:id").get(getUserById).put(updateUser);

module.exports = router;
