const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["admin", "coach", "student"] },

  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batch",
    default: null,
  },

  profileImage: {
    type: String,
    default: "",
  },

  // ✅ ADDED
  phone: { type: String, default: "" },
  emergencyContact: { type: String, default: "" },
  dob: { type: String, default: "" },
  gender: { type: String, enum: ["Male", "Female", "Other", ""], default: "" },
});

module.exports = mongoose.model("User", userSchema);