const express = require("express");
const router = express.Router();
const { generateEmail } = require("../controllers/ai.controller");

router.post("/generate-email", generateEmail);

module.exports = router;