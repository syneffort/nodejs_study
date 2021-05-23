const fs = require('fs').promises;

fs.copyFile('./readme3.txt', './writeme5.txt')
    .then(() => {
        console.log('복사 완료');
    })
    .catch((err) => {
        console.error(err);
    });