const { spawn } = require('child_process');
const path = require('path');

const port = process.env.PORT || 3000;

const child = spawn(
  process.execPath,
  [path.join(__dirname, 'node_modules', '.bin', 'next'), 'start', '-p', port],
  { stdio: 'inherit', cwd: __dirname }
);

child.on('exit', (code) => {
  process.exit(code);
});