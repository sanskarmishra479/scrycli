import { useState } from "react";
import { useToolExecutor } from "../hooks/useToolExecutor.js";
import { useChat } from "../hooks/useChat.js";
import { Text, useInput } from "ink";
import { Box } from "ink";
import AnswerDisplay from "./AnswerDisplay.js";
import PromptInput from "./PromptInput.js";
import CommandRouter from "./CommandRouter.js";
import type { CommandName } from "../types/cmdNameType.js";
import { getConfig } from "../config/configManage.js";

const InputBox = () => {
  const cwd = process.cwd();
  const config = getConfig();
  const [activeCmd, setActiveCmd] = useState<CommandName | null>(null);
  const { answer, finalAnswer, loading, error, send } = useChat();
  const toolResult = useToolExecutor(answer, loading);

  useInput((_input, key) => {
    if (key.escape) setActiveCmd(null);
  });

  if (activeCmd) {
    return <CommandRouter command={activeCmd} onBack={() => setActiveCmd(null)} />;
  }

  const handleSubmit = (val: string) => {
    if (val.startsWith("/")) { setActiveCmd(val as CommandName); return; }
    send(val);
  };

  return (
    <Box flexDirection="column">
      <AnswerDisplay loading={loading} error={error} answer={toolResult || finalAnswer} />
      <Text color="gray">{cwd}</Text>
      <PromptInput 
        onSubmit={handleSubmit} 
        placeholder="Ask anything about your codebase..." />
        <Box alignSelf="flex-end">
        <Text color='yellow'>{`Model: ${config?.model?.modelName ?? 'Not Selected'}`}</Text>
      </Box>
    </Box>
  );
};

export default InputBox;