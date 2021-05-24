// 예측 불가능한 에러 처리 최후의 수단
// - 콜백 함수 동작 보장되지 않음
// - 에러 내용 기록 용으로만 사용

process.on('uncaughtException', (err) => {
    console.error('예기치 못한 에러: ', err);
});

setInterval(() => {
    throw new Error('노드 파괴자!');
}, 1000);

setTimeout(() => {
    console.log('타임아웃 실행');
}, 2000);