const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
    const threads = new Set();
    threads.add(new Worker(__filename, {
        workerData: { start: 1},
    }));
    threads.add(new Worker(__filename, {
        workerData: { start: 2},
    }));

    for (let worker of threads) {
        worker.on('message', (value) => console.log('from worker : ', value));
        worker.on('exit : ', () => {
            threads.delete(worker);
            if (threads.size === 0) {
                console.log('all workers exit');
            }
        });
    }
 } else {
    const data = workerData;
    parentPort.postMessage(data.start + 100);
}