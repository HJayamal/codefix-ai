const express = require("express");
const router = express.Router();

const {
  getProfile,
  updateProfile,
  updatePassword,
  deleteAccount,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.put("/password", protect, updatePassword);
router.delete("/account", protect, deleteAccount);

module.exports = router;