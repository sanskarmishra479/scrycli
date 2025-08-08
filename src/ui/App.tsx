import React, { useState } from 'react';
import Welcome from './Welcome.js';
import Auth from './Auth.js';
import SelectModel from './SelectModel.js';
import Header from './Header.js';
import Footer from './Footer.js';
import InputBox from './InputBox.js';
import Logout from './Commands/Logout.js';
import Cmd from './Commands/Cmd.js';
import Exit from './Commands/Exit.js';
import Report from './Commands/Report.js';
import isAuthenticated from '../lib/auth.js';
import { Box } from 'ink';
import isModelSelected from '../lib/isModelSelected.js';

const App = () => {
  const [stepAuth, setStepAuth] = useState(0); 
  const [step, setStep] = useState(0);
  const goNextAuth = () => setStepAuth((prev) => prev + 1);
  const goNext = () => setStepAuth((prev) => prev + 1);

  return (
    <>
      {isAuthenticated() && isModelSelected() ? (
        <Box flexDirection="column" width="100%">
              <Welcome />
              <Footer />
              {stepAuth === 0 && <InputBox onDone={goNext}/>}

        </Box>
      ):(
        <Box flexDirection="column" width="100%">
          <Header onDone={goNextAuth} />
          <Welcome />
          <Auth />
        </Box>
      )}
    </>
  );
};

export default App;
