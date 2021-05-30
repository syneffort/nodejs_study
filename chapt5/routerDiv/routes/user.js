const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('<h1>Hello User!</h1>');
});

// 같은 주소 다른 매서드
router.get('/abc', (req, res) => {
    res.send('GET /abc');
});
router.post('/abc', (req, res) => {
    res.send('SET /abc');
});

// 라우터 그룹화
router.route('/grouped')
    .get((req, res) => {
        res.send('GET /grouped');
    })
    .post((req, res) => {
        res.send('POST /grouped');
    })

module.exports = router;