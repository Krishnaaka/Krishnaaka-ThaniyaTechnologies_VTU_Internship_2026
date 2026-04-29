// ═══════════════════════════════════════════════════════════
//  server.js — StudentIQ Backend API
//  Day 4: Express Server Setup
//  Project: StudentIQ Management System
//  Author:  Krishna | VTU Internship 2026
// ═══════════════════════════════════════════════════════════

"use strict";

const express = require("express");
const cors    = require("cors");

const app  = express();
const PORT = process.env.PORT || 3000;

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

// ─── In-Memory Data Store ────────────────────────────────────
//  (No database needed for this project — pure Node.js)
let students = [
  {
    id: 1,
    name: "Aarav Sharma",
    usn: "1VT21CS001",
    branch: "CSE",
    semester: 6,
    marks: 92,
    grade: "A",
    email: "aarav.sharma@vtu.ac.in",
    phone: "9876543210",
    city: "Bengaluru",
    joinedAt: "2021-08-01"
  },
  {
    id: 2,
    name: "Priya Nair",
    usn: "1VT21EC042",
    branch: "ECE",
    semester: 6,
    marks: 85,
    grade: "B",
    email: "priya.nair@vtu.ac.in",
    phone: "9876501234",
    city: "Mysuru",
    joinedAt: "2021-08-01"
  },
  {
    id: 3,
    name: "Rohan Desai",
    usn: "1VT21ME017",
    branch: "ME",
    semester: 4,
    marks: 78,
    grade: "B",
    email: "rohan.desai@vtu.ac.in",
    phone: "9123456780",
    city: "Hubballi",
    joinedAt: "2021-08-01"
  },
  {
    id: 4,
    name: "Sneha Kulkarni",
    usn: "1VT21CV023",
    branch: "CIVIL",
    semester: 4,
    marks: 67,
    grade: "C",
    email: "sneha.k@vtu.ac.in",
    phone: "9988776655",
    city: "Dharwad",
    joinedAt: "2021-08-01"
  },
  {
    id: 5,
    name: "Kiran Patil",
    usn: "1VT22CS088",
    branch: "CSE",
    semester: 2,
    marks: 95,
    grade: "A",
    email: "kiran.patil@vtu.ac.in",
    phone: "9112233445",
    city: "Bengaluru",
    joinedAt: "2022-08-01"
  }
];

let nextId = students.length + 1;

// ─── Helper: Calculate Grade ─────────────────────────────────
function calcGrade(marks) {
  if (marks >= 90) return "A";
  if (marks >= 75) return "B";
  if (marks >= 60) return "C";
  if (marks >= 50) return "D";
  return "F";
}

// ─── Helper: Validate Student Body ───────────────────────────
function validateStudent(body) {
  const { name, usn, branch, semester, marks, email } = body;
  const errors = [];

  if (!name  || name.trim().length < 2)        errors.push("Name must be at least 2 characters.");
  if (!usn   || usn.trim().length < 4)          errors.push("USN is required.");
  if (!branch || branch.trim() === "")          errors.push("Branch is required.");
  if (!semester || isNaN(semester) || semester < 1 || semester > 8)
                                                 errors.push("Semester must be 1–8.");
  if (marks === undefined || isNaN(marks) || marks < 0 || marks > 100)
                                                 errors.push("Marks must be 0–100.");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                                                 errors.push("Valid email required.");

  return errors;
}

// ════════════════════════════════════════════════════════════
//  ROUTES
// ════════════════════════════════════════════════════════════

// ── Root health-check ────────────────────────────────────────
app.get("/", (_req, res) => {
  res.json({
    status:  "OK",
    message: "StudentIQ API is running 🚀",
    version: "4.0.0",
    uptime:  `${Math.floor(process.uptime())}s`
  });
});

// ── Health / Ping ─────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({
    status:    "healthy",
    timestamp: new Date().toISOString(),
    students:  students.length
  });
});

// ════════════════════════════════════════════════════════════
//  STUDENT CRUD ROUTES
// ════════════════════════════════════════════════════════════

// GET /api/students  — list all (with optional search + filter)
app.get("/api/students", (req, res) => {
  let result = [...students];

  // Optional query params: ?search=Aarav&branch=CSE&semester=6
  const { search, branch, semester } = req.query;

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      s =>
        s.name.toLowerCase().includes(q) ||
        s.usn.toLowerCase().includes(q)  ||
        s.email.toLowerCase().includes(q)
    );
  }

  if (branch && branch !== "all") {
    result = result.filter(s => s.branch.toUpperCase() === branch.toUpperCase());
  }

  if (semester && semester !== "all") {
    result = result.filter(s => s.semester === parseInt(semester));
  }

  res.json({
    success: true,
    count:   result.length,
    data:    result
  });
});

