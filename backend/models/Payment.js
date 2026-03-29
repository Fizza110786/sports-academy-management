const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  amount: Number,
  method: String,
  transactionId: String,

  // ✅ REQUIRED FIELD
  screenshot: String,

  status: {
    type: String,
    default: "Pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);