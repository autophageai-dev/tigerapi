import express from "express";
import { stripeWebhook } from "../controllers/webhookController.js";

const router = express.Router();

// Stripe requires raw body; express.json is skipped in server.js for this route
router.post("/stripe", express.raw({ type: "application/json" }), stripeWebhook);

export default router;
