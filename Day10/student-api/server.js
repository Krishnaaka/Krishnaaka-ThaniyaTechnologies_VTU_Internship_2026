// ══════════════════════════════════════════
//   server.js — Entry Point
//   Student API v3 | Day10
//   New: GET /students?branch=&year=  (search/filter)
//        GET /students/stats          (statistics)
// ══════════════════════════════════════════

const express = require('express');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/students', studentRoutes);

app.get('/', (req, res) => {
  res.json({
    message: '📚 Student API v3 — Day10',
    endpoints: {
      'GET    /students':              'Get all students',
      'GET    /students?branch=&year=':'Search/filter students  ← NEW',
      'GET    /students/stats':        'Get student statistics  ← NEW',
      'GET    /students/:id':          'Get student by ID',
      'POST   /students':              'Add a new student',
      'PUT    /students/:id':          'Update a student',
      'DELETE /students/:id':          'Delete a student',
    },
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`✅ Student API v3 running at http://localhost:${PORT}`);
});
