let childProcess = require('child_process');
let serverProcess;
startServerProcess();

function startServerProcess() {
    serverProcess = childProcess.spawn('node', ['server.js']);
    serverProcess.stdout.pipe(process.stdout);
    serverProcess.stderr.pipe(process.stderr);

    startInterval();
}

function restartServerProcess() {
    serverProcess.kill();
    startServerProcess();
}


function startInterval() {
    let i = 0;
    let interval = setInterval(() => {
        console.log(i);
        if (i++ > 10) {
            clearInterval(interval);
            restartServerProcess();
        }
    }, 1000);
}
