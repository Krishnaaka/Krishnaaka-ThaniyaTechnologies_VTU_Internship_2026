// ═══════════════════════════════════════════════════════════
//  routes/projectRoutes.js — Project API Routes
//  Day 4: All project endpoints
//  Project: ProjectIQ Management Tool
//  Author:  Krishna | VTU Internship 2026
// ═══════════════════════════════════════════════════════════

const express = require("express");
const router  = express.Router();

const {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  addMember,
} = require("../controllers/projectController");

const { protect } = require("../middleware/auth");

// All project routes require authentication
router.use(protect);

// GET    /api/projects        → All projects for logged-in user
// POST   /api/projects        → Create a new project
router.route("/").get(getAllProjects).post(createProject);

// GET    /api/projects/:id    → Get single project
// PUT    /api/projects/:id    → Update project (owner only)
// DELETE /api/projects/:id    → Delete project + tasks (owner only)
router.route("/:id").get(getProject).put(updateProject).delete(deleteProject);

// POST   /api/projects/:id/members  → Add member to project
router.post("/:id/members", addMember);

module.exports = router;
