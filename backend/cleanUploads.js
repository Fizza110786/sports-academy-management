const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Material = require("./models/Material");
const User = require("./models/User");
const Payment = require("./models/Payment");

mongoose.connect("mongodb://localhost:27017/sports-academy");

const uploadsDir = path.join(__dirname, "uploads");

async function clean() {
  // get all files in uploads folder
  const files = fs.readdirSync(uploadsDir);

  // get all file paths stored in DB
  const materials = await Material.find({}, "fileUrl");
  const users = await User.find({}, "profileImage");
  const payments = await Payment.find({}, "screenshot");

  const usedFiles = new Set([
    ...materials.map((m) => m.fileUrl?.replace("/uploads/", "")),
    ...users.map((u) => u.profileImage?.replace("/uploads/", "")),
    ...payments.map((p) => p.screenshot?.replace("/uploads/", "")),
  ].filter(Boolean));

  let deleted = 0;
  for (const file of files) {
    if (!usedFiles.has(file)) {
      fs.unlinkSync(path.join(uploadsDir, file));
      console.log("Deleted:", file);
      deleted++;
    }
  }

  console.log(`\nDone — ${deleted} orphaned files deleted`);
  mongoose.disconnect();
}

clean().catch(console.error);