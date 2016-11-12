const clearConsole = require('react-dev-utils/clearConsole');

// display issues (linting, etc.)
const issues = (msgs: Array<string>): void => {
  clearConsole();
  msgs.forEach(msg => {
    console.log(msg);
  });
};

// display message
const msg = (msg: string): void => {
  console.log(msg);
};

// default Webpack output is turned off
// present messages/warnings/errors in readable format
export default (): any => {
  return { msg, issues };
};
