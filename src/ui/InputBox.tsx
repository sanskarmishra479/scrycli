import { useState } from "react";
import { useChat } from "../hooks/useChat.js";
import { Text, useInput } from "ink";
import { Box } from "ink";
import Spinner from "ink-spinner";
import Input from "./Input.js";
import CommandRouter from "./CommandRouter.js";
import type { CommandName } from "../types/cmdNameType.js";
import { getConfig } from "../core/configManage.js";

interface InputBoxProps {
  sessionId: string;
  onSessionSelect: (id: string) => void;
}

const InputBox = ({ sessionId, onSessionSelect }: InputBoxProps) => {
  const cwd = process.cwd();
  const config = getConfig();
  const [activeCmd, setActiveCmd] = useState<CommandName | null>(null);
  const { session, loading, error, send } = useChat(sessionId);

  useInput((_input, key) => {
    if (key.escape) setActiveCmd(null);
  });

  const handleSubmit = (val: string) => {
    if (val.startsWith("/")) { setActiveCmd(val as CommandName); return; }
    send(val);
  };

  return (
    <Box flexDirection="column">
      {activeCmd ? (
        <CommandRouter
          command={activeCmd}
          onBack={() => setActiveCmd(null)}
          onSessionSelect={onSessionSelect}
        />
      ) : (
        <>
          {session.messages.map((msg, i) => (
            <Box key={i} marginTop={1} flexDirection="column">
              <Text bold color={msg.role === "user" ? "cyan" : "green"}>
                {msg.role === "user" ? "> You" : "> SCRYCLI"}
              </Text>
              <Box paddingLeft={2}>
                <Text>{msg.content}</Text>
              </Box>
            </Box>
          ))}

          {loading && (
            <Box marginTop={1}>
              <Box marginRight={1}><Spinner type="dots" /></Box>
              <Text color="gray">Working...</Text>
            </Box>
          )}

          {error && <Box marginTop={1}><Text color="red">Error: {error}</Text></Box>}

          <Text color="gray">{cwd}</Text>
          <Input onSubmit={handleSubmit} placeholder="Ask anything about your codebase..." />
          <Box alignSelf="flex-end">
            <Text color="yellow">{`Model: ${config?.model?.modelName ?? "Not Selected"}`}</Text>
          </Box>
        </>
      )}
    </Box>
  );
};

export default InputBox;