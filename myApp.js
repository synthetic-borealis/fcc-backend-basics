let express = require('express');
let app = express();
require('dotenv').config();

const staticPath = __dirname + '/public';
const indexPath = __dirname + '/views/index.html';

app.use('/public', express.static(staticPath));

app.get('/json', function (req, res) {
    const { MESSAGE_STYLE } = process.env;
    if (MESSAGE_STYLE === 'uppercase') {
        res.json({
            message: 'Hello json'.toUpperCase(),
        });
    } else {
        res.json({
            message: 'Hello json',
        });
    }
});

app.get('/', function (req, res) {
    res.sendFile(indexPath);
});

module.exports = app;
