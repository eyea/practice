var express = require('express');
var fs=require('fs');
var app = express();
app.use(express.cookieParser());
app.get('/index.html',function (req,res) {
    res.sendfile(__dirname+'/index.html');
});
app.post('/index.html',function (req,res) {
    for(var key in req.cookies){
        res.write("cookie名:"+key);
        res.write(",cookie值:"+req.cookies[key]+"<br/>");
    }
    res.end();
});
app.listen(1337, "127.0.0.1");

