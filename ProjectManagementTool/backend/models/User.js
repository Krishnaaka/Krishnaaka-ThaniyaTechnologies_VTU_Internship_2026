// ═══════════════════════════════════════════════════════════
//  models/User.js — User Schema
//  Day 2: MongoDB Schema Design
//  Project: ProjectIQ Management Tool
//  Author:  Krishna | VTU Internship 2026
// ═══════════════════════════════════════════════════════════

const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type:     String,
      required: [true, "Name is required"],
      trim:     true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    email: {
      type:     String,
      required: [true, "Email is required"],
      unique:   true,
      trim:     true,
      lowercase: true,
      match:    [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },

    password: {
      type:      String,
      required:  [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select:    false, // Never return password in queries
    },

    role: {
      type:    String,
      enum:    ["admin", "member"],
      default: "member",
    },

    avatar: {
      type:    String,
      default: "", // Will be auto-generated from name initials in frontend
    },

    bio: {
      type:      String,
      maxlength: [200, "Bio cannot exceed 200 characters"],
      default:   "",
    },
  },
  {
    timestamps: true, // createdAt, updatedAt auto-added
  }
);

// ─── Pre-save Hook: Hash password before saving ──────────────
UserSchema.pre("save", async function (next) {
  // Only hash if password was modified
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ─── Instance Method: Compare password ───────────────────────
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ─── Instance Method: Get avatar initials ────────────────────
UserSchema.methods.getInitials = function () {
  return this.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

module.exports = mongoose.model("User", UserSchema);
