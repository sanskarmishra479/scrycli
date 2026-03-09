import { Box, Text } from "ink";

const Header = () => {


  return (
    <Box flexDirection="column" width="100%">
        <Box backgroundColor="#141414"
            borderStyle="bold"
            borderColor="#BFD0E0"
            borderTop={false}
            borderBottom={false}
            borderRight={false}
            padding={1} alignSelf="center">
            <Text color="gray">
            ✻ Welcome to the <Text bold color="white">SCRYCLI</Text>
            </Text>
        </Box>
    </Box>
  );
};

export default Header;