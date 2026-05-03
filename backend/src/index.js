import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import authRoutes from "./routes/auth.js";
import transferRoutes from "./routes/transfer.js";
import ratesRoutes from "./routes/rates.js";
import transactionsRoutes from "./routes/transactions.js";
import withdrawRoutes from "./routes/withdraw.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Logger simple
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Routes API DiasporaConnect
app.use("/api/auth", authRoutes);
app.use("/api/transfer", transferRoutes);
app.use("/api/rates", ratesRoutes);
app.use("/api/transactions", transactionsRoutes);
app.use("/api/withdraw", withdrawRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "DiasporaConnect API" });
});

app.listen(PORT, () => {
    console.log(`🚀 DiasporaConnect Backend running on http://localhost:${PORT}`);
});
