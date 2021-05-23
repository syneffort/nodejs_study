const fs = require('fs').promises;

const fd = './folder';
fs.readdir(fd)
    .then((dir) => {
        console.log('폴더 내용 확인: ', dir);
        dir.forEach(path => {
            fs.unlink(`${fd}/${path}`);
        });
    })
    .then(() => {
        console.log('파일 삭제 성공')
        return fs.rmdir(fd);
    })
    .then(() => {
        console.log('폴더 삭제 성공');
    })
    .catch((err) => {
        console.error(err);
    });