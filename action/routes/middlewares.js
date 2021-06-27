module.exports = {
    isLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/?loginError=로그인이 필요합니다.');
        }
    },

    isNotLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) {
            res.redirect('/');
        } else {
            next();
        }
    },
}