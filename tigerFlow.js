import openai from "./openai.js";

/**
 * flowDefinition example:
 * {
 *   steps: [
 *     {
 *       id: "normalize",
 *       type: "prompt",
 *       model: "gpt-4.1-mini",
 *       template: "Normalize this text:\n\n{{input}}"
 *     },
 *     {
 *       id: "expand",
 *       type: "prompt",
 *       model: "gpt-4.1-mini",
 *       template: "Expand this into a detailed outline:\n\n{{input}}"
 *     }
 *   ]
 * }
 */

export default async function runTigerFlow(flowDefinition, initialInput) {
  let context = initialInput;
  const trace = [];
  let totalTokens = 0;

  for (const step of flowDefinition.steps) {
    if (step.type === "prompt") {
      const { output, tokens } = await runPromptStep(step, context);
      context = output;
      totalTokens += tokens;
      trace.push({ id: step.id, type: step.type, output });
    } else if (step.type === "image") {
      const imageResult = await runImageStep(step, context);
      trace.push({ id: step.id, type: step.type, output: imageResult });
      context = imageResult;
    } else {
      trace.push({ id: step.id, type: step.type, skipped: true });
    }
  }

  return { final: context, trace, totalTokens };
}

async function runPromptStep(step, input) {
  const template = step.template || "{{input}}";
  const model = step.model || "gpt-4.1-mini";

  const prompt = template.replace(/{{\s*input\s*}}/g, String(input ?? ""));

  const completion = await openai.chat.completions.create({
    model,
    messages: [{ role: "user", content: prompt }]
  });

  return {
    output: completion.choices[0]?.message?.content ?? "",
    tokens: completion.usage?.total_tokens ?? 0
  };
}

async function runImageStep(step, input) {
  // Stub for image generation - integrate with OpenAI or other providers later
  return {
    info: "Image step executed (stub)",
    promptBase: step.prompt || "",
    input
  };
}
