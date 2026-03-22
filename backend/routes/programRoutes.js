const express = require("express");
const router = express.Router();
const {
  getPrograms,
  createProgram,
  updateProgram, // ✅ ADDED
  deleteProgram,
} = require("../controllers/programController");

router.get("/", getPrograms);
router.post("/", createProgram);
router.put("/:id", updateProgram); // ✅ ADDED
router.delete("/:id", deleteProgram);

module.exports = router;