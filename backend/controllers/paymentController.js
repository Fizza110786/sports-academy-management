const Payment = require("../models/Payment");


// ================= GET =================
exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate(
      "student",
      "name email"
    );

    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= CREATE =================
exports.createPayment = async (req, res) => {
  try {
    const payment = await Payment.create(req.body);
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= UPDATE STATUS =================
exports.updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= DELETE =================
exports.deletePayment = async (req, res) => {
  try {
    await Payment.findByIdAndDelete(req.params.id);
    res.json({ message: "Payment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
