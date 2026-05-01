// ═══════════════════════════════════════════════════════════
//  models/Project.js — Project Schema
//  Day 2: MongoDB Schema Design
//  Project: ProjectIQ Management Tool
//  Author:  Krishna | VTU Internship 2026
// ═══════════════════════════════════════════════════════════

const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type:      String,
      required:  [true, "Project title is required"],
      trim:      true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    description: {
      type:      String,
      trim:      true,
      maxlength: [500, "Description cannot exceed 500 characters"],
      default:   "",
    },

    // Project owner (who created it)
    owner: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      "User",
      required: [true, "Project must have an owner"],
    },

    // Team members on this project
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:  "User",
      },
    ],

    status: {
      type:    String,
      enum:    ["active", "completed", "on-hold"],
      default: "active",
    },

    priority: {
      type:    String,
      enum:    ["low", "medium", "high"],
      default: "medium",
    },

    deadline: {
      type: Date,
    },

    color: {
      type:    String,
      default: "#6366f1", // Brand purple for project card
    },
  },
  {
    timestamps: true,
    // Virtual field: task count (populated separately)
    toJSON:   { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ─── Virtual: Days until deadline ────────────────────────────
ProjectSchema.virtual("daysLeft").get(function () {
  if (!this.deadline) return null;
  const diff = new Date(this.deadline) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
});

// ─── Index for faster lookup by owner ─────────────────────────
ProjectSchema.index({ owner: 1 });
ProjectSchema.index({ status: 1 });

module.exports = mongoose.model("Project", ProjectSchema);
