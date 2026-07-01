const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const campaignRoutes = require("./routes/campaign.routes");
const aiRoutes = require("./routes/ai.routes");
const authRoutes = require("./routes/auth.routes");
const journeyRoutes = require("./routes/journey.routes");
const requireAuth = require("./middleware/auth.middleware");

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/campaigns", requireAuth, campaignRoutes);
app.use("/api/ai", requireAuth, aiRoutes);
app.use("/api/journeys", requireAuth, journeyRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message || "Internal server error" });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    app.listen(PORT, () => console.log(`Server running on port ${PORT} (no DB)`));
  });