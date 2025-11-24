import { stripe } from "../utils/stripe.js";
import { createUser } from "../utils/userModel.js";

export async function registerUser(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Missing 'email' in body" });
    }

    const customer = await stripe.customers.create({
      email,
      metadata: {
        tigerUser: true
      }
    });

    const user = await createUser(email, customer.id);

    res.json({
      success: true,
      stripeCustomerId: customer.id,
      apiKey: user.apiKey
    });
  } catch (err) {
    console.error("Error in registerUser:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
}
