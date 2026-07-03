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

module.exports = {
    interviewQuestions,
};