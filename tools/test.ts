process.env.NODE_ENV = 'test';

import * as karma from 'karma';
import paths from '../config/paths';

const done = (): any => {
  return process.exit(0);
};

new karma.Server({
  configFile: paths.config + '/karma.conf.ts',
  singleRun: true
}, done).start();
