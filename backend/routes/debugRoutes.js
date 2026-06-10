const express = require("express");
const router = express.Router();

const {
  analyzeCode,
  getHistory,
  getReportById,
  getDashboardStats,
} = require("../controllers/debugController");

const { protect } = require("../middleware/authMiddleware");

router.post("/analyze", protect, analyzeCode);
router.get("/dashboard/stats", protect, getDashboardStats);
router.get("/history", protect, getHistory);
router.get("/history/:id", protect, getReportById);

module.exports = router;