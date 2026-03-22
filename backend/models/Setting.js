const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
  academyName: String,
  email: String,
  phone: String,
  address: String,
  currency: String,
  timezone: String,
});

module.exports = mongoose.model("Setting", settingSchema);
