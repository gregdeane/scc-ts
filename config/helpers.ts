import * as path from 'path';

export const root = (...args: Array<string>): string => {
  const ROOT = path.resolve(__dirname, '..');
  return path.join.apply(path, [ROOT].concat(...args));
};
