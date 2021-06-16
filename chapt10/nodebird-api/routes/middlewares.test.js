const { isLoggedIn, isNotLoggedIn } = require('./middlewares'); 

describe('isLoggedIn', () => {
    const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
    };
    const next = jest.fn();
    test('로그인 되어있으면 isLoggedIn이 next를 호출해야 함', () => {
        const req = {
            isAuthenticated: jest.fn(() => true),
        };
        isLoggedIn(req, res, next);
        expect(next).toBeCalledTimes(1);
    });
    
    test('로그인 되어있지 않으면 isLoggedIn이 에러를 호출해야 함', () => {
        const req = {
            isAuthenticated: jest.fn(() => false),
        };
        isLoggedIn(req, res, next);
        expect(res.status).toBeCalledWith(403);
        expect(res.send).toBeCalledWith('로그인이 필요합니다.');
    });
});

describe('isNotLoggedIn', () => {
    const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
        redirect: jest.fn(),
    };
    const next = jest.fn();
    test('로그인 되어있으면 isNotLoggedIn 에러를 호출해야 함', () => {
        const req = {
            isAuthenticated: jest.fn(() => true),
        };
        const message = encodeURIComponent('로그인 한 상태입니다.');
        isNotLoggedIn(req, res, next);
        expect(res.redirect).toBeCalledWith(`/?error=${message}`);
    });
    
    test('로그인 되어있지 않으면 isNotLoggedIn next를 호출해야 함', () => {
        const req = {
            isAuthenticated: jest.fn(() => false),
        };
        isNotLoggedIn(req, res, next);
        expect(next).toBeCalledTimes(1);
    });
});