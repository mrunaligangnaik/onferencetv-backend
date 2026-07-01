const Journey = require("../models/Journey");

exports.getJourneys = async (req, res) => {
  try {
    const journeys = await Journey.find().sort({ createdAt: -1 });
    res.json(journeys);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getJourneyById = async (req, res) => {
  try {
    const journey = await Journey.findById(req.params.id);
    if (!journey) return res.status(404).json({ message: "Journey not found" });
    res.json(journey);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createJourney = async (req, res) => {
  try {
    const { name, trigger } = req.body;
    if (!name || !trigger) {
      return res.status(400).json({ message: "name and trigger are required." });
    }
    const journey = await Journey.create(req.body);
    res.status(201).json(journey);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateJourney = async (req, res) => {
  try {
    const journey = await Journey.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!journey) return res.status(404).json({ message: "Journey not found" });
    res.json(journey);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteJourney = async (req, res) => {
  try {
    const journey = await Journey.findByIdAndDelete(req.params.id);
    if (!journey) return res.status(404).json({ message: "Journey not found" });
    res.json({ message: "Journey deleted", id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};