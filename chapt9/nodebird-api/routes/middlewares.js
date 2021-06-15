const jwt = require('jsonwebtoken');

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        console.error('로그인이 필요합니다.');
        res.status(403).send('로그인이 필요합니다.');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log('로그인 한 상태입니다.');
        const message = encodeURIComponent('로그인 한 상태입니다.');
        res.redirect(`/?error=${message}`);
    } else {
        next();
    }
};

exports.verifyToken = (req, res, next) => {
    try {
        req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        return next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(419).json({
                code: 419,
                message: '토큰이 만료되었습니다.',
            });
        }
        return res.status(401).json({
            code:401,
            message: '유효하지 않은 토큰입니다.',
        })
    }
}