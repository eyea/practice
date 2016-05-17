var express = require('express');
var app = express();
app.use(app.router);
var errmessage;
app.use(function(err,req,res,next) {
    console.error(err.stack);
    errmessage=err.message;
    res.redirect('/error');
});
app.get('/',function (req,res) {
    noneexists();
    res.send('你好。');    
});
app.get('/error',function (req,res) {
    res.send("服务器端触发一个错误，错误消息为："+errmessage);    
});
app.listen(1337, "127.0.0.1");
