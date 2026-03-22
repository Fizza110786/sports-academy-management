const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

mongoose.connect("mongodb://127.0.0.1:27017/sports-academy");

const seedUsers = async () => {
  try {
    // delete old users
    await User.deleteMany();

    const users = [];

    // Admin
    users.push({
      name: "Admin",
      email: "admin@sports.com",
      password: await bcrypt.hash("admin123", 10),
      role: "admin",
    });

    // Coaches
    for (let i = 1; i <= 5; i++) {
      users.push({
        name: `Coach ${i}`,
        email: `coach${i}@sports.com`,
        password: await bcrypt.hash("coach123", 10),
        role: "coach",
      });
    }

    // Students
    for (let i = 1; i <= 10; i++) {
      users.push({
        name: `Student ${i}`,
        email: `student${i}@sports.com`,
        password: await bcrypt.hash("student123", 10),
        role: "student",
      });
    }

    await User.insertMany(users);

    console.log("✅ Users inserted successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedUsers();
