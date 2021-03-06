const dotenv = require('dotenv'); //.env 파일 생성 후 변수=값
dotenv.config();

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
// app.use(morgan('combined'));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
    },
    name: 'connect.sid',
}));
// app.use('요청경로', express.static(실제경로));
app.use('/', (req, res, next) => {
    if (req.session.id) {
        express.static(path.join(__dirname, 'public'))(req, res, next);
    } else {
        next();
    }
})
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // true면 qs, false면 querystring


app.use('/', indexRouter);
app.use('/user', userRouter);

// app.use((req, res, next) => {
//     console.log('1 모든 요청에서 실행');
//     next();
// }, (req, res, next) => {
//     console.log('2 모든요청에서 실행');
//     next();   
// }, (req, res, next) => {
//     try {
//         console.log('unknownvalue');
//         next();
//     } catch (err)
//     {
//         next(err); // next에 인자 전달 시 에러 처리됨 (에러 미들웨어로 전달)
//     }
// });

const multer = require('multer');
const fs = require('fs');

try {
    fs.readdirSync('uploads');
} catch (err) {
    console.error('uploads 폴더가 없어 새로 생성합니다.');
    fs.mkdirSync('uploads');
}
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads/');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});
app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'multipart.html'));
});
app.post('/upload', upload.array('image'), (req, res) => {
    console.log(req.files);
    res.send('ok');
});

app.use((req, res, next) => {
    req.data = 'session 비번';
    next();
})

app.get('/', (req, res) => {
    console.log(req.data);
    req.session.name = 'tester';
    req.session.id = 'hello';
    console.log(req.body.name);
    const name = 'tester';
    req.cookies;
    req.signedCookies;
    res.cookie('name', encodeURIComponent(name), {
        expires: new Date(),
        httpOnly: true,
        path: '/',
    });
    res.clearCookie('name', encodeURIComponent(name), {
        httpOnly: true,
        path: '/',
    });
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/about', (req, res, next) => {
    console.log('about 요청에서 실행');
    next();
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