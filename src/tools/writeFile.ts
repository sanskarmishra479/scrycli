import fs from 'fs';
import path from 'path';

export const writeFile = (filePath: string, content: string) => {
    const absPath = path.resolve(filePath);
    fs.writeFileSync(absPath, content, 'utf-8');
  };