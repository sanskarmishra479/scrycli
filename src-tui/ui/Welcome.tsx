import { TextAttributes } from "@opentui/core";
import React from "react";

function Welcome() {
    return (
        <box alignItems="center" flexGrow={1} padding={1}>
            <ascii-font font="block" text="scrycli" color="#EEE5E9" />
            <text attributes={TextAttributes.DIM} marginTop={1}>speak. build. ship.</text>
        </box>
    )
}

export default Welcome;