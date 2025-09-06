// routes/userRoutes.js
import express from "express";
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/users/profile  -> return the current user's profile
router.get("/profile", protect, getUserProfile);

// PUT /api/users/profile -> update the current user's profile
router.put("/profile", protect, updateUserProfile);

// (optional) add a quick test endpoint so you can confirm the route works
// Remove or comment this out later in production
router.get("/", (req, res) => {
  res.json({ message: "Users route is alive. Use /profile with a valid token." });
});

export default router;
