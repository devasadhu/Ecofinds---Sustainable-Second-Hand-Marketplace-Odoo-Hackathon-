// routes/authRoutes.js
import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// POST /api/auth/register  -> create a new user
router.post("/register", registerUser);

// POST /api/auth/login -> login and return a token
router.post("/login", loginUser);

// optional quick test so you can confirm this router is mounted
router.get("/", (req, res) => {
  res.json({ message: "Auth route is alive. Use POST /register or /login." });
});

export default router;
