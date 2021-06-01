const express = require('express');
const path = require('path');

const nunjucks = require('nunjucks');

const app = express();
app.set('port', process.env.PORT || 3000);

// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

nunjucks.configure('views', {
    express: app,
    watch: true,
});

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

// ....

app.use('/', indexRouter);
app.use('/user', userRouter);

app.get('/main', (req, res) => {
    res.render('main');
});

app.get('/layout', (req, res) => {
    res.render('body');
});

app.get('/about', (req, res) => {
    res.send()
});

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
})

app.listen(app.get('port'), () => {
    console.log('express server start');
});