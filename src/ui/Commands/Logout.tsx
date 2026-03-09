import { Box, Text } from "ink";
import SelectInput from 'ink-select-input';
import { useState } from "react";
import { useApp } from 'ink';
import { deleteConfig, getConfig } from "../../core/configManage.js";


const items = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
];

const Logout = () => {
    const { exit } = useApp();
    const [message, setMessage] = useState('');
    const [isSelecting, setIsSelecting] = useState(false);
    const handleSelect = (item: { label: string; value: string }) => {
        setIsSelecting(true);
        if (item.value === 'yes') {
            setMessage("✅ You’ve been logged out successfully.");
            deleteConfig('user');
            deleteConfig('model');
            deleteConfig('openRouter');
            setTimeout(() => {
                exit();
            }, 1000);
        } else {
            setMessage("🙌 Great, you're still with us!");
        }
    };
    return (
        <>
            {isSelecting ? (
                <Box backgroundColor="#141414"
                    borderStyle="bold"
                    borderColor="#BFD0E0"
                    borderTop={false}
                    borderBottom={false}
                    borderRight={false}
                    padding={1}>
                    <Text color={message.includes('✅') ? '#D62839' : '#04A777'}>{message}</Text>
                </Box>
            ) : (
                <Box flexDirection="column" width='100%'>
                    <Box backgroundColor="#141414"
                        borderStyle="bold"
                        borderColor="#BFD0E0"
                        borderTop={false}
                        borderBottom={false}
                        borderRight={false}
                        padding={1}
                        flexDirection="column"
                        gap={1}
                        >
                        <Text color="gray">Are you sure you want to logout? Select and Press <Text bold color="white">[Enter]</Text></Text>
                        <SelectInput items={items} onSelect={handleSelect} />
                    </Box>
                </Box>
            )
            }
        </>

    )
}


export default Logout;


