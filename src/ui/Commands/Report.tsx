import { Box, Text } from "ink";
import open from 'open';
import SelectInput from 'ink-select-input';
import { useState } from "react";

const items = [
    { label: '[Enter]', value: 'yes' },
];

const Report = () =>{
    const [message, setMessage] = useState('');
    const [step, setStep] = useState(false);
    const REPORT_URL = "https://scrycli.tech/report";
    const handleSelect = (item: { label: string; value: string }) => {
        if(item.value === 'yes'){
            open(REPORT_URL);
            setTimeout(()=>{
                setStep(true);
                setMessage('👋 Thanks for reporting! We’ll get back to you soon.');
            },1000)
        }
    };
    return(
        <Box width='100%'>
            {step ? (
                <Box marginTop={1} marginBottom={1} width='100%'>
                    <Text color='cyan'>{message}</Text>
                </Box>
            ) : (
                <Box flexDirection='column' width='100%'>
                    <Box flexDirection='column' marginTop={1} marginBottom={1} width='100%' >
                        <Text color='gray'>🐞 Uh-oh! Found a bug in <Text bold>SCRYCLI</Text>?</Text>
                        <Text color='gray'>We’d really appreciate your help in squashing it</Text>
                        <Text color='gray'>Your feedback helps make SCRYCLI better for everyone 💜❤️</Text>
                        <Text color='gray'>Click <Text bold>[Enter]</Text> to report the issue on our website. 🛠️</Text>
                    </Box>
                    <SelectInput  items={items} onSelect={handleSelect} />
                </Box>
            )}
        </Box>
    )
}

export default Report;