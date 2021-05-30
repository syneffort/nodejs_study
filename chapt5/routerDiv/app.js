const express = require('express');

const app = express();
app.set('port', process.env.PORT || 3000);

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

// ....

app.use('/', indexRouter);
app.use('/user', userRouter);

app.use((req, res, next) => {
    // res.send('<h1>404 : 잘못된 경로!</h1>');
    res.status(302).redirect('/');
});

app.listen(app.get('port'), () => {
    console.log('express server start');
});