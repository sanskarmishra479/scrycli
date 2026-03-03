import { Box } from "ink"
import Input from "./Input.js"
import { setConfig } from "../config/configManage.js"



const ApiInput = () => {
    const handleSubmit = (value: string) => {
        setConfig('openRouter', {apiKey: value})
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