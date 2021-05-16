const dep1 = require('./dep1');
const dep2 = require('./dep2');

// 순환참조 발견 시 경고, node에서 빈 객체 {} 로 치환시킴
dep1();
dep2();