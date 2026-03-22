const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Program = require("../models/Program");
const Payment = require("../models/Payment");

// ================= DASHBOARD REPORT =================
router.get("/", async (req, res) => {
  try {
    const students = await User.countDocuments({ role: "student" });
    const coaches = await User.countDocuments({ role: "coach" });
    const programs = await Program.countDocuments();

    const payments = await Payment.find();
    const revenue = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      students,
      coaches,
      programs,
      revenue,
      recentUsers,
    });
  } catch (err) {
    console.log("Report error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;