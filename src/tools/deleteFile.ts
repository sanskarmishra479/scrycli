import fs from 'fs';
import path from 'path';

export const deleteFile = (filePath: string) => {
    const absPath = path.resolve(filePath);
    fs.unlinkSync(absPath);
  };