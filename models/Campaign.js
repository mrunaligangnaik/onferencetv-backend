const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    objective: {
      type: String,
      default: "",
    },
    subject: {
      type: String,
      required: true,
    },
    preview: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      required: true,
    },
    ctaText: {
      type: String,
      default: "",
    },
    ctaUrl: {
      type: String,
      default: "",
    },
    audience: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Campaign", campaignSchema);