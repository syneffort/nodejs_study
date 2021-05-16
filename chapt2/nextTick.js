setImmediate(() => {
    console.log('Immediate');
}); // 경합

process.nextTick(() => {
    console.log('nextTick');
}); // 1순위 (마이크로 태스크)

setTimeout(() => {
    console.log('Timeout'); 
}, 0); // 경합, setImmediate 사용 권장

Promise.resolve().then(() => {
    console.log('promise');
}); // 2순위