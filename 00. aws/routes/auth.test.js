const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');

beforeAll(async() => {
    await sequelize.sync();
})

describe('POST /join', () => {
    test('로그인 안했으면 가입', (done) => {
        request(app)
            .post('/auth/join')
            .send({
                eamil: 'test@gamil.com',
                nick: 'tester',
                password: '1234',
            })
            .expect('Location', '/')
            .expect(302, done);
    });
});

describe('POST /login', () => {
    test('로그인 수행', async (done) => {
        request(app)
            .post('/auth/login')
            .send({
                eamil: 'test@gamil.com',
                password: '1234',
            })
            .expect('Location', '/')
            .expect(302, done);
    });
});

afterAll(async () => {
    await sequelize.sync({ force: true });
})