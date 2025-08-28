import fs from 'fs';
import path from 'path';

const IGNORED_DIRS = ['.git', 'node_modules', 'dist', 'build', '.next'];

export const getFileTree = (dir: string, prefix = ''): string[] => {
  let results: string[] = [];
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    if (IGNORED_DIRS.includes(file)) return;
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      results.push(prefix + file + '/');
      results = results.concat(getFileTree(filePath, prefix + '  '));
    } else {
      results.push(prefix + file);
    }
  });

  return results;
};
