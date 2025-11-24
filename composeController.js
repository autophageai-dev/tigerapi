import runTigerFlow from "../utils/tigerFlow.js";
import { addUsedTokens } from "../utils/updateUsage.js";

export async function runFlow(req, res) {
  try {
    const { flow, input } = req.body;

    if (!flow || !Array.isArray(flow.steps)) {
      return res.status(400).json({
        error: "Invalid 'flow' definition. Expected { steps: [...] }"
      });
    }

    const result = await runTigerFlow(flow, input);

    await addUsedTokens(req.user.stripeCustomerId, result.totalTokens || 0);

    res.json({
      success: true,
      result
    });
  } catch (err) {
    console.error("Error in runFlow:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
}
