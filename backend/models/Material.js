const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ["video", "pdf"], default: "pdf" },
  fileUrl: { type: String, default: "" },
  size: { type: String, default: "" },
  duration: { type: String, default: "" },
  pages: { type: String, default: "" },
  coachId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  coachName: { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("Material", materialSchema);