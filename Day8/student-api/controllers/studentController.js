// ══════════════════════════════════════════
//   controllers/studentController.js
//   Handles all Student API business logic
// ══════════════════════════════════════════

// ── In-memory data store (no DB needed) ──
let students = [
    { id: 1, name: 'Alice Johnson', branch: 'Computer Science', year: 3, marks: 88 },
    { id: 2, name: 'Bob Smith', branch: 'Electronics', year: 2, marks: 74 },
    { id: 3, name: 'Charlie Brown', branch: 'Mechanical', year: 4, marks: 91 },
];
let nextId = 4;

// ── GET /students ──────────────────────────
// Returns all students
const getAllStudents = (req, res) => {
    res.status(200).json({
        success: true,
        count: students.length,
        data: students,
    });
};

// ── POST /students ─────────────────────────
// Adds a new student
// Required body: { name, branch, year, marks }
const createStudent = (req, res) => {
    const { name, branch, year, marks } = req.body;

    // Validation
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

// ── DELETE /students/:id ───────────────────
// Deletes a student by ID
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

module.exports = { getAllStudents, createStudent, deleteStudent };
