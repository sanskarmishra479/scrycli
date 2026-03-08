import { OpenRouter, stepCountIs } from '@openrouter/sdk';
import { getFileTree } from '../tools/getFileTree.js';
import { getConfig } from '../core/configManage.js';
import { allTools } from "./tools.js";

const fileTreeString = getFileTree(process.cwd()).join('\n');


export async function agentCall(input: string, systemPromptText: string): Promise<string> {
  const config = getConfig();
  const client = new OpenRouter({
    apiKey: config?.openRouter?.apiKey,
  });

  const result = client.callModel({
    model: config.model.modelName,
    instructions: systemPromptText,
    input: input,
    tools: allTools,
    stopWhen: stepCountIs(15),
  });
  const text = await result.getText();
  return text;
}