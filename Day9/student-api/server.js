// ══════════════════════════════════════════
//   server.js — Entry Point
//   Student API v2 | Day9
//   New: GET /students/:id  (get by ID)
//        PUT /students/:id  (update student)
// ══════════════════════════════════════════

const express = require('express');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──
app.use(express.json());

// ── Routes ──
app.use('/students', studentRoutes);

// ── Root ──
app.get('/', (req, res) => {
  res.json({
    message: '📚 Student API v2 — Day9',
    endpoints: {
      'GET    /students':       'Get all students',
      'GET    /students/:id':   'Get student by ID  ← NEW',
      'POST   /students':       'Add a new student',
      'PUT    /students/:id':   'Update a student   ← NEW',
      'DELETE /students/:id':   'Delete a student',
    },
  });
});

// ── 404 ──
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ── Start ──
app.listen(PORT, () => {
  console.log(`✅ Student API v2 running at http://localhost:${PORT}`);
});
