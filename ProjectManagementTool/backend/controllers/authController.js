// ═══════════════════════════════════════════════════════════
//  controllers/authController.js — Auth Business Logic
//  Day 3: Register, Login, Get Current User
//  Project: ProjectIQ Management Tool
//  Author:  Krishna | VTU Internship 2026
// ═══════════════════════════════════════════════════════════

const jwt  = require("jsonwebtoken");
const User = require("../models/User");

// ─── Helper: Generate JWT Token ──────────────────────────────
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

// ─── Helper: Build safe user response (no password) ──────────
const userResponse = (user) => ({
  _id:       user._id,
  name:      user.name,
  email:     user.email,
  role:      user.role,
  bio:       user.bio,
  avatar:    user.getInitials(),
  createdAt: user.createdAt,
});

// ════════════════════════════════════════════════════════════
//  @route   POST /api/auth/register
//  @desc    Register a new user
//  @access  Public
// ════════════════════════════════════════════════════════════
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and password.",
      });
    }

    // Check if user already exists
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    // Create user (password hashed by pre-save hook in model)
    const user = await User.create({
      name:     name.trim(),
      email:    email.toLowerCase().trim(),
      password,
      role:     role === "admin" ? "admin" : "member",
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "Account created successfully! Welcome to ProjectIQ 🎉",
      token,
      user:    userResponse(user),
    });
  } catch (err) {
    // Mongoose validation errors
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, errors: messages });
    }
    console.error("Register Error:", err.message);
    res.status(500).json({ success: false, message: "Server error during registration." });
  }
};

// ════════════════════════════════════════════════════════════
//  @route   POST /api/auth/login
//  @desc    Login user and return JWT
//  @access  Public
// ════════════════════════════════════════════════════════════
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password.",
      });
    }

    // Find user — include password for comparison
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Compare entered password with hashed
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: `Welcome back, ${user.name}! 👋`,
      token,
      user:    userResponse(user),
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ success: false, message: "Server error during login." });
  }
};

// ════════════════════════════════════════════════════════════
//  @route   GET /api/auth/me
//  @desc    Get currently logged-in user
//  @access  Private (JWT required)
// ════════════════════════════════════════════════════════════
const getMe = async (req, res) => {
  try {
    // req.user is set by the protect middleware
    const user = await User.findById(req.user._id);

    res.json({
      success: true,
      user:    userResponse(user),
    });
  } catch (err) {
    console.error("GetMe Error:", err.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports = { register, login, getMe };
