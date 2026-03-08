import type { Message } from "./messageType.js";

export interface Session {
  id: string;
  title: string;
  cwd: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
}

export interface SessionIndexEntry {
  id: string;
  title: string;
  cwd: string;
  updatedAt: string;
  messageCount: number;
}

export interface SessionIndex {
  sessions: SessionIndexEntry[];
}