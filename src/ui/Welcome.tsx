import { Text, Box } from 'ink';
import BigText from 'ink-big-text';

const Welcome = () => {
  return (
        <Box flexDirection="column" paddingTop={1} width="100%">
                <Box alignSelf="center">
                    <BigText
                            text="SCRYCLI"
                            font="block"
                    />
                </Box>
            </Box>
      );
};

export default Welcome;