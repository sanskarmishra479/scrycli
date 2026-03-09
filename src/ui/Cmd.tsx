
import { Box, Text } from "ink";

const commands = [
    { cmd: "/session", desc: "Select a session" },
    { cmd: "/help", desc: "Show help" },
    { cmd: "/model", desc: "Select a model" },
    { cmd: "/apikey", desc: "Set API key" },
    { cmd: "/logout", desc: "Logout" },
    { cmd: "/Report", desc: "Report a bug" },
    { cmd: "/exit", desc: "Exit" }
];

const Cmd = () => (
    <Box gap={1}>
        <Box flexDirection="column" borderStyle="bold"
            borderColor="#BFD0E0"
            borderTop={false}
            borderBottom={false}
            borderRight={false}
            padding={1} width="100%">
            {commands.map(({ cmd, desc }) => (
                <Text color="gray" key={cmd}>
                    <Text bold color="white">{cmd}</Text> - {desc}
                </Text>
            ))}
        </Box>
    </Box>
);

export default Cmd;