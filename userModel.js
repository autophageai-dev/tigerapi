import crypto from "crypto";
import { db } from "./firebase.js";

export async function createUser(email, stripeCustomerId) {
  const apiKey = crypto.randomBytes(32).toString("hex");

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const userData = {
    email,
    stripeCustomerId,
    apiKey,
    active: false,
    plan: null,
    usage: {
      tokensUsed: 0,
      periodStart: startOfMonth.getTime()
    },
    createdAt: Date.now()
  };

  await db.collection("users").doc(stripeCustomerId).set(userData);

  return userData;
}

export async function getUserByApiKey(apiKey) {
  const snapshot = await db
    .collection("users")
    .where("apiKey", "==", apiKey)
    .limit(1)
    .get();

  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
}

export async function updateUserStatus(stripeCustomerId, status, plan) {
  return db.collection("users").doc(stripeCustomerId).update({
    active: status,
    plan
  });
}
