import { log } from "console";
import { Box, Text } from "ink";
import TextInput from "ink-text-input";
import { useState } from "react";
import { getConfig } from '../config/configManage.js';
import Cmd from "./Commands/Cmd.js";



const InputBox = ()=>{
    const cwd = process.cwd();
    const config = getConfig();
    const [suggestions, setSuggestions] = useState(false);
    const [prompt, setPrompt] = useState("");

    const handleChange = (value: string) => {
        setPrompt(value);
        if(value.startsWith('/') && value.length >= 1){
            setSuggestions(true);
        }else{
            setSuggestions(false);
        }
    }
    const handleSubmit = (value: string) => {
        console.log(value);
    }
    
    return(
        <Box flexDirection="column" marginBottom={1} marginTop={1}>
        <Text color="gray">{cwd}</Text>
        <Box borderStyle="single" borderColor="white" width="100%" paddingX={0} >
                <Box marginRight={1}><Text color="white">{`>`}</Text></Box>
                <TextInput
                    value={prompt}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    placeholder="Ask anything about the your codebase..."
                />
        </Box>
        <Box alignSelf="flex-end"><Text color='yellow'>{`Model: ${config?.model?.modelName ?? 'Not Selected'}`}</Text></Box>
        {suggestions && <Box>
            {<Cmd />}
        </Box>}
        </Box>
    )
}
export default InputBox;