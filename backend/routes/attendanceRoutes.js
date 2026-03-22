const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");

// ================= SAVE OR UPDATE ATTENDANCE =================
router.post("/", async (req, res) => {
  try {
    const { records } = req.body;

    if (!records || records.length === 0) {
      return res.status(400).json({ message: "No records provided" });
    }

    const results = [];

    for (const record of records) {
      const { studentId, batchId, status, date } = record;

      const updated = await Attendance.findOneAndUpdate(
        { studentId, batchId, date },
        { status },
        { new: true, upsert: true }
      );

      results.push(updated);
    }

    res.status(200).json(results);

  } catch (error) {
    console.error("Attendance Save Error:", error);
    res.status(500).json({ message: "Server error while saving attendance" });
  }
});

// ================= GET ALL BY BATCH (FOR EXCEL) ================= // ✅ ADDED
router.get("/batch/:batchId", async (req, res) => {
  try {
    const { batchId } = req.params;

    const records = await Attendance.find({ batchId })
      .populate("studentId", "name profileImage")
      .populate("batchId", "name")
      .sort({ date: 1 });

    res.json(records);
  } catch (error) {
    console.error("Batch fetch error:", error);
    res.status(500).json({ message: "Error fetching attendance" });
  }
});

// ================= GET BY BATCH + DATE (COACH HISTORY) =================
router.get("/:batchId/:date", async (req, res) => {
  try {
    const { batchId, date } = req.params;

    const records = await Attendance.find({ batchId, date })
      .populate("studentId", "name profileImage")
      .populate("batchId", "name");

    res.json(records);
  } catch (error) {
    console.error("Fetch previous error:", error);
    res.status(500).json({ message: "Error fetching attendance" });
  }
});

// ================= GET ALL (ADMIN) =================
router.get("/", async (req, res) => {
  try {
    const records = await Attendance.find()
      .populate("studentId", "name profileImage")
      .populate("batchId", "name");

    res.json(records);
  } catch (error) {
    console.error("Admin fetch error:", error);
    res.status(500).json({ message: "Error fetching attendance" });
  }
});

module.exports = router;