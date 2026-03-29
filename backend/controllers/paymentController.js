const Payment = require("../models/Payment");
const fs = require("fs");
const path = require("path");

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
    console.log("BODY:", req.body);
    console.log("FILE:", req.file); // ✅ DEBUG

    const payment = await Payment.create({
      student: req.body.student,
      amount: req.body.amount,
      method: req.body.method,
      transactionId: req.body.transactionId,

      // ✅ SAVE FILE PATH
      screenshot: req.file
        ? `/uploads/${req.file.filename}`
        : "",

      status: "Pending",
      date: req.body.date || new Date(),
    });

    res.json(payment);
  } catch (err) {
    console.error("PAYMENT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// ================= UPDATE =================
exports.updatePayment = async (req, res) => {
  try {
    const oldPayment = await Payment.findById(req.params.id);

    // ✅ DELETE OLD FILE IF EXISTS
    if (oldPayment?.screenshot) {
      const filePath = path.join(__dirname, "..", oldPayment.screenshot);

      fs.unlink(filePath, (err) => {
        if (err) {
          console.log("Error deleting old file:", err.message);
        } else {
          console.log("Old file deleted");
        }
      });
    }

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
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    // ✅ DELETE FILE FROM UPLOADS
    if (payment.screenshot) {
      const filePath = path.join(__dirname, "..", payment.screenshot);

      fs.unlink(filePath, (err) => {
        if (err) {
          console.log("File delete error:", err.message);
        } else {
          console.log("File deleted:", filePath);
        }
      });
    }

    // ✅ DELETE DB RECORD
    await Payment.findByIdAndDelete(req.params.id);

    res.json({ message: "Payment deleted" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};