const User = require("../models/User");
const Batch = require("../models/Batch");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

// ================= GET =================
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate("batch")
      .sort({ batch: 1, name: 1 }); // ✅ sort by batch first, then name within each batch
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= CREATE =================
exports.createUser = async (req, res) => {
  try {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    const userData = { ...req.body, profileImage: imagePath };

    if (userData.password) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
    }

    const user = await User.create(userData);

    if (user.role === "student" && user.batch) {
      await Batch.findByIdAndUpdate(user.batch, {
        $push: { students: user._id },
      });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= UPDATE =================
exports.updateUser = async (req, res) => {
  try {
    const existingUser = await User.findById(req.params.id);

    const updateData = { ...req.body };

    if (req.file) {
      updateData.profileImage = `/uploads/${req.file.filename}`;
    }

    if (updateData.password && updateData.password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    } else {
      delete updateData.password;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (existingUser.role === "student") {
      if (existingUser.batch) {
        await Batch.findByIdAndUpdate(existingUser.batch, {
          $pull: { students: existingUser._id },
        });
      }

      if (updatedUser.batch) {
        await Batch.findByIdAndUpdate(updatedUser.batch, {
          $push: { students: updatedUser._id },
        });
      }
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= DELETE =================
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "student" && user.batch) {
      await Batch.findByIdAndUpdate(user.batch, {
        $pull: { students: user._id },
      });
    }

    if (user.profileImage) {
      const imagePath = path.join(
        __dirname,
        "..",
        user.profileImage
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};