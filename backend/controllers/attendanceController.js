const Attendance = require("../models/Attendance");


// ================= GET ALL ATTENDANCE (ADMIN) =================
exports.getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate("student", "name profileImage email")
      .populate("batch", "name")
      .populate("coach", "name");

    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// ================= MARK ATTENDANCE (COACH) =================
exports.markAttendance = async (req, res) => {
  try {
    const { records, date } = req.body;
    const coachId = req.user.id;

    const attendanceRecords = [];

    for (let record of records) {

      // 🔥 Prevent duplicate entry for same student + date
      const existing = await Attendance.findOne({
        student: record.studentId,
        date: date,
      });

      if (existing) {
        // Update if already exists
        existing.status = record.status;
        existing.checkin =
          record.status === "Present"
            ? new Date().toLocaleTimeString()
            : "-";

        await existing.save();
      } else {
        attendanceRecords.push({
          student: record.studentId,
          batch: record.batchId,
          coach: coachId,
          status: record.status,
          date: date,
          checkin:
            record.status === "Present"
              ? new Date().toLocaleTimeString()
              : "-",
        });
      }
    }

    if (attendanceRecords.length > 0) {
      await Attendance.insertMany(attendanceRecords);
    }

    res.json({ message: "Attendance saved successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// ================= DELETE ATTENDANCE =================
exports.deleteAttendance = async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);
    res.json({ message: "Attendance deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};