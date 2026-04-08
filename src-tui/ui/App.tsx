import { useState } from "react";
import { useChat } from "../../src/hooks/useChat.js";
import Tip from "./Tip";
import ChatView from "./ChatView";
import PromptInput from "./PromptInput";
import { getOrCreateSessionId } from "../session.js";

function App() {
  const [sessionId] = useState(() => getOrCreateSessionId());
  const { session, loading, error, send } = useChat(sessionId);

  const handlePromptSubmit = (text: string) => {
    if (text.startsWith("/")) {
      return;
    }
    void send(text);
  };

  return (
    <box backgroundColor="#000000" flexDirection="column" flexGrow={1} height="100%">
      <ChatView session={session} loading={loading} error={error} />
      <Tip />
      <PromptInput onSubmit={handlePromptSubmit} loading={loading} />
    </box>
  );
}

export default App;
