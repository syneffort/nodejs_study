const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
    res.send('hello express');
});

app.get('/about', (req, res) => {
    res.send('about express');
});

app.listen(app.get('port'), () => {
    console.log('express server start');
});