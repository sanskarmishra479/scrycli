import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
import TextInput from 'ink-text-input';
import { useState } from 'react';

const SelectModel = () => {
    const [apiKey, setApiKey] = useState('');
    const [item, setItem] = useState({ label: '', value: '' });
    const handleSelect = (item: { label: string; value: string }) => {
        setItem(item);
    };
    
    const items = [
        {
            label: 'OpenAI',
            value: 'OpenAI'
        },
        {
            label: 'Gemini',
            value: 'Gemini'
        },
        {
            label: 'DeepSeek',
            value: 'DeepSeek'
        }
    ];
    return (
        <Box flexDirection="column" gap={1}>
            <Box borderStyle="round" borderColor="white" alignSelf="flex-start" paddingX={1} >
                    <Text color="gray">👇 Select a model and Press <Text bold color="white">[Enter]</Text></Text>
            </Box>
            <SelectInput items={items} onSelect={handleSelect} />
            { item.label && 
                <Box borderStyle="round" borderColor="green" paddingX={1} alignSelf='flex-start' width='30%'>
                    {item.label === 'OpenAI' && <TextInput value={apiKey} onChange={setApiKey} placeholder='Enter your OpenAI API key' />}
                    {item.label === 'Gemini' && <TextInput value={apiKey} onChange={setApiKey} placeholder='Enter your Gemini API key' />}
                    {item.label === 'DeepSeek' && <TextInput value={apiKey} onChange={setApiKey} placeholder='Enter your DeepSeek API key' />}
                </Box>
            }
        </Box>
    );
};

export default SelectModel;