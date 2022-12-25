let express = require('express');
let app = express();

const staticPath = __dirname + '/public';
const indexPath = __dirname + '/views/index.html';

app.use('/public', express.static(staticPath));

app.get('/json', function (req, res) {
    res.json({
        message: 'Hello json',
    });
});

app.get('/', function (req, res) {
    res.sendFile(indexPath);
});

module.exports = app;