// GET /api/students/:id  — single student
app.get("/api/students/:id", (req, res) => {
  const id  = parseInt(req.params.id);
  const stu = students.find(s => s.id === id);

  if (!stu) {
    return res.status(404).json({ success: false, message: `Student with ID ${id} not found.` });
  }

  res.json({ success: true, data: stu });
});

// POST /api/students  — add a new student
app.post("/api/students", (req, res) => {
  const errors = validateStudent(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  // Check USN uniqueness
  const usnExists = students.some(s => s.usn.toLowerCase() === req.body.usn.toLowerCase());
  if (usnExists) {
    return res.status(409).json({ success: false, message: "USN already exists." });
  }

  const marks = parseFloat(req.body.marks);
  const newStudent = {
    id:        nextId++,
    name:      req.body.name.trim(),
    usn:       req.body.usn.trim().toUpperCase(),
    branch:    req.body.branch.trim().toUpperCase(),
    semester:  parseInt(req.body.semester),
    marks,
    grade:     calcGrade(marks),
    email:     req.body.email.trim(),
    phone:     (req.body.phone  || "").trim(),
    city:      (req.body.city   || "").trim(),
    joinedAt:  new Date().toISOString().split("T")[0]
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: "Student added successfully!",
    data:    newStudent
  });
});

// PUT /api/students/:id  — update a student
app.put("/api/students/:id", (req, res) => {
  const id  = parseInt(req.params.id);
  const idx = students.findIndex(s => s.id === id);

  if (idx === -1) {
    return res.status(404).json({ success: false, message: `Student with ID ${id} not found.` });
  }

  const errors = validateStudent(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  const marks = parseFloat(req.body.marks);
  students[idx] = {
    ...students[idx],
    name:     req.body.name.trim(),
    usn:      req.body.usn.trim().toUpperCase(),
    branch:   req.body.branch.trim().toUpperCase(),
    semester: parseInt(req.body.semester),
    marks,
    grade:    calcGrade(marks),
    email:    req.body.email.trim(),
    phone:    (req.body.phone || "").trim(),
    city:     (req.body.city  || "").trim()
  };

  res.json({
    success: true,
    message: "Student updated successfully!",
    data:    students[idx]
  });
});

// DELETE /api/students/:id  — delete a student
app.delete("/api/students/:id", (req, res) => {
  const id  = parseInt(req.params.id);
  const idx = students.findIndex(s => s.id === id);

  if (idx === -1) {
    return res.status(404).json({ success: false, message: `Student with ID ${id} not found.` });
  }

  const deleted = students.splice(idx, 1)[0];

  res.json({
    success: true,
    message: `Student "${deleted.name}" deleted successfully.`,
    data:    deleted
  });
});

// ── Stats Endpoint ────────────────────────────────────────────
app.get("/api/stats", (_req, res) => {
  const total    = students.length;
  const avgMarks = total
    ? Math.round(students.reduce((sum, s) => sum + s.marks, 0) / total)
    : 0;

  // Count by branch
  const branches = {};
  students.forEach(s => {
    branches[s.branch] = (branches[s.branch] || 0) + 1;
  });

  // Count by grade
  const grades = { A: 0, B: 0, C: 0, D: 0, F: 0 };
  students.forEach(s => {
    if (grades[s.grade] !== undefined) grades[s.grade]++;
    else grades["F"]++;
  });

  // Top performer
  const top = students.length
    ? students.reduce((best, s) => (s.marks > best.marks ? s : best))
    : null;

  res.json({
    success: true,
    data: {
      totalStudents: total,
      averageMarks:  avgMarks,
      topPerformer:  top ? { name: top.name, usn: top.usn, marks: top.marks, grade: top.grade } : null,
      branchBreakdown: branches,
      gradeDistribution: grades
    }
  });
});

// ── 404 Handler ───────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

// ── Global Error Handler ──────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({ success: false, message: "Internal server error." });
});

// ─── Start Server ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log("╔══════════════════════════════════════════════╗");
  console.log("║   StudentIQ API  —  Day 4 Build              ║");
  console.log(`║   Server running on http://localhost:${PORT}    ║`);
  console.log("║   Author: Krishna | VTU Internship 2026      ║");
  console.log("╚══════════════════════════════════════════════╝");
});

module.exports = app;
