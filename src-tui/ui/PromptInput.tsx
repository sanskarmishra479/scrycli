import { TextAttributes } from "@opentui/core";
import { getConfig } from "../../src/core/configManage.js";
import type { Mode } from "../../src/types/modeType.js";
import { useEffect, useMemo, useRef, useState } from "react";
import { useKeyboard } from "@opentui/react";
import { SLASH_COMMANDS, type SlashCommand } from "../commands.js";
import SlashCommandPalette from "./SlashCommandPalette.js";

function isSlashToken(value: string): boolean {
  if (!value.startsWith("/")) return false;
  return !value.slice(1).includes(" ");
}

export type PromptInputProps = {
  onSubmit?: (value: string) => void;
  /** When true, Enter does not call `onSubmit` (e.g. while the agent is responding). */
  loading?: boolean;
};

export default function PromptInput({ onSubmit, loading = false }: PromptInputProps) {
  const cwd = process.cwd();
  const config = getConfig();
  const [mode, setMode] = useState<Mode>("Plan");
  const [value, setValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const showSlashPalette = isSlashToken(value);
  const filtered: readonly SlashCommand[] = useMemo(() => {
    if (!showSlashPalette) return [];
    const q = value.toLowerCase();
    return SLASH_COMMANDS.filter((c) => c.cmd.toLowerCase().startsWith(q));
  }, [value, showSlashPalette]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [value, filtered.length]);

  const stateRef = useRef({
    showSlashPalette,
    filtered,
    selectedIndex,
  });
  stateRef.current = { showSlashPalette, filtered, selectedIndex };

  useKeyboard((key) => {
    if (key.eventType === "release") return;

    const s = stateRef.current;

    if (key.name === "tab" && !s.showSlashPalette) {
      setMode((prev) => (prev === "Build" ? "Plan" : "Build"));
      key.stopPropagation();
      return;
    }

    if (s.showSlashPalette && s.filtered.length > 0) {
      if (key.name === "up") {
        key.stopPropagation();
        setSelectedIndex((i) => (i - 1 + s.filtered.length) % s.filtered.length);
        return;
      }
      if (key.name === "down") {
        key.stopPropagation();
        setSelectedIndex((i) => (i + 1) % s.filtered.length);
        return;
      }
      if (key.name === "return") {
        key.stopPropagation();
        const cmd = s.filtered[s.selectedIndex]?.cmd;
        if (cmd) {
          setValue(`${cmd} `);
        }
        return;
      }
    }

    if (s.showSlashPalette && key.name === "escape") {
      key.stopPropagation();
      setValue("");
    }
  });

  const commitPrompt = () => {
    if (loading) return;
    const trimmed = value.trim();
    if (trimmed === "") return;
    onSubmit?.(trimmed);
    setValue("");
  };

  return (
    <box flexDirection="column" padding={1}>
      {!showSlashPalette && (
        <text marginLeft={1} attributes={TextAttributes.DIM}>
          {cwd}
        </text>
      )}
      <box position="relative" width="100%">
        {showSlashPalette && (
          <box
            position="absolute"
            left={0}
            width="100%"
            zIndex={10}
            bottom="100%"
          >
            <SlashCommandPalette
              items={filtered}
              selectedIndex={Math.min(selectedIndex, Math.max(0, filtered.length - 1))}
            />
          </box>
        )}
        <box
          border={["left"]}
          borderStyle="heavy"
          borderColor={`${mode === "Plan" ? "#F3DE8A" : "#5c9cf5"}`}
          backgroundColor="#141414"
          width="100%"
          padding={1}
          flexDirection="column"
        >
          <input
            placeholder={
              loading ? "Waiting for response…" : "Type your message here..."
            }
            value={value}
            onInput={(next: string) => setValue(next)}
            onSubmit={commitPrompt}
            width="100%"
          />
          <box marginTop={1} flexDirection="row" justifyContent="space-between">
            <text fg={`${mode === "Plan" ? "#F3DE8A" : "#5c9cf5"}`}>{mode}</text>
            <text>{config?.model?.modelName ?? "Not Selected"}</text>
          </box>
        </box>
      </box>
    </box>
  );
}
