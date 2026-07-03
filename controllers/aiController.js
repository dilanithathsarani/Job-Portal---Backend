const { PDFParse } = require("pdf-parse");
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

        const parser = new PDFParse({ data: req.file.buffer });
        let data;

        try {
            data = await parser.getText();
        } finally {
            await parser.destroy();
        }

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

const generateCoverLetter = async (req, res) => {
    try {
        const {
            company,
            position,
            skills,
            experience,
        } = req.body;

        if (
            !company ||
            !position ||
            !skills ||
            !experience
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const prompt = `You are a professional HR specialist.Write a professional cover letter.Candidate Skills:${skills}Experience:${experience}Company:${company}Position:${position}Instructions:- Keep it professional.- Keep it around 300 words.- Mention candidate strengths.- Mention enthusiasm.- End politely.Only return the cover letter.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        res.json({
            success: true,
            coverLetter: response.text,
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
    generateCoverLetter,
    interviewQuestions,
};