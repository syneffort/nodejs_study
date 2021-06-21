const mongoose = require('mongoose');

const { MONGO_ID, MONGO_PASSWORD, NODE_ENV } = process.env;
const MONGO_URL = `mongodb://${MONGO_ID}:${MONGO_PASSWORD}@localhost:27017/admin`;

const connect = () => {
    if (NODE_ENV !== 'production') {
        mongoose.set('debug', true); // 몽고디비 쿼리를 터미널에 출력
    }
    mongoose.connect(MONGO_URL, {
        dbName: 'gifchat',
        useNewUrlParser: true,
        useCreateIndex: true,
    }, (error) => {
        if (error) {
            console.log('몽고디비 연결 에러');
        } else {
            console.log('몽고디비 연결 성공');
        }
    })
};

mongoose.connection.on('error', (error) => {
    console.error('몽고디비 연결 에러', error);
});
mongoose.connection.on('disconnection', () => {
    console.error('몽공디비 연결이 끊겨 연결을 시도합니다.');
    connect();
});

module.exports = connect;