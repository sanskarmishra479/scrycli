import { Box, Text } from "ink";
import TextInput from "ink-text-input";
import { useState } from "react";
import Cmd from "./Commands/Cmd.js";

interface PromptInputProps {
    onSubmit: (value: string) => void;
    placeholder?: string;
}

const PromptInput = ({ onSubmit, placeholder }: PromptInputProps) => {
    const [prompt, setPrompt] = useState("");

    return (
        <>
            <Box borderStyle="single" borderColor="white" width="100%" paddingX={0} >
                <Box marginRight={1}><Text color="white">{`>`}</Text></Box>
                <TextInput
                    value={prompt}
                    onChange={setPrompt}
                    onSubmit={(val) => { onSubmit(val); setPrompt(""); }}
                    placeholder={placeholder || ""} />
            </Box>
            {prompt.startsWith("/") && <Cmd />}
        </>
    )

}
export default PromptInput;