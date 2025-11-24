import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn("WARNING: STRIPE_SECRET_KEY is not set in .env");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
