var express = require('express');
var util = require('util');
var app = express();
app.get('/',function (req,res) {
    noneexists();
    res.send('你好。');    
});
app.listen(1337, "127.0.0.1");
