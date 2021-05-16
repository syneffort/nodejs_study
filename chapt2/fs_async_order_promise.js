const fs = require('fs').promises;

// async-await
async function main() {
    let data = await fs.readFile('./readme.txt');
    console.log('1번 aa', data.toString());
    data = await fs.readFile('./readme.txt');
    console.log('2번 aa', data.toString());
    data = await fs.readFile('./readme.txt');
    console.log('3번 aa', data.toString());
    data = await fs.readFile('./readme.txt');
    console.log('4번 aa', data.toString());
    data = await fs.readFile('./readme.txt');
}

main();

// promise
fs.readFile('./readme.txt')
    .then((data) => {
        console.log('1번 pr', data.toString());
        return fs.readFile('./readme.txt');
    })
    .then((data) => {
        console.log('2번 pr', data.toString());
        return fs.readFile('./readme.txt');
    })
    .then((data) => {
        console.log('3번 pr', data.toString());
        return fs.readFile('./readme.txt');
    })
    .then((data) => {
        console.log('4번 pr', data.toString());
    })
    .catch((err) => {
        throw err;
    });