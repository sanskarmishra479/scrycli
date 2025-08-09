import { Box, Text } from "ink";

const Cmd = () =>{
    return(
        <Box gap={1} >
            <Box flexDirection="column" borderStyle="single" paddingX={1} width='100%'>
                <Text color="gray"><Text bold color="white">/help</Text> - Show help</Text>
                <Text color="gray"><Text bold color="white">/path</Text> - change directory</Text>
                <Text color="gray"><Text bold color="white">/model</Text> - Select a model</Text>
                <Text color="gray"><Text bold color="white">/apikey</Text> - Set API key</Text>
                <Text color="gray"><Text bold color="white">/logout</Text> - Logout</Text>
                <Text color="gray"><Text bold color="white">/Report</Text> - Report a bug</Text>
                <Text color="gray"><Text bold color="white">/exit</Text> - Exit</Text>
            </Box>
        </Box>
    )
}

export default Cmd;