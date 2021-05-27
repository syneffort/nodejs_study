const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`마스터 프로세스 아이디: ${process.pid}`);
    // CPU 수 만큼 워커 생성
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    // 워커가 종료되었을 때
    cluster.on('exit', (worker, code, signal) => {
        console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
        console.log(`code: ${code}, signal: ${signal}`);
        cluster.fork(); // 워커가 죽을 때 마다 새로운 워커 생성됨 (서버 종료 막을 수 있으나 권장되지 않음.)
    });
} else {
    // 워커들이 포트에서 대기
    http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('<h1>Hello node!</h1>');
        res.end('<p>Hello cluster!</p>');
        setTimeout(() => { // 1초 뒤 프로세스 종료
            process.exit(1);
        }, 1000);
    }) .listen(8086);

    console.log(`${process.pid}번 워커 실행`);
}