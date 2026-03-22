const User = require("../models/User");
const Program = require("../models/Program");
const Payment = require("../models/Payment");

exports.getReports = async (req, res) => {
  try {
    const students = await User.countDocuments({ role: "student" });
    const coaches = await User.countDocuments({ role: "coach" });
    const programs = await Program.countDocuments();

    const verifiedPayments = await Payment.find({ status: "Verified" });
    const revenue = verifiedPayments.reduce(
      (sum, p) => sum + Number(p.amount || 0),
      0
    );

    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email");

    res.json({
      students,
      coaches,
      programs,
      revenue,
      recentUsers,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
