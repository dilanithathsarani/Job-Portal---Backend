const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  searchJobs
} = require("../controllers/jobController");

router.post("/create", protect, createJob);

router.get("/", getAllJobs);

router.get("/search", searchJobs);

router.get("/:id", getJobById);

router.put("/:id", protect, updateJob);

router.delete("/:id", protect, deleteJob);



module.exports = router;
