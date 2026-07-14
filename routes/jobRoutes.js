const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { createJob, getAllJobs, getJobById, getMyJobs, updateJob, deleteJob } = require("../controllers/jobController");

router.post("/create", protect, createJob);
router.get("/myjobs", getMyJobs);
router.get("/", getAllJobs);
router.get("/all", getAllJobs);
router.get("/getAllJobs", getAllJobs);
router.put("/:id", protect, updateJob);
router.delete("/:id", protect, deleteJob);
router.get("/:id", getJobById);


module.exports = router;
