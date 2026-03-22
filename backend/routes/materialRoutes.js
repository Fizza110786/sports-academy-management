const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getMaterials,
  createMaterial,
  deleteMaterial,
} = require("../controllers/materialController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.get("/", getMaterials);
router.post("/", upload.single("file"), createMaterial);
router.delete("/:id", deleteMaterial);

module.exports = router;