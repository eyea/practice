var express = require('express');
var middleware = require('./middleware');
var app = express();
app.use(middleware.setHeader());
app.get('/', function(req,res) {
    res.writeHead(res.statusCode,res.header);
    res.write(res.head);
    res.end('你好');
});
app.listen(1337, "127.0.0.1");
