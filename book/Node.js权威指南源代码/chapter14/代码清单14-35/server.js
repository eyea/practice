var express = require('express');
var util = require('util');
var app = express();
app.use(app.router);
app.use(function(err,req,res,next) {
    console.error(err.stack);
    next(err);
});
app.use(function(err,req,res,next) {
    res.send(500,err.message);
});
app.get('/',function (req,res) {
    noneexists();
    res.send('你好。');    
});
app.listen(1337, "127.0.0.1");
