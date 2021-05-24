setInterval(() => {
    console.log('시작');
    try {
        throw new Error('노드 파괴!');
    } catch (err) {
        console.log('by catch: ', err);
    }
}, 1000);