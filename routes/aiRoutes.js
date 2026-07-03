const express = require("express");
const { interviewQuestions } = require("../controllers/aiController");

const router = express.Router();

router.post("/interview", interviewQuestions);

module.exports = router;