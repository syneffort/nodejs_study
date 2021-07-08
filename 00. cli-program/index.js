#!/usr/bin/env node
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.clear();
const answerCallback = (answer) => {
    if (answer === 'y') {
        console.log('허용');
        rl.close();
    } else if (answer === 'n') {
        console.log('불가');
        rl.close();
    } else {
        console.clear();
        console.log('y/n으로 입력하세요.');
        rl.question('확인하셨습니까? (y/n)', answerCallback);
    }
};

rl.question('확인하셨습니까? (y/n)', answerCallback);