process.env.NODE_ENV = 'development';

import * as chalk from 'chalk';
import runDevServer from './server';
import paths from '../config/paths';
import settings from '../config/settings';

const detect = require('detect-port');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const prompt = require('react-dev-utils/prompt');
const clearConsole = require('react-dev-utils/clearConsole');
const DEFAULT_PORT = settings.port;

// warn and crash if required files are missing
if (!checkRequiredFiles([paths.rootModule])) {
  process.exit(1);
}

const run = (port: number) => {
  let protocol = (process.env.HTTPS === 'true' && 'https') || 'http';
  let host = process.env.HOST || 'localhost';

  runDevServer(host, port, protocol);
};

const promptUser = (port: number) => {
  let question = [
    chalk.yellow(`Something is already running on port ${DEFAULT_PORT}.\n\n`),
    'Would you like to run the app on another port instead?'
  ].join('');

  clearConsole();

  prompt(question, true).then((shouldChangePort: boolean) => {
    if (shouldChangePort) {
      run(port);
    }
  });
};

// attempt to use the default port. if it's in use, offer to run on
// a different port. `detect()` Promise resolves to the next free port.
detect(DEFAULT_PORT).then((port: number) => {
  if (port === DEFAULT_PORT) {
    run(port);
    return;
  }

  promptUser(port);

});
