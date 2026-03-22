const Fee = require("../models/Fee");


// ================= GET ALL =================
exports.getFees = async (req, res) => {
  try {
    const fees = await Fee.find();
    res.json(fees);
  } catch (err) {
    console.log("GET FEES ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};


// ================= CREATE =================
exports.createFee = async (req, res) => {
  try {
    const { program, monthly, quarterly, yearly } = req.body;

    // validation
    if (!program) {
      return res.status(400).json({ message: "Program is required" });
    }

    const fee = await Fee.create({
      program,
      monthly: Number(monthly) || 0,
      quarterly: Number(quarterly) || 0,
      yearly: Number(yearly) || 0,
    });

    res.json(fee);
  } catch (err) {
    console.log("CREATE FEE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};


// ================= UPDATE =================
exports.updateFee = async (req, res) => {
  try {
    const { program, monthly, quarterly, yearly } = req.body;

    const fee = await Fee.findByIdAndUpdate(
      req.params.id,
      {
        program,
        monthly: Number(monthly) || 0,
        quarterly: Number(quarterly) || 0,
        yearly: Number(yearly) || 0,
      },
      { new: true }
    );

    res.json(fee);
  } catch (err) {
    console.log("UPDATE FEE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};


// ================= DELETE =================
exports.deleteFee = async (req, res) => {
  try {
    await Fee.findByIdAndDelete(req.params.id);
    res.json({ message: "Fee deleted" });
  } catch (err) {
    console.log("DELETE FEE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
