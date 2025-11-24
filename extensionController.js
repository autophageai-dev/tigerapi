import openai from "../utils/openai.js";
import { addUsedTokens } from "../utils/updateUsage.js";

export async function quickPrompt(req, res) {
  try {
    const { text, model } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Missing 'text' in body" });
    }

    const completion = await openai.chat.completions.create({
      model: model || "gpt-4.1-mini",
      messages: [{ role: "user", content: text }]
    });

    const output = completion.choices[0]?.message?.content ?? "";
    const tokens = completion.usage?.total_tokens ?? 0;

    await addUsedTokens(req.user.stripeCustomerId, tokens);

    res.json({
      success: true,
      output,
      tokens
    });
  } catch (err) {
    console.error("Error in quickPrompt:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
}
