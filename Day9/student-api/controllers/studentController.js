// ══════════════════════════════════════════
//   controllers/studentController.js
//   Day9: Added getStudentById + updateStudent
// ══════════════════════════════════════════

// ── In-memory data store ──
let students = [
  { id: 1, name: 'Alice Johnson',  branch: 'Computer Science', year: 3, marks: 88 },
  { id: 2, name: 'Bob Smith',      branch: 'Electronics',      year: 2, marks: 74 },
  { id: 3, name: 'Charlie Brown',  branch: 'Mechanical',       year: 4, marks: 91 },
];
let nextId = 4;

// ── GET /students ──────────────────────────
const getAllStudents = (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    data: students,
  });
};

// ── GET /students/:id   ← NEW ─────────────
const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({
      success: false,
      error: `Student with id ${id} not found`,
    });
  }

  res.status(200).json({
    success: true,
    data: student,
  });
};

// ── POST /students ─────────────────────────
const createStudent = (req, res) => {
  const { name, branch, year, marks } = req.body;

  if (!name || !branch || !year || marks === undefined) {
    return res.status(400).json({
      success: false,
      error: 'Please provide name, branch, year, and marks',
    });
  }

  const newStudent = {
    id: nextId++,
    name,
    branch,
    year: parseInt(year),
    marks: parseInt(marks),
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: 'Student created successfully',
    data: newStudent,
  });
};

// ── PUT /students/:id   ← NEW ─────────────
const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: `Student with id ${id} not found`,
    });
  }

  const { name, branch, year, marks } = req.body;

  // Only update fields that are provided
  if (name)   students[index].name   = name;
  if (branch) students[index].branch = branch;
  if (year)   students[index].year   = parseInt(year);
  if (marks !== undefined) students[index].marks = parseInt(marks);

  res.status(200).json({
    success: true,
    message: 'Student updated successfully',
    data: students[index],
  });
};

// ── DELETE /students/:id ───────────────────
const deleteStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: `Student with id ${id} not found`,
    });
  }

  const deleted = students.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: 'Student deleted successfully',
    data: deleted,
  });
};

module.exports = { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent };
