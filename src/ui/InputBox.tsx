import { log } from "console";
import { Box, Text } from "ink";
import TextInput from "ink-text-input";
import { useState } from "react";

const cwd = process.cwd();
console.log(cwd);



const handleSubmit = (value: string) => {
    console.log(value);
}

const InputBox = ()=>{
    const [input, setInput] = useState("");
    return(
        <Box flexDirection="column">
        <Box borderStyle="round" borderColor="white" width="100%" paddingX={0} >
            <Text color="white">{`>`}
                <TextInput
                    value={input}
                    onChange={setInput}
                    onSubmit={handleSubmit}
                    placeholder=" Ask anything about the your codebase..."
                />
            </Text>
        </Box>
        </Box>
    )
}
export default InputBox;