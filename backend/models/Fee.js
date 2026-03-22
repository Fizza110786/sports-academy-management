const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
  program: { type: String, required: true },
  monthly: Number,
  quarterly: Number,
  yearly: Number,
});

module.exports = mongoose.model("Fee", feeSchema);
