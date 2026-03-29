const express = require("express");
const router = express.Router();

const {
  getSchedules,
  createSchedule,
  deleteSchedule,
  updateSchedule,
} = require("../controllers/scheduleController");

// ✅ NO protect — authMiddleware handles filtering via req.user if token exists
router.get("/", getSchedules);
router.post("/", createSchedule);
router.put("/:id", updateSchedule); // ✅ ADDED
router.delete("/:id", deleteSchedule);

module.exports = router;