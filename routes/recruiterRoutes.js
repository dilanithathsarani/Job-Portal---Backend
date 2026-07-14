const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  getDashboard,
  getRecruiterProfile,
  updateRecruiterProfile
} = require("../controllers/recruiterController");

router.use(protect);
router.use(authorizeRoles("recruiter"));

// Recruiter Dashboard
router.get("/dashboard", getDashboard);

router.get("/profile", getRecruiterProfile);

router.put("/profile", updateRecruiterProfile);

module.exports = router;
