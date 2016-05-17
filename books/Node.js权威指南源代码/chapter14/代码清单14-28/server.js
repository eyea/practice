var express = require('express');
var fs=require('fs');
var app = express();
app.use(express.cookieParser());
app.use(express.session({secret:"test"}));
app.get('/index.html',function (req,res) {
    res.sendfile(__dirname+'/index.html');
    req.session.username ="lulingniu";
    req.session.password ="123456";
    /*req.session.regenerate(function(err){
        if(err) console.log('session重新初始化失败。');
        else  console.log('session被重新初始化。');
    });
    req.session.destroy(function(err){
        if(err) console.log('session销毁失败。');
        else  console.log('session被销毁。');
    });*/
});
app.post('/index.html',function (req,res) {
    console.log(req.session.username);
    console.log(req.session.password);
    res.end();
});
app.listen(1337, "127.0.0.1");

