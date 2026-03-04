import { Box, Text } from "ink";
import Cmd from "./Commands/Cmd.js";
import Exit from "./Commands/Exit.js";
import Logout from "./Commands/Logout.js";
import Report from "./Commands/Report.js";
import SelectModel from "./SelectModel.js";
import type { JSX } from "react";
import type { CommandName } from "../types/cmdNameType.js";
import ApiInput from "./ApiInput.js";



const CommandRouter = ({ command, onBack }: { command: CommandName; onBack: () => void }) => {
    const routes: Record<CommandName, JSX.Element> = {
      "/model": <SelectModel />,
      "/help": <Cmd />,
      "/path": <Cmd />,
      "/apikey": <ApiInput />,
      "/logout": <Logout />,
      "/report": <Report />,
      "/exit": <Exit />,
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