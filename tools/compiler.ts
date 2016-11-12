import * as webpack from 'webpack';
import * as chalk from 'chalk';
import logger from './logger';
import config from '../config/webpack.dev';

const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const log = logger();

// build success message
const success = (host: string, port: number, protocol: string): string => {
  return [
    chalk.green('Compiled successfully\n\n'),
    'The app is running at:\n',
    chalk.cyan(`${protocol}://${host}:${port}/\n\n`),
    'Note that the development build is not optimized.\n',
    `To create a production build, use ${chalk.cyan('npm run build')}`
  ].join('');
};

// get and display issues (linting, etc.)
const issues = (stats: any): void => {
  let messages = formatWebpackMessages(stats.toJson({}, true));
  let errors = messages.errors.length && messages.errors;
  let warnings = messages.warnings.length && messages.warnings;

  log.issues(errors || warnings || [chalk.green('[ No linting errors ]')]);
};

export default (host: string, port: number, protocol: string): any => {
  let compiler: any = webpack(config);

  // `invalid` fires when a file has changed and Webpack is recompiling
  compiler.plugin('invalid', (): void => {
    log.msg('Compiling...');
  });

  // `done` fires when Webpack has finished recompiling
  // this event will fire even if there are errors/warnings
  compiler.plugin('done', (stats: any): void => {
    issues(stats);
    log.msg(success(host, port, protocol));
  });

  return compiler;
};
