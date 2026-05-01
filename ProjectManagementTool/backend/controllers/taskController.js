// ═══════════════════════════════════════════════════════════
//  controllers/taskController.js — Task CRUD Logic
//  Day 5: Full Task Management (Kanban-ready)
//  Project: ProjectIQ Management Tool
//  Author:  Krishna | VTU Internship 2026
// ═══════════════════════════════════════════════════════════

const Task    = require("../models/Task");
const Project = require("../models/Project");

// ─── Helper: Check project access ─────────────────────────────
const hasProjectAccess = async (projectId, userId) => {
  const project = await Project.findById(projectId);
  if (!project) return { allowed: false, reason: "Project not found." };

  const isOwner  = project.owner.toString()  === userId.toString();
  const isMember = project.members.some((m) => m.toString() === userId.toString());

  return { allowed: isOwner || isMember, project };
};

// ════════════════════════════════════════════════════════════
//  @route   GET /api/tasks
//  @desc    Get tasks — filter by project, status, assignedTo
//  @access  Private
// ════════════════════════════════════════════════════════════
const getAllTasks = async (req, res) => {
  try {
    const filter = {};
    const { project, status, assignedTo, priority } = req.query;

    if (project)    filter.project    = project;
    if (status)     filter.status     = status;
    if (assignedTo) filter.assignedTo = assignedTo;
    if (priority)   filter.priority   = priority;

    const tasks = await Task.find(filter)
      .populate("assignedTo", "name email")
      .populate("createdBy",  "name email")
      .populate("project",    "title color")
      .sort({ createdAt: -1 });

    res.json({ success: true, count: tasks.length, data: tasks });
  } catch (err) {
    console.error("getAllTasks:", err.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// ════════════════════════════════════════════════════════════
//  @route   GET /api/tasks/:id
//  @desc    Get single task
//  @access  Private
// ════════════════════════════════════════════════════════════
const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "name email")
      .populate("createdBy",  "name email")
      .populate("project",    "title color owner members");

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found." });
    }

    res.json({ success: true, data: task });
  } catch (err) {
    console.error("getTask:", err.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// ════════════════════════════════════════════════════════════
//  @route   POST /api/tasks
//  @desc    Create a new task inside a project
//  @access  Private (project member/owner only)
// ════════════════════════════════════════════════════════════
const createTask = async (req, res) => {
  try {
    const { title, description, project, assignedTo, status, priority, deadline, tags } = req.body;

    if (!title || !project) {
      return res.status(400).json({
        success: false,
        message: "Title and project are required.",
      });
    }

    // Verify user has access to the project
    const { allowed, reason } = await hasProjectAccess(project, req.user._id);
    if (!allowed) {
      return res.status(403).json({ success: false, message: reason || "Access denied." });
    }

    const task = await Task.create({
      title:       title.trim(),
      description: description ? description.trim() : "",
      project,
      assignedTo:  assignedTo || null,
      createdBy:   req.user._id,
      status:      status   || "todo",
      priority:    priority || "medium",
      deadline:    deadline || null,
      tags:        tags     || [],
    });

    await task.populate("assignedTo", "name email");
    await task.populate("createdBy",  "name email");
    await task.populate("project",    "title color");

    res.status(201).json({
      success: true,
      message: `Task "${task.title}" created! 📋`,
      data:    task,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, errors: messages });
    }
    console.error("createTask:", err.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// ════════════════════════════════════════════════════════════
//  @route   PUT /api/tasks/:id
//  @desc    Update full task details
//  @access  Private
// ════════════════════════════════════════════════════════════
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found." });
    }

    const { title, description, assignedTo, status, priority, deadline, tags } = req.body;

    if (title)                    task.title       = title.trim();
    if (description !== undefined) task.description = description.trim();
    if (assignedTo  !== undefined) task.assignedTo  = assignedTo || null;
    if (status)                   task.status      = status;
    if (priority)                 task.priority    = priority;
    if (deadline    !== undefined) task.deadline    = deadline || null;
    if (tags)                     task.tags        = tags;

    await task.save();
    await task.populate("assignedTo", "name email");
    await task.populate("createdBy",  "name email");
    await task.populate("project",    "title color");

    res.json({ success: true, message: "Task updated!", data: task });
  } catch (err) {
    console.error("updateTask:", err.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// ════════════════════════════════════════════════════════════
//  @route   PATCH /api/tasks/:id/status
//  @desc    Update ONLY the status (Kanban drag-and-drop)
//  @access  Private
// ════════════════════════════════════════════════════════════
const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = ["todo", "inprogress", "done"];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
      .populate("assignedTo", "name email")
      .populate("project",    "title");

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found." });
    }

    res.json({
      success: true,
      message: `Task moved to "${status}"!`,
      data:    task,
    });
  } catch (err) {
    console.error("updateTaskStatus:", err.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// ════════════════════════════════════════════════════════════
//  @route   DELETE /api/tasks/:id
//  @desc    Delete a task (creator or project owner)
//  @access  Private
// ════════════════════════════════════════════════════════════
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("project", "owner");
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found." });
    }

    const isCreator = task.createdBy.toString() === req.user._id.toString();
    const isOwner   = task.project.owner.toString() === req.user._id.toString();

    if (!isCreator && !isOwner) {
      return res.status(403).json({
        success: false,
        message: "Only the task creator or project owner can delete this task.",
      });
    }

    await task.deleteOne();
    res.json({ success: true, message: `Task "${task.title}" deleted.` });
  } catch (err) {
    console.error("deleteTask:", err.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// ════════════════════════════════════════════════════════════
//  @route   GET /api/tasks/stats
//  @desc    Get task stats — counts by status, overdue count
//  @access  Private
// ════════════════════════════════════════════════════════════
const getTaskStats = async (req, res) => {
  try {
    const { project } = req.query;
    const filter = project ? { project } : {};

    const [todo, inprogress, done, overdue] = await Promise.all([
      Task.countDocuments({ ...filter, status: "todo" }),
      Task.countDocuments({ ...filter, status: "inprogress" }),
      Task.countDocuments({ ...filter, status: "done" }),
      Task.countDocuments({
        ...filter,
        status:   { $ne: "done" },
        deadline: { $lt: new Date() },
      }),
    ]);

    res.json({
      success: true,
      data: { total: todo + inprogress + done, todo, inprogress, done, overdue },
    });
  } catch (err) {
    console.error("getTaskStats:", err.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports = { getAllTasks, getTask, createTask, updateTask, updateTaskStatus, deleteTask, getTaskStats };
