import { Box } from "ink"
import Input from "./Input.js"
import { getConfig, setConfig } from "../config/configManage.js"



const ApiInput = ({ onDone }: { onDone?: () => void }) => {
    const handleSubmit = (value: string) => {
        setConfig('openRouter', {apiKey: value})
        console.log(getConfig());
        onDone && onDone();
    }

    return (
        <Box>
            <Input
                onSubmit={handleSubmit}
                placeholder="Enter your OpenRouter API key"
            />
        </Box>
    )
}

export default ApiInput;