import { stripe } from "../utils/stripe.js";

export async function createCheckout(req, res) {
  try {
    const { stripeCustomerId, priceId } = req.body;

    if (!stripeCustomerId || !priceId) {
      return res.status(400).json({ error: "Missing 'stripeCustomerId' or 'priceId' in body" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: stripeCustomerId,
      success_url: "https://tiger.tools/success",
      cancel_url: "https://tiger.tools/cancel",
      line_items: [{ price: priceId, quantity: 1 }]
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Error in createCheckout:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
}
