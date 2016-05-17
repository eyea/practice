var express = require('express');
var domain = require('domain');
var app = express();
var mysql = require('mysql');
var pool = mysql.createPool({
    host     : 'localhost',
    port     : 3306,
    database : 'mysql',
    user     : 'root',
    password : 'root',
});
app.use(express.static(__dirname));
app.use(app.router);
app.use(function(err,req,res,next) {
    console.error(err.stack);
    if(req.xhr) res.send(500,{error:"服务器端触发一个错误，错误消息为："+err.message});
    else res.send(500,err.message);
});

app.post('/',function (req,res,next) {  
    var reqd = domain.create();
    reqd.add(req);
    reqd.on('error', function(err) {
        next(err);
    });
    req.on('data',function(data){
        noneexists();
        var obj=JSON.parse(data.toString());
        pool.getConnection(function(err, connection) {
            if(err) res.send('与MySQL数据库建立连接失败。');
            else{
                var str;
                connection.query('INSERT INTO users SET ?',{username:obj.username,firstname:obj.firstname},function(err,result){
                    if(err) str='在服务器端MySQL数据库中插入数据失败。';
                    else    str='在服务器端MySQL数据库中插入数据成功。';
                    connection.release();
                    res.send(str);
                });
            }
        });
    });
});
app.listen(1337, "127.0.0.1");
