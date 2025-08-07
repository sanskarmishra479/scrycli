import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
import TextInput from 'ink-text-input';
import { useState } from 'react';
import { setConfig } from '../config/configManage.js';

const SelectModel = () => {
    const [apiKey, setApiKey] = useState('');
    const [item, setItem] = useState({ label: '', value: '' });

    const handleSelect = (item: { label: string; value: string }) => {
        setItem(item);
        setApiKey('');
    };

    const handleSubmit = () => {
        if (item.label && apiKey) {
            setConfig('model', { modelName: item.label, modelKey: apiKey });
        }
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
                <Box borderStyle="round" borderColor="white" paddingX={1} alignSelf='flex-start' width='50%'>
                    {item.label === 'OpenAI' && <TextInput mask='*' value={apiKey} onChange={setApiKey} placeholder=' Enter your OpenAI API key' onSubmit={handleSubmit} />}
                    {item.label === 'Gemini' && <TextInput mask='*' value={apiKey} onChange={setApiKey} placeholder=' Enter your Gemini API key' onSubmit={handleSubmit} />}
                    {item.label === 'DeepSeek' && <TextInput mask='*' value={apiKey} onChange={setApiKey} placeholder=' Enter your DeepSeek API key' onSubmit={handleSubmit} />}
                </Box>
            }
        </Box>
    );
};

export default SelectModel;