const fs = require('fs');

fs.watch('./target.txt', (eventType, fileName) => {
    console.log(eventType, fileName);
});