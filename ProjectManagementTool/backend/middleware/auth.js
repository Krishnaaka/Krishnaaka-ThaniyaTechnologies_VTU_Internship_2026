// ═══════════════════════════════════════════════════════════
//  middleware/auth.js — JWT Authentication Middleware
//  Day 3: Protects private routes
//  Project: ProjectIQ Management Tool
//  Author:  Krishna | VTU Internship 2026
// ═══════════════════════════════════════════════════════════

const jwt  = require("jsonwebtoken");
const User = require("../models/User");

// ─── Protect Middleware ───────────────────────────────────────
//  Attach this to any route that requires login
const protect = async (req, res, next) => {
  let token;

  // Check Authorization header: "Bearer <token>"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized. Please login first.",
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request (exclude password)
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists.",
      });
    }

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token. Please login again.",
    });
  }
};

// ─── Admin Only Middleware ────────────────────────────────────
//  Use AFTER protect — restricts to admin role only
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({
    success: false,
    message: "Access denied. Admin only.",
  });
};

module.exports = { protect, adminOnly };
