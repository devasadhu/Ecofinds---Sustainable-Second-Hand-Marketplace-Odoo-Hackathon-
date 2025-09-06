// testDB.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // load MONGO_URI from .env

const testConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log("✅ MongoDB Connected!");
    process.exit(0);
  } catch (err) {
    console.error("❌ MongoDB Connection Failed");
    console.error(err);
    process.exit(1);
  }
};

testConnection();
