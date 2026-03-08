import { useState } from "react";
import { useChat } from "../hooks/useChat.js";
import { Text, useInput, Static } from "ink";
import { Box } from "ink";
import Spinner from "ink-spinner";
import Input from "./Input.js";
import CommandRouter from "./CommandRouter.js";
import type { CommandName } from "../types/cmdNameType.js";
import { getConfig } from "../core/configManage.js";
import type { Message } from "../types/messageType.js";

interface InputBoxProps {
  sessionId: string;
  onSessionSelect: (id: string) => void;
}

const ChatMessage = ({ msg, id }: { msg: Message; id: string }) => {
  const isUser = msg.role === "user";
  return (
    <Box
      backgroundColor="#141414"
      borderStyle="bold"
      borderColor={isUser ? "#484848" : "#5c9cf5"}
      borderTop={false}
      borderBottom={false}
      borderRight={false}
      key={id}
      marginTop={1}
      padding={1}
      flexDirection="column"
    >
      <Text bold color={isUser ? "cyan" : "green"}>
        {isUser ? "> You" : "> SCRYCLI"}
      </Text>
      <Box paddingLeft={2}>
        <Text>{msg.content}</Text>
      </Box>
    </Box>
  );
};

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

  if (activeCmd) {
    return (
      <CommandRouter
        command={activeCmd}
        onBack={() => setActiveCmd(null)}
        onSessionSelect={onSessionSelect}
      />
    );
  }

  const staticMessages = session.messages.map((msg, i) => ({
    ...msg,
    _key: `${sessionId}-${i}`,
  }));

  return (
    <>
      <Static items={staticMessages}>
        {(msg) => <ChatMessage key={msg._key} id={msg._key} msg={msg} />}
      </Static>

      <Box flexDirection="column">
        {loading && (
          <Box marginTop={1}>
            <Box marginRight={1}><Spinner type="dots" /></Box>
            <Text color="gray">Thinking...</Text>
          </Box>
        )}

        {error && <Box marginTop={1}><Text color="red">Error: {error}</Text></Box>}

        <Box marginTop={1} flexDirection="column">
          <Text color="gray">{cwd}</Text>
          <Input onSubmit={handleSubmit} placeholder="Ask anything about your codebase..." />
          <Box alignSelf="flex-end">
            <Text color="yellow">{`Model: ${config?.model?.modelName ?? "Not Selected"}`}</Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default InputBox;