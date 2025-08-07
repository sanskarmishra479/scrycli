import { Box, Text } from "ink";

const Header = () => {
  return (
    <Box flexDirection="column" width="100%">
        <Box borderStyle="round" borderColor="white" paddingX={0} alignSelf="center">
            <Text color="gray">
            ✻ Welcome to the <Text bold color="white">SCRYCLI</Text>
            </Text>
        </Box>
    </Box>
  );
};

export default Header;