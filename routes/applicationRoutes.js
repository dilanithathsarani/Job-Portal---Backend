const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  applyJob,
  getMyApplications,
  getJobApplicants,
  updateStatus
} = require("../controllers/applicationController");

router.post("/apply/:id", protect, applyJob);

router.get("/my-applications", protect, getMyApplications);

router.get("/job/:id", protect, getJobApplicants);

router.put("/status/:id", protect, updateStatus);

module.exports = router;
