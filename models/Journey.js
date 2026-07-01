const mongoose = require("mongoose");

const journeySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    trigger: {
      type: String,
      required: true,
      enum: ["User Registered", "Subscription Purchased", "Webinar Registered", "Video Completed"],
    },
    action: {
      type: String,
      default: "Send Welcome Email",
    },
    condition: {
      type: String,
      default: "Email Opened?",
    },
    yesOutcome: {
      type: String,
      default: "Send Getting Started Email",
    },
    noOutcome: {
      type: String,
      default: "Send Reminder Email",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Journey", journeySchema);