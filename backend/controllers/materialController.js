const Material = require("../models/Material");
const path = require("path");
const fs = require("fs");

// ================= GET ALL =================
exports.getMaterials = async (req, res) => {
  try {
    const { coachId } = req.query;
    const filter = coachId ? { coachId } : {};
    const data = await Material.find(filter).sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= CREATE =================
exports.createMaterial = async (req, res) => {
  try {
    const { title, type, coachId, coachName, duration, pages } = req.body;
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : "";
    const size = req.file
      ? `${(req.file.size / (1024 * 1024)).toFixed(1)} MB`
      : "";

    const material = await Material.create({
      title,
      type,
      coachId,
      coachName,
      fileUrl,
      size,
      duration: duration || "",
      pages: pages || "",
    });

    res.json(material);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= DELETE =================
exports.deleteMaterial = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);

    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }

    // ✅ delete the actual file from uploads folder
    if (material.fileUrl) {
      const filePath = path.join(__dirname, "..", material.fileUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Material.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};