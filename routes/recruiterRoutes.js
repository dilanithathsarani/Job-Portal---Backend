const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getDashboard
} = require("../controllers/recruiterController");

// Recruiter Dashboard
router.get("/dashboard", protect, getDashboard);

module.exports = router;