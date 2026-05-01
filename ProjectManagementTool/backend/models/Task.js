// ═══════════════════════════════════════════════════════════
//  models/Task.js — Task Schema
//  Day 2: MongoDB Schema Design
//  Project: ProjectIQ Management Tool
//  Author:  Krishna | VTU Internship 2026
// ═══════════════════════════════════════════════════════════

const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type:      String,
      required:  [true, "Task title is required"],
      trim:      true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [150, "Title cannot exceed 150 characters"],
    },

    description: {
      type:      String,
      trim:      true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
      default:   "",
    },

    // Which project this task belongs to
    project: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      "Project",
      required: [true, "Task must belong to a project"],
    },

    // Who the task is assigned to
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref:  "User",
    },

    // Who created this task
    createdBy: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      "User",
      required: true,
    },

    // Kanban status — the core of task tracking
    status: {
      type:    String,
      enum:    ["todo", "inprogress", "done"],
      default: "todo",
    },

    priority: {
      type:    String,
      enum:    ["low", "medium", "high"],
      default: "medium",
    },

    deadline: {
      type: Date,
    },

    // Simple tag/label system
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
    toJSON:     { virtuals: true },
    toObject:   { virtuals: true },
  }
);

// ─── Virtual: Is this task overdue? ──────────────────────────
TaskSchema.virtual("isOverdue").get(function () {
  if (!this.deadline || this.status === "done") return false;
  return new Date(this.deadline) < new Date();
});

// ─── Virtual: Days until deadline ────────────────────────────
TaskSchema.virtual("daysLeft").get(function () {
  if (!this.deadline) return null;
  const diff = new Date(this.deadline) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
});

// ─── Indexes for faster queries ───────────────────────────────
TaskSchema.index({ project: 1 });
TaskSchema.index({ assignedTo: 1 });
TaskSchema.index({ status: 1 });

module.exports = mongoose.model("Task", TaskSchema);
