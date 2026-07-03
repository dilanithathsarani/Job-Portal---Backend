const express = require("express");
const upload = require("../middleware/upload");
const { analyzeResume, interviewQuestions } = require("../controllers/aiController");

const router = express.Router();

router.post("/analyze-resume", upload.single("resume"), analyzeResume);
router.post("/interview", interviewQuestions);

module.exports = router;