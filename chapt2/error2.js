const fs = require('fs');

// 노드 비동기 메서드 에러는 별도 처리 없어도 터지지 않음
setInterval(() => {
    fs.unlink('./abcdefg.js', (err) => {
        if (err) {
            console.error(err);
        }
    });
}, 1000);