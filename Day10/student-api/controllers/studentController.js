// ══════════════════════════════════════════
//   controllers/studentController.js
//   Day10: Added searchStudents + getStats
// ══════════════════════════════════════════

let students = [
  { id: 1, name: 'Alice Johnson',  branch: 'Computer Science', year: 3, marks: 88 },
  { id: 2, name: 'Bob Smith',      branch: 'Electronics',      year: 2, marks: 74 },
  { id: 3, name: 'Charlie Brown',  branch: 'Mechanical',       year: 4, marks: 91 },
  { id: 4, name: 'Diana Prince',   branch: 'Computer Science', year: 2, marks: 95 },
  { id: 5, name: 'Ethan Hunt',     branch: 'Civil',            year: 1, marks: 67 },
];
let nextId = 6;

// ── GET /students  (with optional ?branch= &year= filter) ── NEW ──
const getAllStudents = (req, res) => {
  const { branch, year } = req.query;
  let result = [...students];

  if (branch) {
    result = result.filter((s) =>
      s.branch.toLowerCase().includes(branch.toLowerCase())
    );
  }
  if (year) {
    result = result.filter((s) => s.year === parseInt(year));
  }

  res.status(200).json({
    success: true,
    count: result.length,
    filters: { branch: branch || null, year: year || null },
    data: result,
  });
};

// ── GET /students/stats  ← NEW ─────────────
const getStats = (req, res) => {
  if (students.length === 0) {
    return res.status(200).json({ success: true, data: { total: 0 } });
  }

  const total = students.length;
  const totalMarks = students.reduce((sum, s) => sum + s.marks, 0);
  const avgMarks = (totalMarks / total).toFixed(2);
  const highest = Math.max(...students.map((s) => s.marks));
  const lowest  = Math.min(...students.map((s) => s.marks));
  const topStudent = students.find((s) => s.marks === highest);

  // Students per branch
  const branchCount = {};
  students.forEach((s) => {
    branchCount[s.branch] = (branchCount[s.branch] || 0) + 1;
  });

  res.status(200).json({
    success: true,
    data: {
      total,
      averageMarks: parseFloat(avgMarks),
      highestMarks: highest,
      lowestMarks:  lowest,
      topStudent:   topStudent.name,
      byBranch:     branchCount,
    },
  });
};

// ── GET /students/:id ──────────────────────
const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find((s) => s.id === id);
  if (!student) {
    return res.status(404).json({ success: false, error: `Student with id ${id} not found` });
  }
  res.status(200).json({ success: true, data: student });
};

// ── POST /students ─────────────────────────
const createStudent = (req, res) => {
  const { name, branch, year, marks } = req.body;
  if (!name || !branch || !year || marks === undefined) {
    return res.status(400).json({ success: false, error: 'Provide name, branch, year, and marks' });
  }
  const newStudent = { id: nextId++, name, branch, year: parseInt(year), marks: parseInt(marks) };
  students.push(newStudent);
  res.status(201).json({ success: true, message: 'Student created', data: newStudent });
};

// ── PUT /students/:id ──────────────────────
const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex((s) => s.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: `Student with id ${id} not found` });
  }
  const { name, branch, year, marks } = req.body;
  if (name)              students[index].name   = name;
  if (branch)            students[index].branch = branch;
  if (year)              students[index].year   = parseInt(year);
  if (marks !== undefined) students[index].marks = parseInt(marks);
  res.status(200).json({ success: true, message: 'Student updated', data: students[index] });
};

// ── DELETE /students/:id ───────────────────
const deleteStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex((s) => s.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: `Student with id ${id} not found` });
  }
  const deleted = students.splice(index, 1)[0];
  res.status(200).json({ success: true, message: 'Student deleted', data: deleted });
};

module.exports = { getAllStudents, getStats, getStudentById, createStudent, updateStudent, deleteStudent };
