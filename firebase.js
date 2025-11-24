import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const serviceAccountPath = path.resolve(__dirname, "..", "serviceAccount.json");

if (!fs.existsSync(serviceAccountPath)) {
  console.error("❌ Missing serviceAccount.json file in project root");
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath)
  });
}

export const db = admin.firestore();
