import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Initialize the OpenRouter provider
const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const config = {
  runtime: 'edge', // This makes streaming near-instant
};

export default async function handler(req) {
  const { model, messages } = await req.json();

  const result = await streamText({
    model: openrouter(model || 'openrouter/auto'),
    messages: messages,
    headers: {
      "HTTP-Referer": process.env.VERCEL_URL || "http://localhost:3000",
      "X-Title": "Stealth Pro Secure",
    },
  });

  // Returns the specialized stream format that the AI SDK uses
  return result.toDataStreamResponse();
}
