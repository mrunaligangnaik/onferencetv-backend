const express = require("express");
const router = express.Router();
const {
  getJourneys,
  getJourneyById,
  createJourney,
  updateJourney,
  deleteJourney,
} = require("../controllers/journey.controller");

router.get("/", getJourneys);
router.get("/:id", getJourneyById);
router.post("/", createJourney);
router.put("/:id", updateJourney);
router.delete("/:id", deleteJourney);

module.exports = router;