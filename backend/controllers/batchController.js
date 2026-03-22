const Batch = require("../models/Batch");

// ================= GET (ADMIN) =================
exports.getBatches = async (req, res) => {
  try {
    const batches = await Batch.find()
      .populate("program", "name")
      .populate("coach", "name email profileImage")
      .populate("students", "name email profileImage");

    res.json(batches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= CREATE =================
exports.createBatch = async (req, res) => {
  try {
    const batch = await Batch.create(req.body);
    res.json(batch);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= DELETE =================
exports.deleteBatch = async (req, res) => {
  try {
    await Batch.findByIdAndDelete(req.params.id);
    res.json({ message: "Batch deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= UPDATE =================
exports.updateBatch = async (req, res) => {
  try {
    const batch = await Batch.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(batch);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= GET COACH BATCHES =================
exports.getCoachBatches = async (req, res) => {
  try {
    const coachId = req.params.coachId;

    const batches = await Batch.find({ coach: coachId })
      .populate("program", "name")
      .populate("coach", "name email profileImage")
      .populate("students", "name email profileImage");

    res.json(batches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};