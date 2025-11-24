import { getUserByApiKey } from "./userModel.js";

export default async function verifyUser(req, res, next) {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({ error: "Missing API key" });
  }

  const user = await getUserByApiKey(apiKey);

  if (!user) {
    return res.status(403).json({ error: "Invalid API key" });
  }

  if (!user.active) {
    return res.status(402).json({ error: "Subscription inactive" });
  }

  req.user = user;
  next();
}
