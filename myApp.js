let express = require('express');
let app = express();

const indexPath = __dirname + '/views/index.html';

app.get('/', function (req, res) {
    res.sendFile(indexPath);
});

module.exports = app;
