#!/usr/bin/env node
import { render } from 'ink';
import App from '../ui/App.js';

const enterAltScreen = '\x1b[?1049h\x1b[48;2;0;0;0m\x1b[2J\x1b[H';
const leaveAltScreen = '\x1b[0m\x1b[?1049l';

process.stdout.write(enterAltScreen);

const cleanup = () => {
  process.stdout.write(leaveAltScreen);
};

const instance = render(<App />, { patchConsole: false });

instance.waitUntilExit().then(cleanup);

process.on('SIGINT', () => {
  cleanup();
  process.exit(0);
});

process.on('SIGTERM', () => {
  cleanup();
  process.exit(0);
});
