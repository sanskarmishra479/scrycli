import { Box, Text } from "ink";
import SelectInput from 'ink-select-input';
import { useState } from "react";
import {useApp} from 'ink';
import { deleteConfig, getConfig } from "../../config/configManage.js";


const items = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
];

const Logout = () =>{
    const {exit} = useApp();
    const [message, setMessage] = useState('');
    const [isSelecting, setIsSelecting] = useState(false);
    const handleSelect = (item: { label: string; value: string }) => {
        setIsSelecting(true);
        if(item.value === 'yes'){
            setMessage("✅ You’ve been logged out successfully.");
            deleteConfig('user');
            deleteConfig('model');
            setTimeout(() => {
                exit();
            }, 1000);
        }else{
            setMessage("🙌 Great, you're still with us!");
        }
    };
    return(
        <>
            {isSelecting ? (
                			<Box marginTop={1} marginBottom={1}>
                                <Text color={message.includes('✅') ? 'red' : 'green'}>{message}</Text>
                            </Box>
                ) : (
                    <Box flexDirection="column" width='100%'>
                        <Box borderStyle="round" paddingX={1} width='60%' >
                            <Text color="gray">Are you sure you want to logout? Select and Press <Text bold color="white">[Enter]</Text></Text>
                        </Box>
                        <Box>
                            <SelectInput items={items} onSelect={handleSelect} />
                        </Box>
                    </Box>
                )
            }
        </>

    )
}


export default Logout;


