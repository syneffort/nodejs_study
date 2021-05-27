const https = require('https');
const fs = require('fs');

https.createServer({
    cert: fs.readdirSync('인증서 경로'),
    key: fs.readFileSync('비밀키 경로'),
    ca: [
        fs.readFileSync('상위 인증서 경로'),
        fs.readFileSync('상위 인증서 경로'),
    ],
}, (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('https 서버입니다.');
})
    .listen(443, () => {
        console.log('443포트에서 대기 중...');
    });