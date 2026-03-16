// ══════════════════════════════════════════
//   server.js — Entry Point
//   Student API v4 | Day12
//   New: sortBy & order query params on GET /students
// ══════════════════════════════════════════

const express = require('express');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/students', studentRoutes);

app.get('/', (req, res) => {
  res.json({
    message: '📚 Student API v4 — Day12',
    endpoints: {
      'GET    /students':                       'Get all students',
      'GET    /students?branch=&year=':         'Filter by branch / year',
      'GET    /students?sortBy=marks&order=desc': 'Sort by field  ← NEW',
      'GET    /students/stats':                 'Student statistics',
      'GET    /students/:id':                   'Get by ID',
      'POST   /students':                       'Add student',
      'PUT    /students/:id':                   'Update student',
      'DELETE /students/:id':                   'Delete student',
    },
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`✅ Student API v4 running at http://localhost:${PORT}`);
});
