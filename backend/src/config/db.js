import mongoose from "mongoose";

/**
 * Connect to MongoDB. Exits the process on failure so the app
 * never runs in a half-broken state (no DB = no point serving).
 */
export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("✖ MONGODB_URI is not set. Copy .env.example to .env and set it.");
    process.exit(1);
  }
  try {
    const conn = await mongoose.connect(uri);
    console.log(`✔ MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (err) {
    console.error(`✖ MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
};
