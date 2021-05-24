const http = require('http');

const server = http.createServer((req, res) => {
    res.write('<h1>hello Node!</h1>');
    res.write('<p>Hello server</p>');
    res.end('<p>Hello world</p>');
})
    .listen(8080);

server.on('listening', () => {
    console.log('8080 포트에서 서버 대기 중...')
});
server.on('error', (err) => {
    console.error(err)
});