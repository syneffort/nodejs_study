const express = require('express');
const path = require('path');

const app = express();
app.set('port', process.env.PORT || 3000);

app.set('view engine', 'html');

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

app.use((req, res, next) => {
    // res.send('<h1>404 : 잘못된 경로!</h1>');
    res.status(302).redirect('/');
});

app.listen(app.get('port'), () => {
    console.log('express server start');
});