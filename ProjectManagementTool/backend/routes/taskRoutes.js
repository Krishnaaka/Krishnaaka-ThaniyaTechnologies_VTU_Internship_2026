// ═══════════════════════════════════════════════════════════
//  routes/taskRoutes.js — Task API Routes
//  Day 5: Full Kanban Task Management
//  Project: ProjectIQ Management Tool
//  Author:  Krishna | VTU Internship 2026
// ═══════════════════════════════════════════════════════════

const express = require("express");
const router  = express.Router();

const {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
  getTaskStats,
} = require("../controllers/taskController");

const { protect } = require("../middleware/auth");

// All task routes require login
router.use(protect);

// GET  /api/tasks/stats         → Task counts by status + overdue
router.get("/stats", getTaskStats);

// GET  /api/tasks               → All tasks (with ?project= ?status= filters)
// POST /api/tasks               → Create new task
router.route("/").get(getAllTasks).post(createTask);

// GET    /api/tasks/:id         → Single task detail
// PUT    /api/tasks/:id         → Full task update
// DELETE /api/tasks/:id         → Delete task
router.route("/:id").get(getTask).put(updateTask).delete(deleteTask);

// PATCH /api/tasks/:id/status   → Status-only update (Kanban move)
router.patch("/:id/status", updateTaskStatus);

module.exports = router;
