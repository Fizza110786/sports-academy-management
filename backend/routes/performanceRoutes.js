const express = require("express");
const router = express.Router();
const {
  getPerformance,
  createPerformance,
  updatePerformance,
  deletePerformance,
} = require("../controllers/performanceController");

router.get("/", getPerformance);
router.post("/", createPerformance);
router.put("/:id", updatePerformance);
router.delete("/:id", deletePerformance);

module.exports = router;