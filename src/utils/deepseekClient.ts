// src/utils/deepseekClient.ts
import OpenAI from "openai";

const deepseek = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY!,  
});

export default deepseek;
