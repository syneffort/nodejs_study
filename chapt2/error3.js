const fs = require('fs').promises;

// 노드 promise는 별도 처리 없어도 터지지 않음
setInterval(() => {
    fs.unlink('./abcdefg.js')
        .catch((err) => {
            console.error('catch: ', err);
        })
}, 1000);