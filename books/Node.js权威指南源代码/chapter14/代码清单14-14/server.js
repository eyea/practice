var express = require('express');
var middleware = require('./middleware');
var app = express();
app.use('/static',middleware.setHeader());
app.get('/*', function(req,res) {
    if(res.head){
        res.writeHead(res.statusCode,res.header);
        res.write(res.head);
        res.write('你好');
    }
    res.end();
});
app.listen(1337, "127.0.0.1");
