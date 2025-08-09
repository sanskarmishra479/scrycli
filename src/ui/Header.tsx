import { Box, Text } from "ink";
import { useEffect } from "react";

const Header = () => {


  return (
    <Box flexDirection="column" width="100%">
        <Box borderStyle="single" borderColor="white" paddingX={1} alignSelf="center">
            <Text color="gray">
            ✻ Welcome to the <Text bold color="white">SCRYCLI</Text>
            </Text>
        </Box>
    </Box>
  );
};

export default Header;