var express = require('express');
var fs=require('fs');
var app = express();
app.use(express.cookieParser());
app.use(express.session({secret:"test",cookie:{maxAge:3600000}}));
app.get('/index.html',function (req,res) {
    res.sendfile(__dirname+'/index.html');
    console.log(req.session.cookie);
});
app.listen(1337, "127.0.0.1");

