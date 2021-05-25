const http = require('http');
const fs = require('fs').promises;

const users = {};

http.createServer(async (req, res) => {
    try {
        if (req.method === 'GET') {
            if (req.url === '/') {
                const data = await fs.readFile('./restFront.html');
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                return res.end(data);
            } else if (req.url === '/about') {
                const data = await fs.readFile('./about.html');
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                return res.end(data);
            } else if (req.url === '/users') {
                res.writeHead(200, { 'Content-Type': 'text/json; charset=utf-8' });
                return res.end(JSON.stringify(users));
            }

            // 위 조건문에서 리턴되지 않을 경우 해당 경로 파일 시도
            try {
                const data = await fs.readFile(`.${req.url}`);
                return res.end(data);
            } catch (err) {
                // 주소 대응하는 라우트 미확인 404 not found error 발생
            }
        } else if (req.method === 'POST') {
            if (req.url === '/user') {
                let body = '';
                // 요청의 body를 스트림으로 받음
                req.on('data', (data) => {
                    body += data;
                });
                // 요청의 body를 다 받은 후 실행
                return req.on('end', () => {
                    console.log('POST 본문(body):', body);
                    const { name } = JSON.parse(body);
                    const id = Date.now();
                    users[id] = name;
                    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
                    res.end('ok');
                });
            }
        } else if (req.method === 'PUT') {
            if (req.url.startsWith('/user/')) {
                const key = req.url.split('/')[2];
                let body = '';
                req.on('data',(data) => {
                    body += data;
                });
                return req.on('end', () => {
                    console.log('PUT 본문(body):', body);
                    users[key] = JSON.parse(body).name;
                    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
                    return res.end('ok');
                });
            }
        } else if (req.method === 'DELETE') {
            if (req.url.startsWith('/user/')) {
                const key = req.url.split('/')[2];
                delete users[key];
                res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
                return res.end('ok');
            }
        }
        res.writeHead(404);
        return res.end('NOT FOUND');
    } catch (err) {
        console.error(err);
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(err.message);
    }
})
    .listen(8082, () => {
        console.log('8082번 포트에서 대기 중...');
    });