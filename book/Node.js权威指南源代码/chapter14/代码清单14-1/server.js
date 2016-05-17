var express = require('express');
var http = require('http');
var app = express();
app.get('/index.html',function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<head><meta charset="utf-8"/></head>');
    res.end('你好\n');
});
app.listen(1337, "127.0.0.1");
