const Schedule = require("../models/Schedule");

// ================= GET =================
exports.getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find().populate("coach", "name");
    res.json(schedules);
  } catch (err) {
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