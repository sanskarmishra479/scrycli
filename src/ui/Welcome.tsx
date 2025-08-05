import { Text, Box } from 'ink';
import BigText from 'ink-big-text';

const Welcome = () => {
  return (
        <Box flexDirection="column" paddingTop={1}>
                <Box borderStyle="round" borderColor="white" paddingX={0} alignSelf="flex-start">
                    <Text color="gray">
                    ✻ Welcome to the <Text bold color="white">SCRYCLI</Text>
                    </Text>
                </Box>
                <Box>
                    <BigText
                            text="SCRYCLI"
                            font="block"
                    />
                </Box>
            </Box>
      );
};

export default Welcome;