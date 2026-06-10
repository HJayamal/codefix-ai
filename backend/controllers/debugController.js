const { GoogleGenAI } = require("@google/genai");
const BugReport = require("../models/BugReport");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalReports = await BugReport.countDocuments({ userId });

    const recentReports = await BugReport.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5);

    const languageStats = await BugReport.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: "$language",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    const bugTypeStats = await BugReport.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: "$bugType",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    const topLanguage = languageStats.length > 0 ? languageStats[0]._id : "N/A";
    const criticalIssue = bugTypeStats.length > 0 ? bugTypeStats[0]._id : "N/A";
    const lastAnalysis = recentReports.length > 0 ? recentReports[0].createdAt : null;

    res.json({
      totalReports,
      topLanguage,
      criticalIssue,
      lastAnalysis,
      languageStats,
      bugTypeStats,
      recentReports,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get dashboard stats",
      error: error.message,
    });
  }
};

exports.getReportById = async (req, res) => {
  try {
    const report = await BugReport.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    res.json(report);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get report",
      error: error.message,
    });
  }
};

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