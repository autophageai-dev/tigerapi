import { db } from "./firebase.js";

export async function addUsedTokens(stripeCustomerId, tokens) {
  if (!tokens || tokens <= 0) return;

  const ref = db.collection("users").doc(stripeCustomerId);
  const doc = await ref.get();

  if (!doc.exists) return;

  const data = doc.data();
  const current = (data.usage && data.usage.tokensUsed) || 0;
  const newTotal = current + tokens;

  await ref.update({
    "usage.tokensUsed": newTotal
  });

  return newTotal;
}
