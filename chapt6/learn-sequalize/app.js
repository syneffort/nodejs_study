const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const { sequelize } = require('./models');

const app = express();
app.set('port', process.env.PORT || 3001);
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});
sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/adduser/:name', (req, res) => {
    const { User } = require('./models');
    User.create({
        name: req.params.name,
        age: 24,
        married: false,
        comment: '자기소개1',
    });
    res.send('ok');
});

app.get('/users', (req, res) => {
    const users = getalluser()
        .then(result => {
            console.log('reuslt', result);
            res.send(result);
        });
});

const getalluser = async function() {
    const [result, metadata] = await sequelize.query('SELECT * FROM users');
    // console.log('reuslt', result);
    // console.log('metadata', metadata);
    return result;
};

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.rul} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')} 포트에서 대기 중...`);
});