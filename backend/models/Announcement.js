const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    audience: {
      type: String,
      enum: ["All", "Students", "Coaches"],
      default: "All",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    role: {
      type: String,
    },
    postedBy: { type: String },    // ✅ ADDED
    postedRole: { type: String },  // ✅ ADDED
  },
  { timestamps: true }
);

module.exports = mongoose.model("Announcement", announcementSchema);