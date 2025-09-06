import express from "express";
import { getCart, addToCart, removeFromCart, updateCartItem } from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getCart);
router.post("/", protect, addToCart);
router.patch("/:productId", protect, updateCartItem);
router.delete("/:productId", protect, removeFromCart);

export default router;
