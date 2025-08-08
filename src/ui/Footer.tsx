import { Box, Newline, Text } from "ink";

const Footer = () => {
  return (
        <Box alignSelf="center" marginBottom={1}>
          <Text color="gray">Enter<Text bold color="white"> / </Text>to see all commands</Text>
        </Box>
  );    
};

export default Footer;