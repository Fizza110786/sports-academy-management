const Performance = require("../models/Performance");

// ================= GET ALL =================
exports.getPerformance = async (req, res) => {
  try {
    const { coachId } = req.query;
    const filter = coachId ? { coachId } : {};
    const data = await Performance.find(filter).sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= CREATE =================
exports.createPerformance = async (req, res) => {
  try {
    const item = await Performance.create(req.body);
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= UPDATE =================
exports.updatePerformance = async (req, res) => {
  try {
    const item = await Performance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= DELETE =================
exports.deletePerformance = async (req, res) => {
  try {
    await Performance.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};