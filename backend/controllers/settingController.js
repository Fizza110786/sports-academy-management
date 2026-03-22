const Setting = require("../models/Setting");

// GET settings
exports.getSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne();

    if (!settings) {
      settings = await Setting.create({
        academyName: "SportsPro Academy",
        email: "info@sportspro.com",
        phone: "+91 9876543210",
        address: "Chennai, India",
        currency: "INR",
        timezone: "Asia/Kolkata",
      });
    }

    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE settings
exports.updateSettings = async (req, res) => {
  try {
    const existing = await Setting.findOne();

    if (!existing) {
      const created = await Setting.create(req.body);
      return res.json(created);
    }

    existing.academyName = req.body.academyName;
    existing.email = req.body.email;
    existing.phone = req.body.phone;
    existing.address = req.body.address;
    existing.currency = req.body.currency;
    existing.timezone = req.body.timezone;

    const updated = await existing.save();

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};