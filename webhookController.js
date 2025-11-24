import { stripe } from "../utils/stripe.js";
import { updateUserStatus } from "../utils/userModel.js";

export async function stripeWebhook(req, res) {
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  const data = event.data.object;

  try {
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await updateUserStatus(
          data.customer,
          data.status === "active",
          data.items.data[0].price.id
        );
        break;
      case "customer.subscription.deleted":
        await updateUserStatus(data.customer, false, null);
        break;
      default:
        break;
    }

    res.sendStatus(200);
  } catch (err) {
    console.error("Error handling Stripe webhook:", err);
    res.status(500).send("Webhook handler error");
  }
}
