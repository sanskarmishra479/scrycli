import { TextAttributes } from "@opentui/core";
import type { SlashCommand } from "../commands.js";

export type SlashCommandPaletteProps = {
  items: readonly SlashCommand[];
  selectedIndex: number;
  emptyMessage?: string;
};

/**
 * Renders slash-command suggestions in a bordered panel (position absolute + zIndex is applied by parent).
 */
export default function SlashCommandPalette({
  items,
  selectedIndex,
  emptyMessage = "No matching commands",
}: SlashCommandPaletteProps) {
  return (
    <box
      flexDirection="column"
      padding={1}
      backgroundColor="#141414"
      borderStyle="heavy"
      borderColor="#5E4955"
      border={["left"]}
    >
      {items.length === 0 ? (
        <text attributes={TextAttributes.DIM}>{emptyMessage}</text>
      ) : (
        items.map((item, i) => {
          const selected = i === selectedIndex;
          return (
            <box key={item.cmd} flexDirection="row">
              <text
                attributes={
                  selected
                    ? TextAttributes.BOLD | TextAttributes.INVERSE
                    : TextAttributes.NONE
                }
                fg={selected ? "#ffffff" : "#BFD0E0"}
              >
                {item.cmd}
              </text>
              <text attributes={TextAttributes.DIM}>{" — "}</text>
              <text attributes={selected ? TextAttributes.INVERSE : TextAttributes.DIM}>
                {item.desc}
              </text>
            </box>
          );
        })
      )}
    </box>
  );
}
