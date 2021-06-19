exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        console.log('로그인이 필요합니다.');
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
}