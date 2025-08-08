import React from 'react';
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

const App = () => {

  return (
    <>
      {isAuthenticated() ? (
        <Box flexDirection="column" width="100%">
              <Welcome />
              <Footer />
        </Box>
      ):(
        <Box flexDirection="column" width="100%">
          <Header />
          <Welcome />
          <Footer />
          <Auth />
        </Box>
      )}
    </>
  );
};

export default App;
