let express = require('express');
let app = express();
let bodyParser = require('body-parser');
require('dotenv').config();

const staticPath = __dirname + '/public';
const indexPath = __dirname + '/views/index.html';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Logger
app.use(function (req, res, next) {
    const logLine = `${req.method} ${req.path} - ${req.ip}`;
    console.log(logLine);
    next();
});

app.use('/public', express.static(staticPath));

app.get('/:word/echo', function (req, res) {
    const { word } = req.params;
    res.send({
        echo: word,
    });
});

app.route('/name')
    .get(function (req, res) {
        const { first: firstName, last: lastName } = req.query;
        res.send({
            name: `${firstName} ${lastName}`,
        });
    })
    .post(function (req, res) {
        const { first: firstName, last: lastName } = req.body;
        res.send({
            name: `${firstName} ${lastName}`,
        });
    });

app.get('/now', function (req, res, next) {
    req.time = new Date().toString();
    next();
}, function (req, res) {
    res.send({
        time: req.time,
    });
});

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
