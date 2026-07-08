const express = require("express");
const router = express.Router();
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const { getProfile, updateUserRole } = require("../controllers/usetController");
const { updateProfile } = require("../controllers/profileController");
const multer = require("multer");

// basic multer setup - saves uploads to ./uploads
const upload = multer({ dest: "uploads/" });

// simple resume upload handler (replace with real implementation as needed)
const uploadResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    res.json({ success: true, file: req.file });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create User
router.post("/create", async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/profile", protect, getProfile);

router.put("/profile", protect, updateProfile);

router.post("/resume", protect, upload.single("resume"), uploadResume);

router.put("/:id/role", protect, authorizeRoles("admin"), updateUserRole);

module.exports = router;
