// ═══════════════════════════════════════════════════════════
//  controllers/projectController.js — Project CRUD Logic
//  Day 4: Full Project Management API
//  Project: ProjectIQ Management Tool
//  Author:  Krishna | VTU Internship 2026
// ═══════════════════════════════════════════════════════════

const Project = require("../models/Project");
const Task    = require("../models/Task");

// ════════════════════════════════════════════════════════════
//  @route   GET /api/projects
//  @desc    Get all projects where user is owner or member
//  @access  Private
// ════════════════════════════════════════════════════════════
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [{ owner: req.user._id }, { members: req.user._id }],
    })
      .populate("owner",   "name email")
      .populate("members", "name email")
      .sort({ createdAt: -1 });

    // Attach task count to each project
    const projectsWithCount = await Promise.all(
      projects.map(async (p) => {
        const taskCount = await Task.countDocuments({ project: p._id });
        const doneTasks = await Task.countDocuments({ project: p._id, status: "done" });
        return { ...p.toJSON(), taskCount, doneTasks };
      })
    );

    res.json({ success: true, count: projects.length, data: projectsWithCount });
  } catch (err) {
    console.error("getAllProjects:", err.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// ════════════════════════════════════════════════════════════
//  @route   GET /api/projects/:id
//  @desc    Get a single project with tasks summary
//  @access  Private
// ════════════════════════════════════════════════════════════
const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("owner",   "name email")
      .populate("members", "name email");

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    // Only owner or members can view
    const isMember = project.members.some(
      (m) => m._id.toString() === req.user._id.toString()
    );
    const isOwner = project.owner._id.toString() === req.user._id.toString();

    if (!isOwner && !isMember) {
      return res.status(403).json({ success: false, message: "Access denied." });
    }

    // Get task stats for this project
    const tasks = await Task.find({ project: project._id });
    const taskStats = {
      total:      tasks.length,
      todo:       tasks.filter((t) => t.status === "todo").length,
      inprogress: tasks.filter((t) => t.status === "inprogress").length,
      done:       tasks.filter((t) => t.status === "done").length,
    };

    res.json({ success: true, data: { ...project.toJSON(), taskStats } });
  } catch (err) {
    console.error("getProject:", err.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// ════════════════════════════════════════════════════════════
//  @route   POST /api/projects
//  @desc    Create a new project
//  @access  Private
// ════════════════════════════════════════════════════════════
const createProject = async (req, res) => {
  try {
    const { title, description, deadline, priority, color, members } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: "Project title is required." });
    }

    const project = await Project.create({
      title:       title.trim(),
      description: description ? description.trim() : "",
      owner:       req.user._id,
      members:     members || [],
      deadline:    deadline || null,
      priority:    priority || "medium",
      color:       color   || "#6366f1",
    });

    await project.populate("owner",   "name email");
    await project.populate("members", "name email");

    res.status(201).json({
      success: true,
      message: `Project "${project.title}" created successfully! 🎉`,
      data:    project,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, errors: messages });
    }
    console.error("createProject:", err.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// ════════════════════════════════════════════════════════════
//  @route   PUT /api/projects/:id
//  @desc    Update a project (owner only)
//  @access  Private
// ════════════════════════════════════════════════════════════
const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    // Only owner can update
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Only the project owner can update." });
    }

    const { title, description, status, priority, deadline, color } = req.body;

    if (title)       project.title       = title.trim();
    if (description !== undefined) project.description = description.trim();
    if (status)      project.status      = status;
    if (priority)    project.priority    = priority;
    if (deadline)    project.deadline    = deadline;
    if (color)       project.color       = color;

    await project.save();
    await project.populate("owner",   "name email");
    await project.populate("members", "name email");

    res.json({ success: true, message: "Project updated!", data: project });
  } catch (err) {
    console.error("updateProject:", err.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// ════════════════════════════════════════════════════════════
//  @route   DELETE /api/projects/:id
//  @desc    Delete project + all its tasks (owner only)
//  @access  Private
// ════════════════════════════════════════════════════════════
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Only the owner can delete this project." });
    }

    // Delete all tasks belonging to this project
    await Task.deleteMany({ project: project._id });
    await project.deleteOne();

    res.json({ success: true, message: `Project "${project.title}" and all its tasks deleted.` });
  } catch (err) {
    console.error("deleteProject:", err.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// ════════════════════════════════════════════════════════════
//  @route   POST /api/projects/:id/members
//  @desc    Add a member to the project
//  @access  Private (owner only)
// ════════════════════════════════════════════════════════════
const addMember = async (req, res) => {
  try {
    const project  = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Only the owner can add members." });
    }

    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ success: false, message: "userId is required." });
    }

    if (project.members.includes(userId)) {
      return res.status(409).json({ success: false, message: "User is already a member." });
    }

    project.members.push(userId);
    await project.save();
    await project.populate("members", "name email");

    res.json({ success: true, message: "Member added!", data: project.members });
  } catch (err) {
    console.error("addMember:", err.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports = { getAllProjects, getProject, createProject, updateProject, deleteProject, addMember };
