const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      required: true,
    },

    status: {
      type: String,
      enum: ["Present", "Absent", "Late"],
      required: true,
    },

    date: {
      type: String, // format: YYYY-MM-DD (ex: 2026-03-07)
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// 🔥 VERY IMPORTANT — Prevent Duplicate Attendance
attendanceSchema.index(
  { studentId: 1, batchId: 1, date: 1 },
  { unique: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);