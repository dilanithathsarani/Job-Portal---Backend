const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { createJob, getAllJobs, getJobById } = require("../controllers/jobController");

router.post("/create", protect, createJob);

// Main list route
router.get("/", getAllJobs);
// Aliases to support clients using different endpoints
router.get("/all", getAllJobs);
router.get("/getAllJobs", getAllJobs);
router.get("/:id", getJobById);

module.exports = router;
