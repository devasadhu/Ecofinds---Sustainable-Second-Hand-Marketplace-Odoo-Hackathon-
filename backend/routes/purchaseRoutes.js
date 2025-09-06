import express from "express";
import { getPurchases, addPurchase, getTransactionById } from "../controllers/purchaseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getPurchases);
router.post("/", protect, addPurchase);
router.get("/:transactionId", protect, getTransactionById);

export default router;
