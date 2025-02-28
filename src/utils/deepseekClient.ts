// src/utils/deepseekClient.ts
import OpenAI from "openai";

const deepseek = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY!,  // Asegúrate de definir esta variable en tu .env.local
});

export default deepseek;
