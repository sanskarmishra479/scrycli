import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
import { listSessions, createSession } from "../../core/sessionManager.js";

interface SessionProps {
  onSelect: (sessionId: string) => void;
}

const Session = ({ onSelect }: SessionProps) => {
  const cwd = process.cwd();
  const sessions = listSessions(cwd);

  const items = [
    { label: "+ Start new conversation", value: "__new__" },
    ...sessions.map((s) => ({
      label: `${s.title}  (${s.messageCount} msgs · ${new Date(s.updatedAt).toLocaleDateString()})`,
      value: s.id,
    })),
  ];

  const handleSelect = (item: { value: string }) => {
    if (item.value === "__new__") {
      const session = createSession(cwd);
      onSelect(session.id);
    } else {
      onSelect(item.value);
    }
  };

  return (
    <Box flexDirection="column">
      <Text bold color="cyan">Sessions for this project:</Text>
      {sessions.length === 0 && (
        <Text color="gray" dimColor>No previous sessions found.</Text>
      )}
      <Box marginTop={1}>
        <SelectInput items={items} onSelect={handleSelect} />
      </Box>
    </Box>
  );
};

export default Session;