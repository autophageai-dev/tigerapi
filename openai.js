import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  console.warn("WARNING: OPENAI_API_KEY is not set in .env");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default openai;
