import { Box, Text } from "ink";

const Cmd = () =>{
    return(
        <Box gap={1} width='100%'>
            <Box flexDirection="column" borderStyle="round" paddingX={1} width='100%'>
                <Text>/model - Select a model</Text>
                <Text>/apikey - Set API key</Text>
                <Text>/logout - Logout</Text>
                <Text>/Report - Report a bug</Text>
                <Text>/exit - Exit</Text>
                <Text>/cmd - Show commands</Text>
            </Box>
        </Box>
    )
}

export default Cmd;