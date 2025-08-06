import React, { useState } from 'react';
import Welcome from './Welcome.js';
import Auth from './Auth.js';
import SelectModel from './SelectModel.js';

const App = () => {
  const [filePath, setFilePath] = useState<string | null>(null);

  return (
    <>
    {/* <Welcome />
    <Auth /> */}
    <SelectModel />
    </>
  );
};

export default App;
