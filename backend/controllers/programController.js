const Program = require("../models/Program");

// ================= GET =================
exports.getPrograms = async (req, res) => {
  const programs = await Program.find();
  res.json(programs);
};

// ================= CREATE =================
exports.createProgram = async (req, res) => {
  const program = await Program.create(req.body);
  res.json(program);
};

// ================= UPDATE ================= // ✅ ADDED
exports.updateProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(program);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= DELETE =================
exports.deleteProgram = async (req, res) => {
  await Program.findByIdAndDelete(req.params.id);
  res.json({ message: "Program deleted" });
};