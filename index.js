const P = require('bluebird');

/**
 * Inspired by highland-process.
 *
 * Convert a nodejs ChildProcess into a Promise.
 *
 * npm has a "bug" where warnings are piped through stderror.
 * (It's in quotes because that may very well be an npm quirk.)
 * The workaround is to use the exit code to tell if the program exited normally.
 *
 * jspm has a bug (a real bug) where errors are piped through stdout.
 * See https://github.com/jspm/jspm-cli/issues/1286.
 * Use jspm:true flag for jspm.
 */
function fromProcess(childProcess, opts) {

  opts = opts || {};

  return new P((resolve, reject) => {

    var msg = '', errorMsg = '';

    childProcess.stdout.on('data', chunk => msg += chunk);

    childProcess.stderr.on('data', error => errorMsg += error);

    childProcess.on('error', error => errorMsg += error);

    childProcess.on('close', (exitCode) => {

      const hasError = exitCode !== 0;

      var resolutionFunction = hasError ? reject : resolve;
      var resolutionMessage = msg + errorMsg;

      resolutionFunction(resolutionMessage);
    });
  });
}

module.exports = {
  fromProcess
};
