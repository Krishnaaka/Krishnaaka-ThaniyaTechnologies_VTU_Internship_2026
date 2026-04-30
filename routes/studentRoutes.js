// ═══════════════════════════════════════════════════════════
//  routes/studentRoutes.js — StudentIQ API Routes
//  Day 5: Separate Routes File (Express Router)
//  Project: StudentIQ Management System
//  Author:  Krishna | VTU Internship 2026
// ═══════════════════════════════════════════════════════════

"use strict";

const express = require("express");
const router  = express.Router();

// ─── Import Controller ────────────────────────────────────────
//  (Controller will be created on Day 6)
//  For now, all logic is inline — Day 6 will extract it.
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStats
} = require("../controllers/studentController");

// ════════════════════════════════════════════════════════════
//  STUDENT ROUTES
// ════════════════════════════════════════════════════════════

/**
 * @route   GET /api/students
 * @desc    Get all students (supports ?search= &branch= &semester= filters)
 * @access  Public
 */
router.get("/", getAllStudents);

/**
 * @route   GET /api/students/:id
 * @desc    Get a single student by ID
 * @access  Public
 */
router.get("/:id", getStudentById);

/**
 * @route   POST /api/students
 * @desc    Add a new student
 * @body    { name, usn, branch, semester, marks, email, phone, city }
 * @access  Public
 */
router.post("/", createStudent);

/**
 * @route   PUT /api/students/:id
 * @desc    Update an existing student
 * @body    { name, usn, branch, semester, marks, email, phone, city }
 * @access  Public
 */
router.put("/:id", updateStudent);

/**
 * @route   DELETE /api/students/:id
 * @desc    Delete a student
 * @access  Public
 */
router.delete("/:id", deleteStudent);

// ════════════════════════════════════════════════════════════
//  STATS ROUTE
// ════════════════════════════════════════════════════════════

/**
 * @route   GET /api/stats
 * @desc    Get dashboard statistics
 * @access  Public
 */
router.get("/stats/summary", getStats);

module.exports = router;
