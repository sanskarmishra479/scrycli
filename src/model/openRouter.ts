import { OpenRouter } from '@openrouter/sdk';
import { getFileTree } from '../tools/getFileTree.js';
import { getConfig } from '../config/configManage.js';

const fileTreeString = getFileTree(process.cwd()).join('\n');
const openRouterClient = new OpenRouter({
  apiKey: `${getConfig().openRouter.apiKey}`,
});

type llmCallParams = {
  prompt: string;
  systemPrompt: string;
};

export async function llmCall({
  prompt,
  systemPrompt,
}: llmCallParams): Promise<string> {
  const result = openRouterClient.callModel({
    model: `${getConfig().model.modelName}`,
    instructions: `${systemPrompt}`,
    input: `${prompt} \n\nFile Tree: ${fileTreeString}`,
  });
  const text = await result.getText();
  return text;
}
