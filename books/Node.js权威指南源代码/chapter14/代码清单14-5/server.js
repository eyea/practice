var express = require('express');
var http = require('http');
var app = express();
app.get('/index.html/:id(\\d+)',function (req, res, next) {
    if(req.params.id>10)
        next();
    else
        res.send('id参数值必须大于10。');
});
app.get('/index.html/:id(\\d+)',function (req, res) {
    res.send('你好。');
});
app.listen(1337, "127.0.0.1");
