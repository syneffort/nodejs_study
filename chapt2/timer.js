const timeout = setTimeout(() => {
    console.log('after 1.5sec')
}, 1500);

const interval = setInterval(() => {
    console.log('interval 1.0sec');
}, 1000);

const timeout2 = setTimeout(() => {
    console.log('can you see this setTimeout?');
}, 5000);

setTimeout(() => {
    clearInterval(interval);
    clearTimeout(timeout2);
}, 4000);

const immediate = setImmediate(() => {
    console.log('setImmediate!');
});

const immediate2 = setImmediate(() => {
    console.log('can you see this setImmediate?');
});

// 이벤트 루프는 호출스택이 비어져 있을 때 태스크큐(백그라운드 처리 완류 후) 에서 함수 호출
clearImmediate(immediate2); 