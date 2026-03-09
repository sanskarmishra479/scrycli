import { Box, Text } from "ink";
import TextInput from "ink-text-input";
import { useState } from "react";

const commands = [
    { cmd: "/session", desc: "Manage conversations" },
    { cmd: "/help", desc: "Show help" },
    { cmd: "/model", desc: "Select a model" },
    { cmd: "/apikey", desc: "Set API key" },
    { cmd: "/logout", desc: "Logout" },
    { cmd: "/report", desc: "Report a bug" },
    { cmd: "/exit", desc: "Exit" },
];

interface PromptInputProps {
    onSubmit: (value: string) => void;
    placeholder?: string;
}

const Input = ({ onSubmit, placeholder }: PromptInputProps) => {
    const [prompt, setPrompt] = useState("");

    const showSuggestions = prompt.startsWith("/");
    const filtered = showSuggestions
        ? commands.filter(c => c.cmd.startsWith(prompt.toLowerCase()))
        : [];

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
            {showSuggestions && filtered.length > 0 && (
                <Box flexDirection="column" backgroundColor="#141414"
                    borderStyle="bold"
                    borderColor="#BFD0E0"
                    borderTop={false}
                    borderBottom={false}
                    borderRight={false}
                    padding={1}>
                    {filtered.map(({ cmd, desc }) => (
                        <Text key={cmd} color="gray">
                            <Text bold color="white">{cmd}</Text> - {desc}
                        </Text>
                    ))}
                </Box>
            )}
        </>
    )

}
export default Input;