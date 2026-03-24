// ══════════════════════════════════════════
//   routes/studentRoutes.js
//   Day9: Added GET /:id and PUT /:id routes
// ══════════════════════════════════════════

const express = require('express');
const router = express.Router();

const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');

// GET    /students        → get all students
router.get('/', getAllStudents);

// GET    /students/:id    → get student by ID  ← NEW
router.get('/:id', getStudentById);

// POST   /students        → create a new student
router.post('/', createStudent);

// PUT    /students/:id    → update a student    ← NEW
router.put('/:id', updateStudent);

// DELETE /students/:id    → delete a student
router.delete('/:id', deleteStudent);

module.exports = router;
