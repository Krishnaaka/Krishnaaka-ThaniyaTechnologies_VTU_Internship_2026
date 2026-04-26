// routes/studentRoutes.js — Day12
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

router.get('/',        getAllStudents);   // supports ?branch= &year= &sortBy= &order=
router.get('/stats',   getStats);         // ← must be before /:id
router.get('/:id',     getStudentById);
router.post('/',       createStudent);
router.put('/:id',     updateStudent);
router.delete('/:id',  deleteStudent);

module.exports = router;
