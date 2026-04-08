import { TextAttributes } from "@opentui/core";

export default function Tip() {
    const dim = TextAttributes.DIM;
    const hi = "#e8e8e8";

    return (
        <box alignItems="center" justifyContent="center" width="100%" padding={1}>
            <box flexDirection="row" flexWrap="wrap">
                <text fg={"#F3DE8A"}>● Tip </text>
                <text attributes={dim}>Press </text>
                <text fg={hi}>Tab</text>
                <text attributes={dim}> to toggle agents and Press </text>
                <text fg={hi}>/</text>
                <text attributes={dim}> to see all commands</text>
            </box>
        </box>
    );
}