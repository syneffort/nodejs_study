const User = require('../models/user');

exports.addFollowing = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.user.id
            }
        });
        if (user) {
            // 수정 : setFollowings (기존 내용 제거 후 대체), removeFollowings, getFollowings
            await user.addFollowings([parseInt(req.params.id, 10)]);
            res.send('success');
        } else {
            res.status(404).send('no user');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
}