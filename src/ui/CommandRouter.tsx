import { Box, Text } from "ink";
import Cmd from "./Cmd.js";
import Exit from "./Commands/Exit.js";
import Logout from "./Commands/Logout.js";
import Report from "./Commands/Report.js";
import SelectModel from "./SelectModel.js";
import Session from "./Commands/Session.js";
import type { JSX } from "react";
import type { CommandName } from "../types/cmdNameType.js";
import ApiInput from "./ApiInput.js";

interface CommandRouterProps {
  command: CommandName;
  onBack: () => void;
  onSessionSelect?: (sessionId: string) => void;
}

const CommandRouter = ({ command, onBack, onSessionSelect }: CommandRouterProps) => {
    const routes: Record<CommandName, JSX.Element> = {
      "/model": <SelectModel />,
      "/help": <Cmd />,
      "/path": <Cmd />,
      "/apikey": <ApiInput />,
      "/logout": <Logout />,
      "/report": <Report />,
      "/exit": <Exit />,
      "/session": <Session onSelect={(id) => {
        onSessionSelect?.(id);
        onBack();
      }} />,
    };

    return (
      <Box flexDirection="column">
        <Box marginBottom={1}>
          <Text color="yellow">Press [Esc] to go back</Text>
        </Box>
        {routes[command]}
      </Box>
    );
  };

export default CommandRouter;