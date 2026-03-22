const express = require("express");
const router = express.Router();

const {
  getBatches,
  createBatch,
  deleteBatch,
  updateBatch,
  getCoachBatches
} = require("../controllers/batchController");

// ================= ADMIN ROUTES =================
router.get("/", getBatches);
router.post("/", createBatch);
router.delete("/:id", deleteBatch);
router.put("/:id", updateBatch);

// ================= COACH ROUTE =================
router.get("/coach/:coachId", getCoachBatches);

module.exports = router;