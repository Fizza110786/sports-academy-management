const mongoose = require("mongoose");

const programSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fee: Number,
  ageGroup: String,  
  category: String,  
});

module.exports = mongoose.model("Program", programSchema);