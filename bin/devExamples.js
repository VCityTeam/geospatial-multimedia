const { exec } = require('child-process-promise');
const spawn = require('child_process').spawn;

/**
 * Prints the stdout and stderr of a command execution result.
 *
 * @param {{stdout: string, stderr: string}} result - The result of the command execution.
 */
function printExec(result) {
    /**
     * Log the standard output and standard error of a command execution result.
     *
     * @function
     * @param {{stdout: string, stderr: string}} result - The result of the command execution.
     */
    console.log('stdout: \n', result.stdout);
    console.log('stderr: \n', result.stderr);
}

exec('npm run build-dev').then(printExec).then(() => {
    const child = spawn(
        'cross-env NODE_ENV=development node',
        ['./bin/backendExamples.js'],
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
})