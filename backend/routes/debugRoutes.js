const express = require("express");
const router = express.Router();

const {
  analyzeCode,
  getHistory,
} = require("../controllers/debugController");

const { protect } = require("../middleware/authMiddleware");

router.post("/analyze", protect, analyzeCode);
router.get("/history", protect, getHistory);

module.exports = router;