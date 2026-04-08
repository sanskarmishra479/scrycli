import { TextAttributes } from "@opentui/core";
import type { Message } from "../../src/types/messageType.js";
import type { Session } from "../../src/types/sessionTypes.js";
import { chatSyntaxStyle } from "./chatSyntaxStyle.js";

export type ChatViewProps = {
  session: Session;
  loading: boolean;
  error: string;
};

function ChatMessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <box
      marginTop={1}
      padding={1}
      width="100%"
      flexDirection="column"
      backgroundColor="#141414"
      borderStyle="heavy"
      borderColor={isUser ? "#5DFDCB" : "#5c9cf5"}
      border={["left"]}
    >
      <box width="100%">
        {isUser ? (
          <text>{msg.content}</text>
        ) : (
          <markdown
            content={msg.content}
            syntaxStyle={chatSyntaxStyle}
            width="100%"
            fg="#d4d4d4"
            bg="#141414"
            conceal
            concealCode={false}
          />
        )}
      </box>
    </box>
  );
}

export default function ChatView({ session, loading, error }: ChatViewProps) {
  const messages = session.messages;

  return (
    <scrollbox
      width="100%"
      height="50%"
      flexGrow={1}
      padding={1}
      stickyScroll
      stickyStart="bottom"
      scrollY
    >
      <box flexDirection="column" width="100%">
        {messages.length === 0 && !loading && (
          <text attributes={TextAttributes.DIM}>No messages yet. Ask something about your codebase.</text>
        )}
        {messages.map((msg, i) => (
          <ChatMessageBubble key={`${session.id}-${i}`} msg={msg} />
        ))}
        {loading && (
          <box marginTop={1} flexDirection="row">
            <text attributes={TextAttributes.DIM}>Thinking…</text>
          </box>
        )}
        {error !== "" && (
          <box
            marginTop={1}
            padding={1}
            backgroundColor="#141414"
            borderStyle="heavy"
            borderColor="#ff6b6b"
            border={["left"]}
          >
            <text fg="#ff6b6b">Error: {error}</text>
          </box>
        )}
      </box>
    </scrollbox>
  );
}
