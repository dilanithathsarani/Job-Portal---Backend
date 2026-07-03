const express = require("express");
const upload = require("../middleware/upload");
const { analyzeResume, generateCoverLetter, interviewQuestions } = require("../controllers/aiController");

const router = express.Router();

router.post("/analyze-resume", upload.single("resume"), analyzeResume);
router.post("/interview", interviewQuestions);
router.post("/cover-letter", generateCoverLetter);

module.exports = router;