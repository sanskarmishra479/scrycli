import { Box, Text } from "ink";
import Spinner from "ink-spinner";

interface AnswerDisplayProps {
    loading: boolean;
    error: string;
    answer: string;
}


const AnswerDisplay = ({ loading, error, answer }: AnswerDisplayProps) => (
    <>
      {loading && (
        <Box marginTop={1}>
          <Box marginRight={1}><Spinner type="dots" /></Box>
          <Text color="gray">Thinking…</Text>
        </Box>
      )}
      {error && <Box marginTop={1}><Text color="red">{"❌"} {error}</Text></Box>}
      {answer && (
        <Box marginTop={1} borderStyle="single" borderColor="green" paddingX={1}>
          <Text>{answer}</Text>
        </Box>
      )}
    </>
  );

export default AnswerDisplay;