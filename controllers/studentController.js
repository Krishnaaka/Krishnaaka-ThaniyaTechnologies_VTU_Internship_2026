// ═══════════════════════════════════════════════════════════
//  controllers/studentController.js — StudentIQ Controllers
//  Day 5: Controller Stub (wired to routes)
//  Day 6: Full CRUD logic will be added here
//  Project: StudentIQ Management System
//  Author:  Krishna | VTU Internship 2026
// ═══════════════════════════════════════════════════════════

"use strict";

// ─── Shared In-Memory Data Store ─────────────────────────────
//  Defined here so both routes and controller share the same data
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

// ─── Helper: Calculate Grade ──────────────────────────────────
function calcGrade(marks) {
  if (marks >= 90) return "A";
  if (marks >= 75) return "B";
  if (marks >= 60) return "C";
  if (marks >= 50) return "D";
  return "F";
}

// ─── Helper: Validate Student Input ──────────────────────────
function validateStudent(body) {
  const { name, usn, branch, semester, marks, email } = body;
  const errors = [];

  if (!name || name.trim().length < 2)
    errors.push("Name must be at least 2 characters.");
  if (!usn || usn.trim().length < 4)
    errors.push("USN is required (min 4 characters).");
  if (!branch || branch.trim() === "")
    errors.push("Branch is required.");
  if (!semester || isNaN(semester) || semester < 1 || semester > 8)
    errors.push("Semester must be between 1 and 8.");
  if (marks === undefined || isNaN(marks) || marks < 0 || marks > 100)
    errors.push("Marks must be between 0 and 100.");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.push("A valid email address is required.");

  return errors;
}

// ════════════════════════════════════════════════════════════
//  CONTROLLER FUNCTIONS
//  (Stub — Full logic added Day 6)
// ════════════════════════════════════════════════════════════

/**
 * GET /api/students
 * Returns all students, optionally filtered
 */
const getAllStudents = (req, res) => {
  let result = [...students];

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

  res.json({ success: true, count: result.length, data: result });
};

/**
 * GET /api/students/:id
 * Returns a single student by ID
 */
const getStudentById = (req, res) => {
  const id  = parseInt(req.params.id);
  const stu = students.find(s => s.id === id);

  if (!stu) {
    return res
      .status(404)
      .json({ success: false, message: `Student with ID ${id} not found.` });
  }

  res.json({ success: true, data: stu });
};

/**
 * POST /api/students
 * Creates a new student record
 */
const createStudent = (req, res) => {
  const errors = validateStudent(req.body);
  if (errors.length) {
    return res.status(400).json({ success: false, errors });
  }

  const usnExists = students.some(
    s => s.usn.toLowerCase() === req.body.usn.toLowerCase()
  );
  if (usnExists) {
    return res
      .status(409)
      .json({ success: false, message: "A student with this USN already exists." });
  }

  const marks = parseFloat(req.body.marks);
  const newStudent = {
    id:       nextId++,
    name:     req.body.name.trim(),
    usn:      req.body.usn.trim().toUpperCase(),
    branch:   req.body.branch.trim().toUpperCase(),
    semester: parseInt(req.body.semester),
    marks,
    grade:    calcGrade(marks),
    email:    req.body.email.trim(),
    phone:    (req.body.phone || "").trim(),
    city:     (req.body.city  || "").trim(),
    joinedAt: new Date().toISOString().split("T")[0]
  };

  students.push(newStudent);
  res.status(201).json({
    success: true,
    message: "Student added successfully!",
    data:    newStudent
  });
};

/**
 * PUT /api/students/:id
 * Updates an existing student record
 */
const updateStudent = (req, res) => {
  const id  = parseInt(req.params.id);
  const idx = students.findIndex(s => s.id === id);

  if (idx === -1) {
    return res
      .status(404)
      .json({ success: false, message: `Student with ID ${id} not found.` });
  }

  const errors = validateStudent(req.body);
  if (errors.length) {
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
};

/**
 * DELETE /api/students/:id
 * Deletes a student record
 */
const deleteStudent = (req, res) => {
  const id  = parseInt(req.params.id);
  const idx = students.findIndex(s => s.id === id);

  if (idx === -1) {
    return res
      .status(404)
      .json({ success: false, message: `Student with ID ${id} not found.` });
  }

  const deleted = students.splice(idx, 1)[0];
  res.json({
    success: true,
    message: `Student "${deleted.name}" deleted successfully.`,
    data:    deleted
  });
};

/**
 * GET /api/stats/summary
 * Returns dashboard statistics
 */
const getStats = (_req, res) => {
  const total    = students.length;
  const avgMarks = total
    ? Math.round(students.reduce((sum, s) => sum + s.marks, 0) / total)
    : 0;

  // Branch breakdown
  const branches = {};
  students.forEach(s => {
    branches[s.branch] = (branches[s.branch] || 0) + 1;
  });

  // Grade distribution
  const grades = { A: 0, B: 0, C: 0, D: 0, F: 0 };
  students.forEach(s => {
    if (grades[s.grade] !== undefined) grades[s.grade]++;
    else grades["F"]++;
  });

  // Top performer
  const top = students.length
    ? students.reduce((best, s) => (s.marks > best.marks ? s : best))
    : null;

  // Pass rate (marks >= 50)
  const passed   = students.filter(s => s.marks >= 50).length;
  const passRate = total ? Math.round((passed / total) * 100) : 0;

  res.json({
    success: true,
    data: {
      totalStudents:     total,
      averageMarks:      avgMarks,
      passRate:          passRate,
      topPerformer:      top
        ? { name: top.name, usn: top.usn, marks: top.marks, grade: top.grade }
        : null,
      branchBreakdown:   branches,
      gradeDistribution: grades
    }
  });
};

// ─── Exports ──────────────────────────────────────────────────
module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStats
};
