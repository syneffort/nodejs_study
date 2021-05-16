let i = 1;
setInterval(() => {
    if (i === 5) {
        console.log('Exit!');
        process.exit(0); // 에러로 인한 종료 시, 1
    }

    console.log(i);
    i++;
}, 1000);