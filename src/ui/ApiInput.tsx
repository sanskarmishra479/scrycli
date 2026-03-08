import { useState } from "react"
import { Box, Text } from "ink"
import PasteAwareInput from "./PasteAwareInput.js"
import { getConfig, setConfig } from "../core/configManage.js"

const ApiInput = ({ onDone }: { onDone?: () => void }) => {
    const [value, setValue] = useState("");

    const handleSubmit = (val: string) => {
        setConfig('openRouter', {apiKey: val})
        onDone && onDone();
    }

    return (
        <Box borderStyle="single" borderRight={false} borderLeft={false} borderColor="white" width="100%" paddingX={0}>
            <Box marginRight={1}><Text color="white">{`>`}</Text></Box>
            <PasteAwareInput
                value={value}
                onChange={setValue}
                onSubmit={handleSubmit}
                placeholder="Enter your OpenRouter API key"
            />
        </Box>
    )
}

export default ApiInput;
