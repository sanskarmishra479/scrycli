import { Box, Text } from "ink";
import TextInput from "ink-text-input";
import { useState } from "react";
import Cmd from "./Cmd.js";

interface PromptInputProps {
    onSubmit: (value: string) => void;
    placeholder?: string;
}

const Input = ({ onSubmit, placeholder }: PromptInputProps) => {
    const [prompt, setPrompt] = useState("");

    return (
        <>
            <Box borderStyle="single" borderRight={false} borderLeft={false} borderColor="white" width="100%" paddingX={0} >
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
export default Input;