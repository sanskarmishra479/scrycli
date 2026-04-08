import { createSession, listSessions } from "../src/core/sessionManager.js";

/** Most recent session for cwd, or a new one (matches Ink `App` behavior). */
export function getOrCreateSessionId(): string {
  const cwd = process.cwd();
  const existing = listSessions(cwd);
  if (existing.length > 0) return existing[0]!.id;
  return createSession(cwd).id;
}
