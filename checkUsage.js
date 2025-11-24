import { db } from "./firebase.js";
import { getPlanLimit } from "./planLimits.js";

export default async function checkUsage(req, res, next) {
  const user = req.user;

  if (!user.plan) {
    return res.status(402).json({ error: "User has no active plan" });
  }

  const limit = getPlanLimit(user.plan);
  const docRef = db.collection("users").doc(user.stripeCustomerId);
  const doc = await docRef.get();

  if (!doc.exists) {
    return res.status(500).json({ error: "User record not found in Firestore" });
  }

  const data = doc.data();
  let { tokensUsed, periodStart } = data.usage || { tokensUsed: 0, periodStart: 0 };

  const startOfCurrentMonth = new Date();
  startOfCurrentMonth.setDate(1);
  startOfCurrentMonth.setHours(0, 0, 0, 0);
  const monthStart = startOfCurrentMonth.getTime();

  if (periodStart < monthStart) {
    tokensUsed = 0;
    periodStart = monthStart;

    await docRef.update({
      usage: { tokensUsed, periodStart }
    });
  }

  if (tokensUsed >= limit) {
    return res.status(429).json({
      error: "Monthly token limit reached",
      tokensUsed,
      limit
    });
  }

  req.usage = { tokensUsed, limit };
  next();
}
