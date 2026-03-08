import { useState, useEffect } from "react";
import { agentCall } from "../llm/openRouter.js";
import { systemPrompt } from "../llm/systemPrompt.js";
import { loadSession, saveSession} from "../core/sessionManager.js";
import type { Session } from "../types/sessionTypes.js";
import type { Message } from "../types/messageType.js";

export function useChat(sessionId: string) {
  const [session, setSession] = useState<Session>(() => loadSession(sessionId));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setSession(loadSession(sessionId));
    setError("");
  }, [sessionId]);

  const send = async (userInput: string) => {
    setError("");
    setLoading(true);

    const userMsg: Message = { role: "user", content: userInput };
    const updatedMessages = [...session.messages, userMsg];

    try {
      const response = await agentCall(updatedMessages, systemPrompt);

      const assistantMsg: Message = { role: "assistant", content: response };
      const finalMessages = [...updatedMessages, assistantMsg];

      const updatedSession: Session = { ...session, messages: finalMessages };
      saveSession(updatedSession);
      setSession(updatedSession);
    } catch (e: any) {
      setError(e?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return { session, loading, error, send };
}