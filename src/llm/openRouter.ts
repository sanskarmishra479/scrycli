import { OpenRouter, stepCountIs } from '@openrouter/sdk';
import { getConfig } from '../core/configManage.js';
import { allTools } from "./tools.js";
import type { Message } from '../types/messageType.js';


export async function agentCall(messages: Message[], systemPromptText: string): Promise<string> {
  const config = getConfig();
  const client = new OpenRouter({
    apiKey: config?.openRouter?.apiKey,
  });

  const input = messages.map(m => ({
    type: "message" as const,
    role: m.role as "user" | "assistant",
    content: m.content,
  }));

  const result = client.callModel({
    model: config.model.modelName,
    instructions: systemPromptText,
    input,
    tools: allTools,
    stopWhen: stepCountIs(15),
  });
  const text = await result.getText();
  return text;
}