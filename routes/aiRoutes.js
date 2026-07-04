const express = require("express");
const upload = require("../middleware/upload");
const { analyzeResume, generateCoverLetter, interviewQuestions, careerAdvisor } = require("../controllers/aiController");

const router = express.Router();

router.post("/analyze-resume", upload.single("resume"), analyzeResume);
router.post("/interview", interviewQuestions);
router.post("/cover-letter", generateCoverLetter);
router.post("/career-advisor", careerAdvisor);

module.exports = router;