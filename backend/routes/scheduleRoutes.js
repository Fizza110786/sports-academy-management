const express = require("express");
const router = express.Router();

const {
  getSchedules,
  createSchedule,
  deleteSchedule,
} = require("../controllers/scheduleController");

router.get("/", getSchedules);
router.post("/", createSchedule);
router.delete("/:id", deleteSchedule);

module.exports = router;
