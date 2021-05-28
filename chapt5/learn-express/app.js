const express = require('express');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3000);
app.use((req, res, next) => {
    console.log('모든 요청에서 실행');
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/category/express', (req, res) => {
    res.send('hello express');
});

// 라우터 파라미터는 다른 미들웨어 아래에 위치해야 함
app.get('/category/:name', (req, res) => {
    res.send(`hello route parameter ${req.params.name}`);
});

app.get('/about', (req, res) => {
    res.send('About express');
});

// 애터리스크는 모든 요청을 다 받음
app.get('/*', (req, res) => {
    res.send('Hello everybody!');
});

app.listen(app.get('port'), () => {
    console.log('express server start');
});