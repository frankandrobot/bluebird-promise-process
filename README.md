# promise-process

Converts a (finite) child process to a Bluebird Promise

## Example

```
const fromProcess = require('bluebird-promise-process').fromProcess;

fromProcess(
  spawn('jspm', ['install', '-y'], {
      cwd: __dirname,
      detached: false
  })
).then(() => console.log('finished jspm install'));
```
