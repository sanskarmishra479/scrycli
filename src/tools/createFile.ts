import fs from 'fs';
import path from 'path';

const ensureDir = (filePath: string) => {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  };

export const createFile = (filePath: string, content: string) => {
    const absPath = path.resolve(filePath);
    ensureDir(absPath);
    fs.writeFileSync(absPath, content, 'utf-8');
  };