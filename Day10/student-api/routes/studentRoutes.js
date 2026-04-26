// ══════════════════════════════════════════
//   routes/studentRoutes.js
//   Day10: Added /stats route + filter support
// ══════════════════════════════════════════

const express = require('express');
const router = express.Router();

const {
  getAllStudents,
  getStats,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');

// GET    /students              → get all (supports ?branch= &year= filter) ← UPDATED
router.get('/', getAllStudents);

// GET    /students/stats        → get statistics  ← NEW  (must be before /:id)
router.get('/stats', getStats);

// GET    /students/:id          → get by ID
router.get('/:id', getStudentById);

// POST   /students              → create
router.post('/', createStudent);

// PUT    /students/:id          → update
router.put('/:id', updateStudent);

// DELETE /students/:id          → delete
router.delete('/:id', deleteStudent);

module.exports = router;
