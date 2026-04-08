import { RGBA, SyntaxStyle } from "@opentui/core";

/**
 * Theme for {@link markdown} and embedded fenced code (Tree-sitter scopes).
 * Tuned for dark chat background `#141414`.
 */
export const chatSyntaxStyle = SyntaxStyle.fromStyles({
  default: { fg: RGBA.fromHex("#d4d4d4") },
  keyword: { fg: RGBA.fromHex("#c792ea"), bold: true },
  string: { fg: RGBA.fromHex("#c3e88d") },
  comment: { fg: RGBA.fromHex("#6b7280"), italic: true },
  number: { fg: RGBA.fromHex("#f78c6c") },
  function: { fg: RGBA.fromHex("#82aaff") },
  type: { fg: RGBA.fromHex("#ffcb6b") },
  variable: { fg: RGBA.fromHex("#e0e0e0") },
  operator: { fg: RGBA.fromHex("#89ddff") },
  punctuation: { fg: RGBA.fromHex("#a6accd") },
  property: { fg: RGBA.fromHex("#bcd4fc") },
  namespace: { fg: RGBA.fromHex("#e0e0e0") },
  class: { fg: RGBA.fromHex("#ffcb6b") },
  parameter: { fg: RGBA.fromHex("#e0e0e0") },
});
