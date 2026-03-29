const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  date: String,
  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batch"
  },
  title: String,
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  time: String,
  location: String,
  status: String,
});

module.exports = mongoose.model("Schedule", scheduleSchema);