var express = require('express');
var app = express();
app.use(function(req, res, next) {
    console.log('foo');
    next();
});
//此处执行 app.get（send('hoge')）
app.use(app.router);
//如果在app.get方法中不调用next方法，下面这个中间件函数将不被执行
app.use(function(req, res, next) {
    console.log('bar');
    next();
});

app.get('/', function(req, res, next) {
    res.send('hoge');
    console.log('res.send(\'hoge\');');
});

app.listen(1337, "127.0.0.1");