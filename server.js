import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import promptsRoutes from "./routes/prompts.js";
import composeRoutes from "./routes/compose.js";
import extensionRoutes from "./routes/extension.js";
import systemRoutes from "./routes/system.js";
import authRoutes from "./routes/auth.js";
import billingRoutes from "./routes/billing.js";
import webhookRoutes from "./routes/webhooks.js";

dotenv.config();

const app = express();

// CORS for web apps + extensions
app.use(cors());

// Body parsing, but skip JSON parsing for Stripe webhooks (they need raw body)
app.use((req, res, next) => {
  if (req.originalUrl.startsWith("/webhooks/stripe")) {
    return next();
  }
  express.json()(req, res, next);
});

// Routes
app.use("/auth", authRoutes);
app.use("/billing", billingRoutes);
app.use("/prompts", promptsRoutes);
app.use("/compose", composeRoutes);
app.use("/extension", extensionRoutes);
app.use("/system", systemRoutes);
app.use("/webhooks", webhookRoutes);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🐅 Tiger API v3 running at http://localhost:${PORT}`);
});
