// ══════════════════════════════════════════
//   routes/studentRoutes.js
//   Defines all Student API routes and
//   connects them to controller functions
// ══════════════════════════════════════════

const express = require('express');
const router = express.Router();

const {
    getAllStudents,
    createStudent,
    deleteStudent,
} = require('../controllers/studentController');

// GET    /students        → get all students
router.get('/', getAllStudents);

// POST   /students        → create a new student
router.post('/', createStudent);

// DELETE /students/:id    → delete a student by ID
router.delete('/:id', deleteStudent);

module.exports = router;
