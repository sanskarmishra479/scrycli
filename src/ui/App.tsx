import { useState, useEffect, useRef } from 'react';
import Welcome from './Welcome.js';
import Auth from './Auth.js';
import SelectModel from './SelectModel.js';
import Header from './Header.js';
import Footer from './Footer.js';
import InputBox from './InputBox.js';
import isAuthenticated from '../lib/isAuthenticated.js';
import { Box } from 'ink';
import isModelSelected from '../lib/isModelSelected.js';
import isApiAvailable from '../lib/isApiAvailable.js';
import ApiInput from './ApiInput.js';
import { createSession, listSessions } from '../core/sessionManager.js';

function getOrCreateSessionId(): string {
  const cwd = process.cwd();
  const existing = listSessions(cwd);
  if (existing.length > 0) return existing[0]?.id ?? ""; // most recent
  return createSession(cwd).id;
}

const App = () => {
  const [authed, setAuthed] = useState<boolean>(isAuthenticated());
  const [modelSelected, setModelSelected] = useState<boolean>(isModelSelected());
  const [apiAvailable, setApiAvailable] = useState<boolean>(isApiAvailable());
  const [activeSessionId, setActiveSessionId] = useState<string>(() => getOrCreateSessionId());
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    process.stdout.write('\x1B[2J\x1B[H');
  }, [activeSessionId]);

  return (
    <>
      {!authed && (
        <Box flexDirection="column" width="100%">
          <Header />
          <Welcome />
          <Auth onAuthenticated={() => setAuthed(true)} />
        </Box>
      )}
      {authed && !apiAvailable && (
        <Box flexDirection="column" width="100%">
          <Header />
          <Welcome />
          <ApiInput onDone={() => setApiAvailable(true)} />
        </Box>
      )}
      {authed && apiAvailable && !modelSelected && (
        <Box flexDirection="column" width="100%">
          <Header />
          <Welcome />
          <SelectModel onDone={() => setModelSelected(true)} />
        </Box>
      )}
      {authed && apiAvailable && modelSelected && (
        <Box flexDirection="column" width="100%">
          <Footer />
          <InputBox
            key={activeSessionId}
            sessionId={activeSessionId}
            onSessionSelect={setActiveSessionId}
          />
        </Box>
      )}
    </>
  );
};

export default App;