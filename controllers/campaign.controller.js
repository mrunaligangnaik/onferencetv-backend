const Campaign = require("../models/Campaign");

exports.getCampaigns = async (req, res) => {
  try {
    const { status, audience, search } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (audience) filter.audience = audience;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
      ];
    }

    const campaigns = await Campaign.find(filter).sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    res.json(campaign);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCampaign = async (req, res) => {
  try {
    const { name, subject, content, audience } = req.body;

    if (!name || !subject || !content || !audience) {
      return res.status(400).json({
        message: "name, subject, content, and audience are required.",
      });
    }

    const campaign = await Campaign.create(req.body);
    res.status(201).json(campaign);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    res.json(campaign);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.id);

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    res.json({ message: "Campaign deleted", id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};