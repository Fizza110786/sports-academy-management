const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  date: Number,
  program: String,
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