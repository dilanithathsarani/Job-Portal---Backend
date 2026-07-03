const pdf = require("pdf-parse");
const ai = require("../ai/gemini");

const interviewQuestions = async (req, res) => {

    try {

        const { jobTitle } = req.body;

        const prompt = `
Generate 10 interview questions for a ${jobTitle}.
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        res.json({
            success: true,
            result: response.text,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

const analyzeResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Resume is required",
            });
        }

        const data = await pdf(req.file.buffer);
        const resumeText = data.text;

        const prompt = `You are an ATS Resume Analyzer.Analyze this resume.Return your response in this exact format:ATS Score: xx/100Strengths:- ...Weaknesses:- ...Missing Skills:- ...Suggestions:- ...Resume:${resumeText}`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        res.json({
            success: true,
            analysis: response.text,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    analyzeResume,
    interviewQuestions,
};