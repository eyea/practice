var express = require('express');
var app = express();
app.use(function(req, res, next) {
    console.log('foo');
    next();
});
app.get('/', function(req, res, next) {
    res.send('hoge');
    console.log('res.send(\'hoge\');');
});
app.use(function(req, res, next) {
    console.log('bar');
    next();
});
app.listen(1337, "127.0.0.1");