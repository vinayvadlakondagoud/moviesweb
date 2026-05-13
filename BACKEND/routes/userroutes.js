import express from "express";
import bcrypt from "bcryptjs";
import Otp from "../models/Otp.js";
import User from "../models/User.js";
import { loginUser } from "../controllers/userController.js";


const router = express.Router();


// 🔹 REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


import jwt from "jsonwebtoken";

// 🔹 LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔴 ADMIN LOGIN
    if (email === "vinayadmin@gmail.com" && password === "admin123") {
      const token = jwt.sign(
        { id: "admin123", role: "admin" },
        "SECRET_KEY",
        { expiresIn: "7d" }
      );

      return res.json({
        name: "Admin",
        email,
        role: "admin",
        _id: "admin123",
        token, // ✅ ADD THIS
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // 🔥 TOKEN FOR USER
    const token = jwt.sign(
      { id: user._id, role: "user" },
      "SECRET_KEY",
      { expiresIn: "7d" }
    );

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: "user",
      token, // ✅ ADD THIS
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 👤 GET USER PROFILE
router.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✏️ UPDATE PROFILE
router.put("/profile/:id", async (req, res) => {
  try {
    const { profilePic } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔥 FORCE UPDATE
    user.profilePic = profilePic;

    await user.save();

    // 🔥 RETURN UPDATED USER
    const updatedUser = await User.findById(req.params.id);

    res.json(updatedUser);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

import otpGenerator from "otp-generator";
import { sendOtpEmail } from "../utils/sendOtp.js";

router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    // 🔥 CHECK USER EXISTS FIRST
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists. Please Register With Other Email.",
      });
    }

    const otp = otpGenerator.generate(6, {
      digits: true,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    await Otp.deleteMany({ email });

    await Otp.create({
      email,
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    await sendOtpEmail(email, otp);

    res.json({ message: "OTP sent successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/verify-otp", async (req, res) => {
  try {
    const { name, email, password, otp } = req.body;

    const otpRecord = await Otp.findOne({ email });

    if (!otpRecord) {
      return res.status(400).json({ message: "OTP not found" });
    }

    if (otpRecord.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (otpRecord.expiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    await Otp.deleteMany({ email });

    res.json({
      message: "Registration successful",
      user,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// 🔐 LOGIN ROUTE
router.post("/login", loginUser);

export default router;