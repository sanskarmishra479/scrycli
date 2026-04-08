import type { CommandName } from "../src/types/cmdNameType.js";

export type SlashCommand = { cmd: CommandName; desc: string };

/** Slash commands for the OpenTUI prompt (kept in src-tui during Ink migration). */
export const SLASH_COMMANDS: readonly SlashCommand[] = [
  { cmd: "/session", desc: "Manage conversations" },
  { cmd: "/help", desc: "Show help" },
  { cmd: "/model", desc: "Select a model" },
  { cmd: "/apikey", desc: "Set API key" },
  { cmd: "/logout", desc: "Logout" },
  { cmd: "/report", desc: "Report a bug" },
  { cmd: "/exit", desc: "Exit" },
];
