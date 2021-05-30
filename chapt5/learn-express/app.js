const express = require('express');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use((req, res, next) => {
    console.log('1 모든 요청에서 실행');
    next();
}, (req, res, next) => {
    console.log('2 모든요청에서 실행');
    next();   
}, (req, res, next) => {
    try {
        console.log('unknownvalue');
        next();
    } catch (err)
    {
        next(err); // next에 인자 전달 시 에러 처리됨 (에러 미들웨어로 전달)
    }
});

app.use('/about', (req, res, next) => {
    console.log('about 요청에서 실행');
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/next', (req, res, next) => {
    res.send(`<h1>next('route')</h1>`);
    //next();
    next('route');
}, (req, res) => {
    console.log('실행됩니까?');
});

app.get('/next', (req, res) => {
    console.log('라우트?');
})

app.get('/category/express', (req, res) => {
    res.send('hello express');
});

app.get('/about', (req, res) => {
    res.send('About express');
});

app.get('/json', (req, res) => {
    res.json({ hello: 'world' });
});

//#region 와일드카드는 하단에 위치

// 라우터 파라미터는 다른 미들웨어 아래에 위치해야 함
app.get('/category/:name', (req, res) => {
    res.send(`hello route parameter ${req.params.name}`);
});

// 애터리스크는 모든 요청을 다 받음
app.get('/receive/*', (req, res) => {
    res.send('Hello everybody!');
});

//#endregion

// 404 처리 미들웨어
app.use((req, res, next) => {
    res.status(404).send('<h1>404 Error!</h1>')
});

// 에러 미들웨어, next 안쓰더라도 꼭 매개변수 넣어야 함
app.use((err, req, res, next) => {
    console.error(err);
    res.send('<h1>에러났음. 근데 알려줄 수 없음</h1>');
});

app.listen(app.get('port'), () => {
    console.log('express server start');
});