import { useState } from "react";
import { llmCall } from "../llm/openRouter.js";
import { systemPrompt } from "../llm/systemPrompt.js";

export function useChat() {
    const [answer, setAnswer] = useState("");
    const [finalAnswer, setFinalAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  
    const send = async (prompt: string) => {
      setAnswer("");
      setError("");
      setLoading(true);
      try {
        const response = await llmCall({
          prompt,
          systemPrompt: systemPrompt as string,
        });
        setAnswer(response);
        setFinalAnswer(response);
      } catch (e: any) {
        setError(e?.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };
    return { answer, finalAnswer, loading, error, send, setFinalAnswer };
  }