const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  getPayments,
  createPayment,
  updatePayment,
  deletePayment,
} = require("../controllers/paymentController");

// ================= MULTER =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// ================= ROUTES =================
router.get("/", getPayments);

// ✅ IMPORTANT (DO NOT CHANGE)
router.post("/", upload.single("screenshot"), createPayment);

router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);

module.exports = router;