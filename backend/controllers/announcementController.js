const Announcement = require("../models/Announcement");

// ================= GET =================
exports.getAnnouncements = async (req, res) => {
  try {
    const user = req.user;

    let filter = {};

    if (user?.role === "student") {
      filter = {
        $or: [
          { audience: "All" },
          { audience: "Students", batchId: user.batchId },
        ],
      };
    }

    if (user?.role === "coach") {
      filter = {
        $or: [
          { audience: "All" },
          { audience: "Students", batchId: user.batchId },
        ],
      };
    }

    const data = await Announcement.find(filter)
      .populate("createdBy", "name role")
      .sort({ createdAt: -1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= CREATE =================
exports.createAnnouncement = async (req, res) => {
  try {
    const { title, message, priority, audience, postedBy, postedRole } = req.body; // ✅ ADDED

    const user = req.user;

    let newAnnouncement = {
      title,
      message,
      priority,
      audience: audience || "All",
      postedBy: postedBy || "",       // ✅ ADDED
      postedRole: postedRole || "",   // ✅ ADDED
    };

    if (user) {
      newAnnouncement.createdBy = user._id;
      newAnnouncement.role = user.role;

      if (user.role === "coach") {
        newAnnouncement.audience = "Students";
        newAnnouncement.batchId = user.batchId;
      }
    }

    const item = await Announcement.create(newAnnouncement);

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= UPDATE =================
exports.updateAnnouncement = async (req, res) => {
  try {
    const updated = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= DELETE =================
exports.deleteAnnouncement = async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};