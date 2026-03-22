const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// ================= MULTER CONFIG =================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ================= ROUTES =================
router.get("/", getUsers);

router.post("/", upload.single("profileImage"), createUser);

router.put("/:id", upload.single("profileImage"), updateUser);

router.delete("/:id", deleteUser);

module.exports = router;