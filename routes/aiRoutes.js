const express = require("express");
const upload = require("../middleware/upload");
const protect = require("../middleware/authMiddleware");
const { analyzeResume, generateCoverLetter, interviewQuestions, careerAdvisor, recommendJobs } = require("../controllers/aiController");

const router = express.Router();

router.post("/analyze-resume", upload.single("resume"), analyzeResume);
router.post("/interview", interviewQuestions);
router.post("/cover-letter", generateCoverLetter);
router.post("/career-advisor", careerAdvisor);
router.get("/recommendations", protect, recommendJobs);

module.exports = router;