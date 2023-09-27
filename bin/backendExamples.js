const path = require('path');
const DEFAULT_PORT  = 8000;
const { stringReplace } = require('string-replace-middleware');
const express = require('express');

const spawn = require('child_process').spawn;


/**
 * The environment mode.
 *
 * @type {string}
 */
const NODE_ENV = process.env.NODE_ENV || 'development';

console.log('Back-end starting in', NODE_ENV, 'mode');

/**
 * Express application instance.
 *
 * @type {object}
 */
const app = new express();

// Apply string replacements for different values in HTML responses
app.use(
  stringReplace(
    {
      RUN_MODE: NODE_ENV,
    },
    {
      contentTypeFilterRegexp: /text\/html/,
    }
  )
);

// Serve static files
app.use(express.static(path.resolve(__dirname, '../')));

/**
 * The HTTP server instance.
 *
 * @type {object}
 */
app.listen(DEFAULT_PORT, (err) => {
  if (err) {
    console.error('Server could not start');
    return;
  }
  console.log('frontend Http server listening on port', DEFAULT_PORT);
});

const child = spawn(
  'cross-env NODE_ENV=development node',
  ['./bin/geospatialMultimedia.js'],
  {
    shell: true,
  }
);

/**
 * Log data from the child process's standard output.
 */
child.stdout.on('data', (data) => {
  console.log(`${data}`);
});

/**
 * Log error data from the child process's standard error in red color.
 */
child.stderr.on('data', (data) => {
  console.error('\x1b[31m', ` ERROR :\n${data}`);
});