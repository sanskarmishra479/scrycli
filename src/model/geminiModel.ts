import {GoogleGenAI} from '@google/genai';
import { systemPrompt as defaultSystemPrompt } from './systemPrompt.js';

type StreamGeminiParams = {
  prompt: string;
  apiKey: string;
  model?: string;
  systemPrompt?: string;
  onChunk: (text: string) => void;
};

export async function streamGemini({
  prompt,
  apiKey,
  model = 'gemini-2.0-flash',
  systemPrompt = defaultSystemPrompt,
  onChunk
}: StreamGeminiParams): Promise<void> {
  const ai = new GoogleGenAI({ apiKey });
  const tools = [{ googleSearch: {} }];
  const contents = [
    {
      role: 'user', 
      parts: [{ text: `${systemPrompt}\n\nUser: ${prompt}` }]
    }
  ];

  const response = await ai.models.generateContentStream({ 
    model, 
    config: { tools },
    contents 
  });
  
  for await (const chunk of response) {
    if (chunk.text) onChunk(chunk.text);
  }
}

