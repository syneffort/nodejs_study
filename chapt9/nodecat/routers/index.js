const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/test', async (req, res, next) => {
    try {
        if (!req.session.jwt) { // 토큰 없으면 발급 시도
            const tokenResult = await axios.post('http://localhost:8002/v1/token', {
                clientSecret: process.env.CLIENT_SECRET,
            });
            if (tokenResult.data && tokenResult.data.code === 200) { // 토큰 발급 성공
                req.session.jwt = tokenResult.data.token;
            } else { // 토큰 발급 실패
                return res.json(tokenResult.data); // 발급 실패 원인 응답
            }
        }
        // 토큰 테스트
         const result = await axios.get('http://localhost:8002/v1/test', {
             headers: { authorization: req.session.jwt },
         });
         return res.json(result.data);
    } catch (error) {
        console.error(error);
        if (error.response.status === 419) { // 토큰 만료 시
            return res.json(error.response.data);
        }
        return next(error);
    }
});

module.exports = router;