const Schedule = require("../models/Schedule");

// ================= GET =================
exports.getSchedules = async (req, res) => {
  try {
    const user = req.user;

    let query = {};

    // ✅ SAFE CHECK (THIS IS THE FIX)
    if (user) {
      // ✅ ADMIN → all schedules
      if (user.role === "admin") {
        query = {};
      }

      // ✅ COACH → only their schedules
      if (user.role === "coach") {
        query.coach = user._id;
      }

      // ✅ STUDENT → only their batch schedules
      if (user.role === "student") {
        query.batch = user.batch;
      }
    }

    // ✅ IF NO USER → return all (prevents crash)
    const schedules = await Schedule.find(query)
      .populate("coach", "name")
      .populate("batch", "name");

    res.json(schedules);
  } catch (err) {
    console.error("SCHEDULE ERROR:", err); // ✅ debug
    res.status(500).json({ message: err.message });
  }
};

// ================= CREATE =================
exports.createSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.create(req.body);
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= DELETE =================
exports.deleteSchedule = async (req, res) => {
  try {
    await Schedule.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// ================= UPDATE =================
exports.updateSchedule = async (req, res) => {
  try {
    const updated = await Schedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};