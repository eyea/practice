var express = require('express');
var fs=require('fs');
var app = express();
var mysql = require('mysql');
app.configure(function(){
    app.set('view engine','jade');
    app.use(express.bodyParser());
});
var pool = mysql.createPool({
    host     : 'localhost',
    port     : 3306,
    database : 'mysql',
    user     : 'root',
    password : 'root',
});
app.get('/',function (req,res) {
    res.render('index');
});
app.post('/',function (req,res) {
    req.on('data',function(data){
        var obj=JSON.parse(data.toString());
        pool.getConnection(function(err, connection) {
            if(err) res.send('与MySQL数据库建立连接失败。');
            else{
                var str;
                connection.query('INSERT INTO users SET ?',{username:req.body.username,firstname:req.body.firstname},function(err,result){
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