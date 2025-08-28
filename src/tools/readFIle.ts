import fs from 'fs';
import path from 'path';


export const readFile = (filePath: string) => {
    const absPath = path.resolve(filePath);
    return fs.readFileSync(absPath, 'utf-8');
  };