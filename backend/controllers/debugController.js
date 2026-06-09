const { GoogleGenAI } = require("@google/genai");
const BugReport = require("../models/BugReport");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

exports.analyzeCode = async (req, res) => {
  try {
    const { language, code, errorMessage } = req.body;

    if (!language || !code) {
      return res.status(400).json({
        message: "Language and code are required",
      });
    }

    const prompt = `
You are an expert programming tutor and debugging assistant.

Analyze the following code and identify the bug.

Language:
${language}

Code:
${code}

Error message:
${errorMessage || "No error message provided"}

Return ONLY valid JSON in this exact format:
{
  "bugType": "",
  "bugLocation": "",
  "explanation": "",
  "fixedCode": "",
  "preventionTip": ""
}

Rules:
- Do not include markdown.
- Do not include extra text outside JSON.
- Explanation must be simple for beginners.
- Fixed code must be complete and corrected.
- If there is no clear bug, say that the code looks correct and suggest improvements.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let aiText = response.text;

    aiText = aiText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let result;

    try {
      result = JSON.parse(aiText);
    } catch (parseError) {
      return res.status(500).json({
        message: "AI response format error",
        rawResponse: aiText,
      });
    }

    const bugReport = await BugReport.create({
      userId: req.user._id,
      language,
      originalCode: code,
      errorMessage,
      bugType: result.bugType,
      bugLocation: result.bugLocation,
      explanation: result.explanation,
      fixedCode: result.fixedCode,
      preventionTip: result.preventionTip,
    });

    res.json({
      message: "Code analyzed successfully",
      result,
      bugReport,
    });
  } catch (error) {
    res.status(500).json({
      message: "Code analysis failed",
      error: error.message,
    });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const history = await BugReport.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(history);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get history",
      error: error.message,
    });
  }
};