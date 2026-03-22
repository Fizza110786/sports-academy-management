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

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.get("/", getPayments);
router.post("/", upload.single("screenshot"), createPayment); // ✅ multer added
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);

module.exports = router;