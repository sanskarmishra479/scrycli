import { Box, Text, useApp } from "ink";
import Spinner from 'ink-spinner';

const Exit = () =>{
    const {exit} = useApp();
    setTimeout(() => {
        exit();
    }, 1500);
    return(
        <Box>
            <Box marginRight={1}>
            <Spinner type="dots" />
            </Box>
            <Text>Exiting...</Text>
        </Box>
    )
}

export default Exit;