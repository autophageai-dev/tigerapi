import openai from "../utils/openai.js";
import { addUsedTokens } from "../utils/updateUsage.js";

export async function runPrompt(req, res) {
  try {
    const { prompt, model, system } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Missing 'prompt' in body" });
    }

    const messages = [];
    if (system) {
      messages.push({ role: "system", content: system });
    }
    messages.push({ role: "user", content: prompt });

    const completion = await openai.chat.completions.create({
      model: model || "gpt-4.1-mini",
      messages
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
    console.error("Error in runPrompt:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
}
