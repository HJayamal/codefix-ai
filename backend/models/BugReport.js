const mongoose = require("mongoose");

const bugReportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    language: {
      type: String,
      required: true,
    },

    originalCode: {
      type: String,
      required: true,
    },

    errorMessage: {
      type: String,
    },

    bugType: {
      type: String,
    },

    bugLocation: {
      type: String,
    },

    explanation: {
      type: String,
    },

    fixedCode: {
      type: String,
    },

    preventionTip: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BugReport", bugReportSchema);