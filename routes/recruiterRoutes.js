const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getDashboard,
    getRecruiterProfile
} = require("../controllers/recruiterController");

// Recruiter Dashboard
router.get("/dashboard", protect, getDashboard);

router.get(
    "/profile",
    protect,
    getRecruiterProfile
);

module.exports = router;