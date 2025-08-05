import React, { useState } from 'react';
import Welcome from './Welcome.js';

const App = () => {
  const [filePath, setFilePath] = useState<string | null>(null);

  return (
    <>
    <Welcome />
    </>
  );
};

export default App;
