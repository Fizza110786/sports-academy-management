const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
  name: { type: String, required: true },

  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Program",
  },

  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  // ✅ ADDED
  ageGroup: String,

  timing: String,
  days: String,

  status: {
    type: String,
    default: "Active",
  },
});

module.exports = mongoose.model("Batch", batchSchema);