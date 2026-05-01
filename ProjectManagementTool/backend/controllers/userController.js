// ═══════════════════════════════════════════════════════════
//  controllers/userController.js — User/Team Logic
//  Day 4: Get all users, profile update
//  Project: ProjectIQ Management Tool
//  Author:  Krishna | VTU Internship 2026
// ═══════════════════════════════════════════════════════════

const User = require("../models/User");

// ════════════════════════════════════════════════════════════
//  @route   GET /api/users
//  @desc    Get all users (for team listing & member assignment)
//  @access  Private
// ════════════════════════════════════════════════════════════
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ name: 1 });
    res.json({ success: true, count: users.length, data: users });
  } catch (err) {
    console.error("getAllUsers:", err.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// ════════════════════════════════════════════════════════════
//  @route   GET /api/users/:id
//  @desc    Get a user's public profile
//  @access  Private
// ════════════════════════════════════════════════════════════
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }
    res.json({ success: true, data: user });
  } catch (err) {
    console.error("getUserById:", err.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// ════════════════════════════════════════════════════════════
//  @route   PUT /api/users/:id
//  @desc    Update own profile (name, bio only)
//  @access  Private (own profile only)
// ════════════════════════════════════════════════════════════
const updateUser = async (req, res) => {
  try {
    // Users can only update their own profile
    if (req.params.id !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "You can only update your own profile." });
    }

    const { name, bio } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    if (name) user.name = name.trim();
    if (bio  !== undefined) user.bio = bio.trim();

    await user.save();

    res.json({
      success: true,
      message: "Profile updated!",
      data: {
        _id:    user._id,
        name:   user.name,
        email:  user.email,
        role:   user.role,
        bio:    user.bio,
        avatar: user.getInitials(),
      },
    });
  } catch (err) {
    console.error("updateUser:", err.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports = { getAllUsers, getUserById, updateUser };
