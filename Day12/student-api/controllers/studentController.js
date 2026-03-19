// ══════════════════════════════════════════
//   controllers/studentController.js
//   Day12: Added sort support to getAllStudents
// ══════════════════════════════════════════

let students = [
  { id: 1, name: 'Alice Johnson',  branch: 'Computer Science', year: 3, marks: 88 },
  { id: 2, name: 'Bob Smith',      branch: 'Electronics',      year: 2, marks: 74 },
  { id: 3, name: 'Charlie Brown',  branch: 'Mechanical',       year: 4, marks: 91 },
  { id: 4, name: 'Diana Prince',   branch: 'Computer Science', year: 2, marks: 95 },
  { id: 5, name: 'Ethan Hunt',     branch: 'Civil',            year: 1, marks: 67 },
];
let nextId = 6;

// ── GET /students  (filter + sort)  ← UPDATED ──
// Query params: branch, year, sortBy (name|marks|year), order (asc|desc)
const getAllStudents = (req, res) => {
  const { branch, year, sortBy, order } = req.query;
  let result = [...students];

  // Filter
  if (branch) {
    result = result.filter((s) =>
      s.branch.toLowerCase().includes(branch.toLowerCase())
    );
  }
  if (year) {
    result = result.filter((s) => s.year === parseInt(year));
  }

  // Sort  ← NEW
  const validFields = ['name', 'marks', 'year', 'id'];
  if (sortBy && validFields.includes(sortBy)) {
    result.sort((a, b) => {
      if (typeof a[sortBy] === 'string') {
        return order === 'desc'
          ? b[sortBy].localeCompare(a[sortBy])
          : a[sortBy].localeCompare(b[sortBy]);
      }
      return order === 'desc' ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy];
    });
  }

  res.status(200).json({
    success: true,
    count: result.length,
    filters: { branch: branch || null, year: year || null },
    sort:    { sortBy: sortBy || null, order: order || 'asc' },
    data: result,
  });
};

// ── GET /students/stats ────────────────────
const getStats = (req, res) => {
  if (students.length === 0) {
    return res.status(200).json({ success: true, data: { total: 0 } });
  }
  const total      = students.length;
  const avgMarks   = (students.reduce((s, x) => s + x.marks, 0) / total).toFixed(2);
  const highest    = Math.max(...students.map((s) => s.marks));
  const lowest     = Math.min(...students.map((s) => s.marks));
  const topStudent = students.find((s) => s.marks === highest);
  const branchCount = {};
  students.forEach((s) => { branchCount[s.branch] = (branchCount[s.branch] || 0) + 1; });

  res.status(200).json({
    success: true,
    data: { total, averageMarks: parseFloat(avgMarks), highestMarks: highest, lowestMarks: lowest, topStudent: topStudent.name, byBranch: branchCount },
  });
};

// ── GET /students/:id ──────────────────────
const getStudentById = (req, res) => {
  const student = students.find((s) => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ success: false, error: `Student ${req.params.id} not found` });
  res.status(200).json({ success: true, data: student });
};

// ── POST /students ─────────────────────────
const createStudent = (req, res) => {
  const { name, branch, year, marks } = req.body;
  if (!name || !branch || !year || marks === undefined)
    return res.status(400).json({ success: false, error: 'Provide name, branch, year, marks' });
  const newStudent = { id: nextId++, name, branch, year: parseInt(year), marks: parseInt(marks) };
  students.push(newStudent);
  res.status(201).json({ success: true, message: 'Student created', data: newStudent });
};

// ── PUT /students/:id ──────────────────────
const updateStudent = (req, res) => {
  const index = students.findIndex((s) => s.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, error: `Student ${req.params.id} not found` });
  const { name, branch, year, marks } = req.body;
  if (name)              students[index].name   = name;
  if (branch)            students[index].branch = branch;
  if (year)              students[index].year   = parseInt(year);
  if (marks !== undefined) students[index].marks = parseInt(marks);
  res.status(200).json({ success: true, message: 'Student updated', data: students[index] });
};

// ── DELETE /students/:id ───────────────────
const deleteStudent = (req, res) => {
  const index = students.findIndex((s) => s.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, error: `Student ${req.params.id} not found` });
  const deleted = students.splice(index, 1)[0];
  res.status(200).json({ success: true, message: 'Student deleted', data: deleted });
};

module.exports = { getAllStudents, getStats, getStudentById, createStudent, updateStudent, deleteStudent };
