var express = require('express');
var http = require('http');
var app = express();
app.get('/index.html',function (req, res) {
    res.send('你好');
});
app.listen(1337, "127.0.0.1");
