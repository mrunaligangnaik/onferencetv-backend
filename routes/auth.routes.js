const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getMe,
  updateProfile,
  updatePassword,
} = require("../controllers/auth.controller");

const requireAuth = require("../middleware/auth.middleware");

// ---- AUTH ----
router.post("/register", register);
router.post("/login", login);
router.get("/me", requireAuth, getMe);

// ---- PROFILE UPDATE (NEW) ----
router.put("/profile", requireAuth, updateProfile);

// ---- PASSWORD UPDATE (NEW) ----
router.put("/password", requireAuth, updatePassword);

module.exports = router;