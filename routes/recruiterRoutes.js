const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  getDashboard,
  getRecruiterProfile,
} = require("../controllers/recruiterController");

router.use(protect);
router.use(authorizeRoles("employer"));

// Recruiter Dashboard
router.get("/dashboard", getDashboard);

router.get("/profile", getRecruiterProfile);

module.exports = router;
