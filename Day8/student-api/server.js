// ══════════════════════════════════════════
//   server.js — Entry Point
//   Student API | MVC Architecture
// ══════════════════════════════════════════

const express = require('express');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──
app.use(express.json()); // parse JSON request bodies

// ── Routes ──
app.use('/students', studentRoutes);

// ── Root route ──
app.get('/', (req, res) => {
  res.json({
    message: '🏏 Student API — MVC Architecture',
    version: '1.0.0',
    endpoints: {
      'GET  /students':        'Get all students',
      'POST /students':        'Add a new student',
      'DELETE /students/:id':  'Delete a student by ID',
    },
  });
});

// ── 404 handler ──
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ── Start server ──
app.listen(PORT, () => {
  console.log(`✅ Student API running at http://localhost:${PORT}`);
});
