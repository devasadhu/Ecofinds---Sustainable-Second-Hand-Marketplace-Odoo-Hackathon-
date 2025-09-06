import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import purchaseRoutes from "./routes/purchaseRoutes.js";

import { errorHandler } from "./middleware/errorMiddleware.js";

// load .env and connect DB
dotenv.config();
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); // logging middleware

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/purchase", purchaseRoutes);

// --- quick root & health-check routes ---
app.get("/", (req, res) => {
  res.send("Ecofinds backend is running!");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running on port 5000" });
});

// error handler (keep after all other routes)
app.use(errorHandler);

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
