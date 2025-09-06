import express from "express";
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, createProduct);
router.route("/:id").get(getProductById).put(protect, updateProduct).delete(protect, deleteProduct);

export default router;
