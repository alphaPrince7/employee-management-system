import express from "express";
import cors from "cors";
import employeeRoutes from "./routes/employeeRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();

// --- Core middleware ---
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*" }));
app.use(express.json());

// --- Health check ---
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "EMS API is running" });
});

// --- Routes ---
app.use("/api/employees", employeeRoutes);

// --- Error handling (must be last) ---
app.use(notFound);
app.use(errorHandler);

export default app;
